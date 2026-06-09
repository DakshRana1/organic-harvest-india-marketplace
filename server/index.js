import express from 'express';
import cors from 'cors';
import productsRouter from './routes/products.js';
import categoriesRouter from './routes/categories.js';
import newsletterRouter from './routes/newsletter.js';

const app = express();
const PORT = 5000;

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

app.use('/api/products', productsRouter);
app.use('/api/categories', categoriesRouter);
app.use('/api/newsletter', newsletterRouter);

app.get('/api/health', (_req, res) => res.json({ status: 'ok', message: 'Organic Harvest India API running' }));

app.listen(PORT, () => {
  console.log(`🌱 Organic Harvest India API running at http://localhost:${PORT}`);
});
