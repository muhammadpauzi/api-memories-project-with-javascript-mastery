import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import posts from './routes/posts.js';

const app = express();

app.use(express.json({ limit: '30mb', extended: true }));
app.use(express.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());

const CONNECTION_URI = 'mongodb://127.0.0.1:27017/memories';
const PORT = process.env.PORT || 5000;

// connect to mongodb
mongoose.connect(CONNECTION_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("MongoDB connected.");
}).catch(error => {
    console.log("MongoDB Error :", error.message);
    process.exit(1);
});

// routes
app.use('/posts', posts)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`)
});
