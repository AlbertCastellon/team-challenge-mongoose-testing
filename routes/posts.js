
const express = require('express')
const router = express.Router()
const Post = require("../models/Post.js");


router.get('/', async (req, res) => {
    res.json(await Post.find())
})

router.get('/id/:_id', async (req, res) => {
    const postId = req.params
    const post = await Post.findById(postId, 'title body');
    res.json(post)
})

router.get('/title/:title', async (req, res) => {
    const postTitle = req.params
    console.log(postTitle)
    const post = await Post.findOne({title: postTitle.title}, 'title body');
    
    res.json(post)
})


router.post('/create', async (req, res) => {
    try {
        const newPost = await Post.create(req.body);
        res.status(201).send(newPost);
    } catch (error) {
        console.error(error);
        res
            .status(500)
            .send({ message: "There was a problem trying to create a task" });
    }

})

router.put('/id/:_id', async (req, res) => {
    const postId = req.params
    const post = await Post.findByIdAndUpdate(postId, req.body);
    res.json(post)
})


router.delete('/id/:_id', async (req, res) => {
    const postId = req.params
    const post = await Post.findById(postId, 'title body');
    await Post.findByIdAndDelete(postId);
    res.json(post)
})
module.exports = router