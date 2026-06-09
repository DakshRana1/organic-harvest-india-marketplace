import express from 'express';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const router = express.Router();
const __dirname = dirname(fileURLToPath(import.meta.url));
const products = JSON.parse(readFileSync(join(__dirname, '../data/products.json'), 'utf-8'));

// GET /api/products  (optional ?category=fruits)
router.get('/', (req, res) => {
  const { category } = req.query;
  if (category && category !== 'all') {
    return res.json(products.filter(p => p.category === category));
  }
  res.json(products);
});

// GET /api/products/:id
router.get('/:id', (req, res) => {
  const product = products.find(p => p.id === req.params.id);
  if (!product) return res.status(404).json({ error: 'Product not found' });
  res.json(product);
});

export default router;
