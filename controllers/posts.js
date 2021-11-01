import Post from "../models/Post.js";

export const getPosts = async (req, res) => {
    try {
        const posts = await Post.find();
        return res.status(200).json(posts);
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
}

export const createPost = async (req, res) => {
    const post = req.body;
    try {
        const newPost = new Post(post);
        await newPost.save();
        return res.status(201).json(newPost);
    } catch (error) {
        return res.status(409).json({ message: error.message });
    }
}