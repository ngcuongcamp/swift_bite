import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from "cookie-parser"
import { connectDB } from './config/db.js'
import productRoutes from './routes/ProductRoutes.js'
import categoryRoutes from './routes/CategoryRoutes.js'
import shopRoutes from './routes/ShopRoutes.js'
import Product from './models/Product.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000
const allowedOrigins = ['http://localhost:5173']

// Middleware
app.use(express.json())
app.use(cookieParser())
app.use(cors({ origin: allowedOrigins, credentials: true }))


// Routes
app.use('/api/v1/products', productRoutes)
app.use('/api/v1/categories', categoryRoutes)
app.use('/api/v1/shops', shopRoutes)

app.listen(PORT, async () => {
    await connectDB()

    // 🔄 Sync indexes sau khi kết nối DB
    try {
        await Product.syncIndexes();
        console.log('✅ Product indexes synced!');
    } catch (err) {
        console.error('❌ Failed to sync Product indexes:', err);
    }

    console.log(`🚀 Server is running on port ${PORT}`)
})
