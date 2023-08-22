/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import express from 'express';
import * as path from 'path';
import mongoose from 'mongoose';

const app = express();

app.use('/assets', express.static(path.join(__dirname, 'assets')));

const Post = mongoose.model(
  'Part5Post',
  new mongoose.Schema({
    title: String,
    body: String,
  })
);

app.use(express.json());

app.get('/posts', async (req, res) => {
  const { search } = req.query;

  try {
    let posts;
    if (search) {
      // Use a case-insensitive regular expression for searching titles and bodies
      const searchRegex = new RegExp(search as string, 'i');
      posts = await Post.find({
        $or: [{ title: searchRegex }, { body: searchRegex }],
      });
    } else {
      posts = await Post.find();
    }

    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.post('/posts', async (req, res) => {
  const { title, body } = req.body;
  if (!title || !body) {
    res.status(400).json({ error: 'Title and body are required' });
    return;
  }

  try {
    const post = new Post({ title, body });
    await post.save();
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
});

// ...

app.put('/posts/:id', async (req, res) => {
  const { id } = req.params;
  const { title, body } = req.body;

  if (!title || !body) {
    res.status(400).json({ error: 'Title and body are required' });
    return;
  }

  try {
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { title, body },
      { new: true }
    );
    if (!updatedPost) {
      res.status(404).json({ error: 'Post not found' });
      return;
    }

    res.json(updatedPost);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.delete('/posts/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedPost = await Post.findByIdAndDelete(id);
    if (!deletedPost) {
      res.status(404).json({ error: 'Post not found' });
      return;
    }

    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
});

const PORT = process.env.PART5_BE_PORT || 3333;
const server = app.listen(PORT, () => {
  mongoose.connect(process.env.MONGO_CLOUD_URL);
  console.log(`Server is running on port ${PORT}`);
});

server.on('error', console.error);
