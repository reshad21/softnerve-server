const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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
        app.post('/student', async (req, res) => {
            const update = req.body;
            const result = await studentsCollection.insertOne(update);
            res.send(result);
        })
        app.get('/student', async (req, res) => {
            const query = {};
            const result = await studentsCollection.find(query).toArray();
            res.send(result);
        })
        app.get('/student/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const result = await studentsCollection.findOne(query)
            res.send(result);
        })
        app.delete('/student/:id', async (req, res) => {
            const id = req.params.id;
            console.log(id);
            const query = { _id: ObjectId(id) }
            const result = await studentsCollection.deleteOne(query);
            res.send(result);
        })
        app.put('/student/:id', async (req, res) => {
            const id = req.params.id;
            const update = req.body;
            console.log(id, update);

            const query = { _id: ObjectId(id) }
            const options = { upsert: true };
            const updateDoc = {
                $set: {
                    // plot: `A harvest of random numbers, such as: ${Math.random()}`,
                    phoneNumber: update.phoneNumber,
                    address: update.address,
                    sname: update.sname,
                    fname: update.fname,
                    mname: update.mname,
                    email: update.email
                },
            };
            const result = await studentsCollection.updateOne(query, updateDoc, options);
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
