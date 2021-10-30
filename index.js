const express = require('express');
const { MongoClient } = require('mongodb');


const app = express();
const port = process.env.PORT || 5000;

//tourPlannerDb
//61A0YOq9joAVKzsU


const uri = "mongodb+srv://tourPlannerDb:61A0YOq9joAVKzsU@cluster0.4lkqy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    const collection = client.db("test").collection("devices");
    // perform actions on the collection object
    client.close();
});

app.get('/', (req, res) => {
    res.send('HI');
});

app.listen(port, () => {
    console.log('yuu')
})