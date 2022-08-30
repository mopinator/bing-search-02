require("dotenv").config();

const express = require("express");
const app = express();
const axios = require ("axios");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const API_KEY = process.env.API_KEY;
const PORT = 8000;

const headers ={
    headers : {"Ocp-Apim-Subscription-Key": API_KEY,
               "Content-Type":"application/json",
},
};

app.post("/search", async(req,res)=>{
    const {query} = req.body;
    try{
        const response = await axios.get(
            `https://api.bing.microsoft.com/v7.0/custom/search?q=${query}&customconfig=eaea9098-e84f-4d8f-ac64-0e585086cb21&mkt=en-US`,
            headers
        );     
        res.send(response.data);

    }catch (error) {
        console.log(error);
    
        }
});
app.listen(PORT, () =>console.log(`listening on port  ${PORT}`));