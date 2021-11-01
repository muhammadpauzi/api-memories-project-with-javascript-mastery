import mongoose from "mongoose";
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

export const updatePost = async (req, res) => {
    const { id: _id } = req.params;
    const post = req.body;

    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send({ message: 'No post with the id' });

    try {
        const updatedPost = await Post.findByIdAndUpdate(_id, { ...post, _id }, { new: true });
        res.status(200).json(updatedPost);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const deletePost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send({ message: 'No post with the id' });

    try {
        await Post.findByIdAndRemove(id);
        res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}