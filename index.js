const express = require("express");
const mongoose = require("mongoose");

const app = express();

const Article = require("./models/Article");

mongoose.connect("mongodb+srv://hodaosamamahfoz:qASXUXXDINAK4xXm@cluster0.epdzu.mongodb.net/").
    then(() => {
        console.log("connected successfully");
    })
    .catch(() => {
        console.log("Fail to connect");

    });
//mongodb+srv://hodaosamamahfoz:<db_password>@cluster0.epdzu.mongodb.net/
//to use json in the prams
app.use(express.json());

app.get("/hello", (req, res) => {
    res.send("hello");
});

//article operations
app.post("/articles", async (req, res) => {
    //const { title, content } = req.body;
    const article = new Article();
    article.title = req.body.title;
    article.body = req.body.body;
    article.NumberOfLikes = req.body.NumberOfLikes;
    try {
        await article.save();
        res.status(201).send(article);
    } catch (error) {
        res.status(400).send(error);
    }
});
app.get("/articles/:id", async (req, res) => {
    try {
        const article = await Article.findById(req.params.id);
        if (!article) {
            return res.status(404).send("Article not found");
        }
        res.send(article);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.get("/articles", async (req, res) => {
    try {
        const articles = await Article.find({});
        res.send(articles);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.delete("/articles/:id", async (req, res) => {
    try {
        const article = await Article.findByIdAndDelete(req.params.id);
        if (!article) {
            return res.status(404).send("Article not found");
        }
        res.send(article);
    } catch (error) {
        res.status(500).send(error);
    }
});
app.listen(3000, () => {
    console.log("listening");

});