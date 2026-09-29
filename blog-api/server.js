require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// express app
const app = express();
app.use(cors());
app.use(express.json());

// connect MongoDB
mongoose.connect(process.env.MONGODB_URI, { dbName: 'movya' })
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error(err));

// schema & model
const ArticleSchema = new mongoose.Schema({
  idm: String,
  title: String,
  imageurl: String,
  authorname: String,

  category: String,
  authorImage: String,
  date: String,
  readtime: String,
  authorImage: String,
  description: String,
  authortitle: String,
  authorBio: String,
  sections: [
    {
      id: String,
      title: String,
      content: [String]
    }
  ]
}, { timestamps: true });

const Article = mongoose.model('blogs', ArticleSchema);

// GET all blogs
app.get('/api/articles', async (req, res) => {
  try {
    const articles = await Article.find().sort({ createdAt: -1 });
    res.json(articles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET one blog by Mongo _id
app.get('/api/articles/:id', async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) return res.status(404).json({ error: 'Not found' });
    res.json(article);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running at http://192.168.1.9:${PORT}`);
});



