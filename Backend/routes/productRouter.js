import express from 'express';
import connection from '../database/db.js';  

const router = express.Router();

// Fetch all products 
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

// Fetch product by ID
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

export default router;