const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const PORT = 3007;

//setup and configure body-parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//mimic the database using an array
let blogsList = [];
app.get('/blogs', (req, res) => {
    return res.status(200).json({
        data: blogsList,
        success: true,
    });
});

app.post('/blogs', (req, res) => {
    blogsList.push({
        title: req.body.title,
        content: req.body.content,
        id: Math.floor(Math.random() * 1000)
    });
    return res.status(201).json({
        success: true,
    });
});

app.get('/blogs/:id', (req, res) => {
    //console.log(req.params);
    const result = blogsList.filter((blog) => blog.id == req.params.id);
    return res.status(202).json({
        data: result,
        success: true,
    });
});

app.delete('/blogs/:id', (req, res) => {
    const result = blogsList.findIndex((blog) => blog.id == req.params.id);
    if(result !== -1){
        blogsList.splice(result, 1);
        return res.status(202).json({
            success: true,
        });
    }else{
        return res.status(404).json({
            success: false,
            message: "Blog not found"
        });
    }
});

app.listen(PORT, () => {
    console.log("Server started on PORT", PORT);
});