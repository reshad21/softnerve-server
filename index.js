const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
    res.send('server is running');
})

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.gplljg9.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const studentsCollection = client.db("softnerveDb").collection("students");

        // students collection code
        app.post('/student',async(req,res)=>{
            const items = req.body;
            const result = await studentsCollection.insertOne(items);
            res.send(result);
        })
        app.get('/student',async(req,res)=>{
            const query = {};
            const result = await studentsCollection.find(query).toArray();
            res.send(result);
        })

       
    } 
    finally {
        
    }
}
run().catch(console.dir);


app.listen(port, () => {
    console.log(`Listening to the port ${port}`);
})
