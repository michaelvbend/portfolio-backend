import Blog from '../../models/blog.model.js';

export async function getBlogArticles(req, res) {
  try {
    const blogArticles = await Blog.find();
    return res.send(blogArticles);
  } catch (err) {
    console.error('Error fetching blog articles', err);
    res.status(500).send({ message: 'Internal server error' });
  }
}

export async function getBlogArticleBySlug(req, res) {
  const { slug } = req.params;
  try {
    const blogArticle = await Blog.findBySlug(slug);
    if (blogArticle.length > 0) {
      return res.send(blogArticle);
    }
    return res.status(404).send({ message: 'No blog article found' });
  } catch (err) {
    console.error('Error fetching blog articles', err);
    res.status(500).send({ message: 'Internal server error' });
  }
}

export async function createBlogArticle(req, res) {
  const { body } = req;
  if (!body.title || !body.content) {
    return res.status(400).send({ message: 'Title and content are required' });
  }
  try {
    const blogArticle = new Blog(body);
    await blogArticle.save();
    res.status(201).send(blogArticle);
  } catch (err) {
    console.error('Error saving blog article', err);
    if (err.code === 11000) {
      return res
        .status(409)
        .send({ message: 'Blog article with this title already exists' });
    }
    res.status(500).send({ message: 'Internal server error' });
  }
}
