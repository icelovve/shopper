import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import omise from 'omise';
import dotenv from 'dotenv';
import connection from './database/db.js';

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

{/* Payment Api */}

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
    try{
        const amountInCents = Math.round(total * 100); 
        const charge = await Omise.charges.create({
            description: name,
            amount: amountInCents,
            currency: 'THB',
            payment_method: 'internet_banking',
            return_uri: `http://localhost:5173/product/:id/payment/payment-success`,
            source:token
        });

        res.send({
            amount: charge.amount,
            authorizeUri: charge.authorize_uri
        });

        console.log(req.body);
        
    }catch(error){
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
    try{
        const amountInCents = Math.round(total * 100); 
        const charge = await Omise.charges.create({
            description: name,
            amount: amountInCents,
            currency: 'THB',
            payment_method: 'mobile_banking',
            return_uri: `http://localhost:5173/product/:id/payment/payment-success`,
            source:token
        });

        res.send({
            amount: charge.amount,
            authorizeUri: charge.authorize_uri
        });
                
        console.log(req.body);
        
    }catch(error){
        console.log(error);   
        res.status(500).send({ error: 'Payment failed' });
    }
})

{/* Product Api */}

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
app.post('/product', (req, res) => {
    const { title, price, description, category, image, rating_rate, rating_count } = req.body;

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
app.put('/product/:id', (req, res) => {
    const { id } = req.params;
    const { title, price, description, category, image, rating_rate, rating_count } = req.body;

    const sql = `
        UPDATE products
        SET title = ?, price = ?, description = ?, category = ?, image = ?, rating_rate = ?, rating_count = ?
        WHERE id = ?
    `;

    connection.execute(
        sql,
        [title, price, description, category, image, rating_rate, rating_count, id],
        (err, result) => {
            if (err) {
                return res.status(500).json({
                    message: 'Failed to update product',
                    error: err.message
                });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    message: 'Product not found'
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
                    image,
                    rating_rate,
                    rating_count
                }
            });
        }
    );
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

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});