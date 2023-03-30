import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url';
import mongoose from "mongoose";
import config from '../config.js';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// console.log(config);
mongoose.connect(config.MONGODB_URI)
    .then(() => console.log('connected to mongoDB'))
    .catch((error) => console.log('error connecting to mongoDB'));


app.listen(config.PORT || 3000);
