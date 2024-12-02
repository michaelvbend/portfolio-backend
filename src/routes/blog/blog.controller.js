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

export async function getBlogArticle(req, res) {
  const { slug } = req.params;
  try {
    const blogArticle = Blog.findBySlug(slug);
    if (blogArticle.length > 0) {
      return res.send(blogArticle);
    }
    return res.status(404).send({ message: 'No blog article found' });
  } catch (err) {
    console.error('Error fetching blog articles', err);
    res.status(500).send({ message: 'Internal server error' });
  }
}
