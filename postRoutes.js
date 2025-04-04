const express = require('express');
const multer = require('multer');
const cloudinary = require('../config/cloudinaryConfig');
const Post = require('../models/Post');
const authenticate = require('../middleware/authMiddleware');

const router = express.Router();
const upload = multer({});

// Create Post
router.post('/', authenticate, upload.single('image'), async (req, res) => {
    let imageUrl = '';

    if (req.file) {
        const result = await cloudinary.uploader.upload_stream({
            resource_type: 'auto',
        }, (error, result) => {
            if (error) return res.status(500).send(error);
            imageUrl = result.secure_url;
        });

        req.file.stream.pipe(result);
    }

    const post = new Post({
        user: req.user._id,
        content: req.body.content,
        imageUrl,
    });

    try {
        await post.save();
        res.status(201).json(post);
    } catch (err) {
        res.status(400).send('Error creating post.');
    }
});

// Get Posts
router.get('/', async (req, res) => {
    const posts = await Post.find().populate('user', 'username profileImage');
    res.json(posts);
});

// Like a Post
router.post('/like/:id', authenticate, async (req, res) => {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.user._id)) {
        post.likes.push(req.user._id);
    } else {
        post.likes.pull(req.user._id);
    }
    await post.save();
    res.json(post);
});

// Comment on a Post
router.post('/comment/:id', authenticate, async (req, res) => {
    const post = await Post.findById(req.params.id);
    post.comments.push({
        user: req.user._id,
        content: req.body.content,
    });
    await post.save();
    res.json(post);
});

module.exports = router;
