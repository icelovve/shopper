import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import omise from 'omise';
import dotenv from 'dotenv';
import connection from './database/db.js';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import multer from 'multer';
import bcrypt from 'bcrypt';

const router = express.Router();
dotenv.config();

const Omise = omise({
    secretKey: process.env.OMISE_SECRET_KEY,
    publicKey: process.env.OMISE_PUBLIC_KEY,
});

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// สร้าง uploadPath
const uploadPath = path.join(__dirname, 'uploads');

if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
    console.log('Uploads folder created');
}

// กำหนด storage สำหรับ multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadPath); 
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); // กำหนดชื่อไฟล์ให้ไม่ซ้ำ
    }
});

const hashPassword = async (plainPassword) => {
    const saltRounds = 10;
    return await bcrypt.hash(plainPassword, saltRounds);
};

const upload = multer({ storage });
console.log('Multer configuration is ready.');

{/* Payment Api */ }

app.post('/checkout-credit-card', async (req, res) => {
    const { name, total, token } = req.body;
    try {
        //แก้ปัญหาส่ง total เป็นทศนิยมไม่ได้
        const amountInCents = Math.round(total * 100);

        // สร้างลูกค้าใหม่ด้วยข้อมูลบัตรเครดิต
        const customer = await Omise.customers.create({
            description: name,
            card: token,
        });

        // สร้างคำขอการชำระเงิน
        const charge = await Omise.charges.create({
            description: name,
            customer: customer.id,
            amount: amountInCents,
            currency: 'THB',
            return_uri: 'http://localhost:5173/product/:id/payment/payment-success',
        });

        res.send({
            amount: charge.amount,
            status: charge.status,
        });
        console.log(req.body);

    } catch (error) {
        console.log(error);
        res.status(500).send({ error: 'Payment processing failed' });
    }
});

app.post('/checkout-internet-banking', async (req, res) => {
    const { name, total, token } = req.body;
    try {
        const amountInCents = Math.round(total * 100);
        const charge = await Omise.charges.create({
            description: name,
            amount: amountInCents,
            currency: 'THB',
            payment_method: 'internet_banking',
            return_uri: `http://localhost:5173/product/:id/payment/payment-success`,
            source: token
        });

        res.send({
            amount: charge.amount,
            authorizeUri: charge.authorize_uri
        });

        console.log(req.body);

    } catch (error) {
        console.log(error);
        res.status(500).send({ error: 'Payment failed' });
    }
})

app.post('/checkout-prompt-pay', async (req, res, next) => {
    const { name, total, token } = req.body;
    try {
        const amountInCents = Math.round(total * 100);
        const charge = await Omise.charges.create({
            description: name,
            amount: amountInCents,
            currency: 'THB',
            source: token,
            payment_method: 'promptpay',
        });

        res.send({
            amount: charge.amount,
            scannable_code: charge.source.scannable_code.image.download_uri
        });

        console.log(req.body);
    } catch (error) {
        console.error('Payment creation error:', error);
        res.status(500).send({ error: 'Payment failed' });
    }
});

app.post('/checkout-true-money', async (req, res, next) => {
    const { name, total, token } = req.body;
    try {
        const amountInCents = Math.round(total * 100);
        const charge = await Omise.charges.create({
            description: name,
            amount: amountInCents,
            currency: 'THB',
            source: token,
            payment_method: 'truemoney',
            return_uri: `http://localhost:5173/product/:id/payment/payment-success`,
        });

        res.send({
            phone_number: charge.phone_number,
            amount: charge.amount,
            authorizeUri: charge.authorize_uri
        });

        console.log(req.body);

    } catch (error) {
        console.error('Payment creation error:', error);
        res.status(500).send({ error: 'Payment failed' });
    }
});

app.post('/checkout-mobile-banking', async (req, res) => {
    const { name, total, token } = req.body;
    try {
        const amountInCents = Math.round(total * 100);
        const charge = await Omise.charges.create({
            description: name,
            amount: amountInCents,
            currency: 'THB',
            payment_method: 'mobile_banking',
            return_uri: `http://localhost:5173/product/:id/payment/payment-success`,
            source: token
        });

        res.send({
            amount: charge.amount,
            authorizeUri: charge.authorize_uri
        });

        console.log(req.body);

    } catch (error) {
        console.log(error);
        res.status(500).send({ error: 'Payment failed' });
    }
})

{/* Product Api */ }

// fetch products 
app.get('/product', (req, res) => {
    const sql = "SELECT * FROM products";
    connection.query(sql, (err, result) => {
        if (err) {
            return res.status(500).json({
                message: 'Database query failed',
                error: err.message
            });
        }
        res.status(200).json({
            message: 'Data retrieved successfully',
            data: result
        });
    });
});


// fetch a single product by id
app.get('/product/:id', (req, res) => {
    const sql = "SELECT * FROM products WHERE id = ?";
    connection.execute(sql, [req.params.id], (err, result) => {
        if (err) {
            return res.status(500).json({
                message: 'Database query failed',
                error: err.message
            });
        }

        if (result.length === 0) {
            return res.status(404).json({
                message: 'Product not found'
            });
        }

        res.status(200).json({
            message: 'Product retrieved successfully',
            data: result[0]
        });
    });
});

// Add a new product
app.post('/product', upload.single('image'), (req, res) => {
    const { title, price, description, category, rating_rate, rating_count } = req.body;
    const image = req.file?.path || null;

    const sql = `
        INSERT INTO products (title, price, description, category, image, rating_rate, rating_count)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    connection.execute(
        sql,
        [title, price, description, category, image, rating_rate, rating_count],
        (err, result) => {
            if (err) {
                return res.status(500).json({
                    message: 'Failed to insert product',
                    error: err.message
                });
            }

            res.status(201).json({
                message: 'Product created successfully',
                data: {
                    id: result.insertId,
                    title,
                    price,
                    description,
                    category,
                    image,
                    rating_rate,
                    rating_count
                }
            });
        }
    );
});

// Edit Product
app.put('/product/:id', upload.single('image'), (req, res) => {
    const { id } = req.params;
    const { title, price, description, category, rating_rate, rating_count } = req.body;
    const image = req.file ? req.file.filename : null;

    // ดึงค่า image เดิมจากฐานข้อมูลหากไม่มีการอัปโหลดใหม่
    const getImageQuery = `SELECT image FROM products WHERE id = ?`;
    connection.execute(getImageQuery, [id], (getErr, getResult) => {
        if (getErr) {
            return res.status(500).json({
                message: 'Failed to fetch product image',
                error: getErr.message,
            });
        }

        const currentImage = getResult[0]?.image || null;
        const finalImage = image || currentImage;

        const sql = `
            UPDATE products
            SET title = ?, price = ?, description = ?, category = ?, image = ?, rating_rate = ?, rating_count = ?
            WHERE id = ?
        `;

        connection.execute(
            sql,
            [title, price, description, category, finalImage, rating_rate, rating_count, id],
            (err, result) => {
                if (err) {
                    return res.status(500).json({
                        message: 'Failed to update product',
                        error: err.message,
                    });
                }

                if (result.affectedRows === 0) {
                    return res.status(404).json({
                        message: 'Product not found',
                    });
                }

                res.status(200).json({
                    message: 'Product updated successfully',
                    data: {
                        id,
                        title,
                        price,
                        description,
                        category,
                        image: finalImage,
                        rating_rate,
                        rating_count,
                    },
                });
            }
        );
    });
});


// Delete Product
app.delete('/product/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM products WHERE id = ?';

    connection.execute(sql, [id], (err, result) => {
        if (err) {
            return res.status(500).json({
                message: 'Failed to delete product',
                error: err.message
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: 'Product not found'
            });
        }

        res.status(200).json({
            message: 'Product deleted successfully'
        });
    });
});

// Register endpoint
app.post('/register', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        // console.log("Hashed Password:", hashedPassword); 

        const sql = "INSERT INTO user (username, email, password) VALUES (?, ?, ?)";
        const values = [
            req.body.username,
            req.body.email,
            hashedPassword
        ];

        connection.query(sql, values, (err, result) => {
            if (err) {
                console.error("Error inserting user:", err);
                return res.status(500).json({ 
                    error: "Database error", 
                    details: err.message 
                });
            }

            res.status(201).json({ 
                message: "User registered successfully", 
                userId: result.insertId 
            });
        });
    } catch (error) {
        console.error("Error in /register:", error);
        res.status(500).json({ 
            error: "Internal server error", 
            details: error.message 
        });
    }
});

// Login endpoint
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    
    try {
        // SQL query to find the user by email
        const sql = "SELECT * FROM user WHERE email = ?";
        connection.query(sql, [email], async (err, result) => {
            if (err) {
                console.error("Error during login:", err);
                return res.status(500).json({
                    error: "Database error",
                    details: err.message
                });
            }

            if (result.length > 0) {
                const user = result[0];
                // console.log("Stored Hashed Password:", user.password); 

                const isPasswordMatch = await bcrypt.compare(password, user.password);
                // console.log("Password Match Result:", isPasswordMatch); 
                
                if (isPasswordMatch) {
                    return res.status(200).json({
                        message: "Login successful",
                        user: {
                            id: user.id,
                            username: user.username,
                            email: user.email
                        }
                    });
                } else {
                    return res.status(401).json({
                        error: "Login failed",
                        message: "Invalid password"
                    });
                }
            } else {
                return res.status(401).json({
                    message: "Invalid email or password"
                });
            }
        });
    } catch (error) {
        console.error("Error in /login:", error);
        res.status(500).json({ 
            error: "Internal server error", 
            details: error.message 
        });
    }
});

app.get('/user', (req, res) => {
    const sql = "SELECT * FROM user";

    connection.execute(sql, [], (err, result) => {
        if (err) {
            return res.status(500).json({
                message: 'Database query failed',
                error: err.message
            });
        }

        if (result.length === 0) {
            return res.status(404).json({
                message: 'No users found'
            });
        }

        res.status(200).json({
            message: 'Users retrieved successfully',
            data: result
        });
    });
});

app.get('/user/:id', (req, res) => {
    const userId = req.params.id;

    // ตรวจสอบว่า userId ไม่ใช่ undefined
    if (userId === undefined) {
        return res.status(400).json({
            message: 'User ID is required'
        });
    }

    const sql = "SELECT * FROM user WHERE id = ?";
    connection.execute(sql, [userId], (err, result) => {
        if (err) {
            return res.status(500).json({
                message: 'Database query failed',
                error: err.message
            });
        }

        if (result.length === 0) {
            return res.status(404).json({
                message: 'User not found'
            });
        }

        res.status(200).json({
            message: 'User retrieved successfully',
            data: result[0]
        });
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});