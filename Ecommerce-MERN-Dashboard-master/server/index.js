import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';

// Routes
import clientRoutes from "./routes/client.js";
import generalRoutes from "./routes/general.js";
import managementRoutes from "./routes/management.js";
import salesRoutes from "./routes/sales.js";

// Data imports
import User from "./models/User.js";
import Product from "./models/Product.js";
import ProductStat from './models/ProductStat.js';
import Transaction from './models/Transaction.js';
import OverallStat from './models/OverallStat.js';
import AffiliateStat from './models/AffiliateStat.js';

import {
    dataUser,
    dataProduct,
    dataProductStat,
    dataTransaction,
    dataOverallStat,
    dataAffiliateStat
} from "./data/index.js";

/* CONFIGURATION */
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

/* ROUTES */
app.use("/client", clientRoutes);
app.use("/general", generalRoutes);
app.use("/management", managementRoutes);
app.use("/sales", salesRoutes);

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 9000;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(async () => {
    console.log("MongoDB connected successfully");
    
    app.listen(PORT, () => console.log(`Server running on Port: ${PORT}`));

    /* ONLY ADD DATA IF COLLECTIONS ARE EMPTY */
    const userCount = await User.countDocuments();
    if (userCount === 0) {
        await User.insertMany(dataUser);
        console.log("Users inserted");
    }

    const productCount = await Product.countDocuments();
    if (productCount === 0) {
        await Product.insertMany(dataProduct);
        console.log("Products inserted");
    }

    const productStatCount = await ProductStat.countDocuments();
    if (productStatCount === 0) {
        await ProductStat.insertMany(dataProductStat);
        console.log("ProductStats inserted");
    }

    const transactionCount = await Transaction.countDocuments();
    if (transactionCount === 0) {
        await Transaction.insertMany(dataTransaction);
        console.log("Transactions inserted");
    }

    const overallStatCount = await OverallStat.countDocuments();
    if (overallStatCount === 0) {
        await OverallStat.insertMany(dataOverallStat);
        console.log("OverallStats inserted");
    }

    const affiliateStatCount = await AffiliateStat.countDocuments();
    if (affiliateStatCount === 0) {
        await AffiliateStat.insertMany(dataAffiliateStat);
        console.log("AffiliateStats inserted");
    }

})
.catch((error) => console.log(`MongoDB connection error: ${error}`));
