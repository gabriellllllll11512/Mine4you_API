const express = require("express");
const { copyFileSync } = require("fs");
const mongoose = require("mongoose");
const cors = require("cors")
const { Mintinfo } = require("./Schema");
const app = express()
var http = require('http');
app.use(cors());
app.options("*", cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect("mongodb+srv://Ramlogics:4H9MiDcJ0ahlUMRV@cluster0.w1hayb4.mongodb.net/?retryWrites=true&w=majority", {
    useNewUrlParser: true, useUnifiedTopology: true
}, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("successfully connected")
    }
})
var token = 19000000
var TokenFixAmount = 0;


app.post("/mint", (req, res) => {

    if (token > 17000000) {
        --token;
        TokenFixAmount = 1;
    } else if (17000000 >= token && token > 15000000) {
        token -= 0.85
        TokenFixAmount = 0.85;
    } else if (15000000 >= token && token > 14000000) {
        token -= 0.70
        TokenFixAmount = 0.70;
    } else if (14000000 >= token && token > 13000000) {
        token -= 0.55
        TokenFixAmount = 0.55;
    } else if (13000000 >= token && token > 12000000) {
        token -= 0.40
        TokenFixAmount = 0.40;
    } else if (12000000 >= token && token > 11000000) {
        token -= 0.25
        TokenFixAmount = 0.25;
    } else if (11000000 >= token && token > 10500000) {
        token -= 0.10
        TokenFixAmount = 0.10;
    } else if (10500000 >= token && token > 10000000) {
        token -= 0.01
        TokenFixAmount = 0.01;
    } else if (10000000 >= token && token > 9000000) {
        token -= 0.001
        TokenFixAmount = 0.001;
    } else if (9000000 >= token && token > 8000000) {
        token -= 0.0001
        TokenFixAmount = 0.0001;
    } else if (8000000 >= token && token > 7000000) {
        token -= 0.00001
        TokenFixAmount = 0.00001;
    } else if (7000000 >= token && token > 5000000) {
        token -= 0.000001
        TokenFixAmount = 0.000001;
    } else if (5000000 >= token && token > 3000000) {
        token -= 0.0000001
        TokenFixAmount = 0.0000001;
    } else if (3000000 >= token && token > 1000000) {
        token -= 0.00000001
        TokenFixAmount = 0.00000001;
    } else {
        token -= 0.000000001
    }

    return Mintinfo.findOne({ address: req.body.address }, async (err, value) => {
        if (value == null) {
            let data = new Mintinfo({
                address: req.body.address,
                token: TokenFixAmount
            })
            return await data.save().then(value => {
                return res.json({ value })
            });

        }
        else {
            await Mintinfo.updateOne({ address: req.body.address }, { $set: { token: TokenFixAmount + parseFloat(value.token) } })
            return res.json({ value })
        }
    })






   return res.json({ "token": token })
});


app.post("/claim", async (req, res) => {

    console.log(req.body.address)
    try {
        await Mintinfo.updateOne({ address: req.body.address }, { $set: { token: 0 } })
        console.log(value);
        return res.json(value);
    } catch (error) {
         return res.json(error)
    }



});
app.post("/claim_details", async (req, res) => {
    console.log(req.body.address)
    try {
        await Mintinfo.findOne({ address: req.body.address }).then(async (value) => {
            return res.json(value);
        })
    } catch (error) {
        res.json(error)
    }
})
app.get("/", async () => {
    console.log("Hello In This")
    try {
        console.log("yess")
    } catch (error) {
       return  res.json(error)
    }
})


app.listen(process.env.PORT || 7000, () => {
    console.log("on port 7000 ...")
})

// http.createServer(function (req, res) {
//     res.write('Hello World!'); //write a response to the client
//     res.end(); //end the response
//   }).listen(process.env.PORT || 7000); 