const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 5000;
 
// middleware
app.use(cors());
app.use(express.json());
 
 
app.get('/',(req,res)=>{
    res.send('server is running');
})

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.gplljg9.mongodb.net/?retryWrites=true&w=majority`;

 
app.listen(port,()=>{
    console.log(`Listening to the port ${port}`);
})
