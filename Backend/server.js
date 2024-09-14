

// Import express
import express from 'express';

// Initialize the app
const app = express();

// parse the incomming form data using body-parser

import bodyParser from 'body-parser';

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.json()); // To handle JSON payloads

import cors from 'cors'
//cors
app.use(cors({
  origin: 'http://localhost:5173', // Replace with your frontend URL
  credentials: true
}));


// dotenv to load the environmental variables stored in .env file
import  dotenv from 'dotenv';
dotenv.config();

//import morgan to loggin the urls
import morgan from 'morgan';
app.use(morgan('dev'));

// import mongoose
import mongoose from 'mongoose';

import userRoutes from './Routes/userRoutes.js'

import adminAddProductRoutes from './Routes/productRouter.js'

import getProductsRoute from './Routes/getProducts.js'

// cookie parser

import cookieParser from 'cookie-parser';
app.use(cookieParser());

// Define a route
app.post('/', (req, res) => {
  console.log(req.body);
  res.send('data received');
});

//define userRoutes

//all products fetching
app.use('/',getProductsRoute);


//all the user routes are included here and prefixed by /admin
app.use('/user',userRoutes);

// admin-add product route
app.use('/adminDashboard',adminAddProductRoutes);


//mongoDB connection
const connectDB = async () => {
    try {
      await mongoose.connect(process.env.MONGODB_CONNECTION_STRING, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('MongoDB connected successfully');
    } catch (error) {
      console.error('MongoDB connection error:', error);
      process.exit(1); // Exit the process with failure
    }
  };

  connectDB();//can the function to connect the database
  

// Define the port
const PORT = process.env.PORT || 3000;

// Start the server
app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
