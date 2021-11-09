const express = require('express');
const { MongoClient, Collection } = require('mongodb');
const cors = require('cors');
// require("dotenv").config();

const ObjectId = require("mongodb").ObjectId;

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
const uri = "mongodb+srv://tourPlannerDb:61A0YOq9joAVKzsU@cluster0.4lkqy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect(err => {
    const infoCollection = client.db("tourPlannerDb").collection("Information");
    // perform actions on the collection object
    // console.log("finally");
    // const user = { Name: 'Ami', Age: '21' }
    // collection.insertOne(user)
    //     .then(() => {
    //         console.log('Done');
    //     })
    // client.close();
    const bookingsCollection = client.db("tourPlannerDb").collection("bookings");
    app.post("/add", async (req, res) => {
        const result = await infoCollection.insertOne(req.body);
        res.send(result);
        // console.log(result);

    });
    app.get('/services', async (req, res) => {
        const result = await infoCollection.find({}).toArray();
        res.send(result);
        console.log(result);
    });
    // get single product
    app.get("/singleBooking/:id", async (req, res) => {
        const result = await infoCollection
            .findOne({ _id: ObjectId(req.params.id) })
        // .toArray();
        res.send(result);
    });
    // cofirm order
    app.post("/confirmBooking", async (req, res) => {
        const result = await bookingsCollection.insertOne(req.body);
        res.send(result);
    });
    // my bookings

    app.get("/myBooking/:displayName", async (req, res) => {
        const result = await bookingsCollection
            .find({ email: req.params.name })
            .toArray();
        console.log(result);
        res.send(result);
    });
    /// delete bookings

    app.delete("/deleteBooking/:id", async (req, res) => {
        const result = await bookingsCollection.deleteOne({
            _id: ObjectId(req.params.id),
        });
        res.send(result);
        // all order
        // app.get("/allBookings", async (req, res) => {
        //     const result = await bookingsCollection.find({}).toArray();
        //     res.send(result);
        // });

    });
    app.get('/allBookings', async (req, res) => {
        const result = await bookingsCollection.find({}).toArray();
        res.send(result);
        console.log(result);
    });
    // update statuses

    app.put("/updateStatus/:id", (req, res) => {
        const id = req.params.id;
        const updatedStatus = req.body.status;
        const filter = { _id: ObjectId(id) };
        console.log(updatedStatus);
        bookingsCollection
            .updateOne(filter, {
                $set: { status: updatedStatus },
            })
            .then((result) => {
                res.send(result);
            });
    });
});


// app.get('/', (req, res) => {
//     res.send('HI');
// });
// const users = [
//     { id: 0, name: 'Shabana', email: 'Shabana@gmail.com', phone: '01788888888' },
//     { id: 1, name: 'Shabnoor', email: 'Shabnoor@gmail.com', phone: '01788888888' },
//     { id: 2, name: 'Shrabonti', email: 'Shrabonti@gmail.com', phone: '01788888888' },
//     { id: 3, name: 'Suchorita', email: 'Suchorita@gmail.com', phone: '01788888888' },
//     { id: 4, name: 'Soniya', email: 'Soniya@gmail.com', phone: '01788888888' },
//     { id: 5, name: 'Susmita', email: 'Susmita@gmail.com', phone: '01788888888' },
// ]

// app.get('/users', (req, res) => {
//     const search = req.query.search;
//     // use query parameter
//     if (search) {
//         const searchResult = users.filter(user => user.name.toLocaleLowerCase().includes(search));
//         res.send(searchResult);
//     }
//     else {
//         res.send(users)
//     }
// });

// // app.METHOD
// app.post('/users', (req, res) => {
//     const newUser = req.body;
//     newUser.id = users.length;
//     users.push(newUser);
//     console.log('hitting the post', req.body)
//     // res.send(JSON.stringify(newUser))
//     res.json(newUser)
// })

// // dynamic api
// app.get('/users/:id', (req, res) => {
//     const id = req.params.id;
//     const user = users[id]
//     res.send(user);
// })


app.listen(port, () => {
    // console.log('yuu')
})