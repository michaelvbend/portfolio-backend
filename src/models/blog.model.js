import mongoose from 'mongoose';

const BlogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    slug: String,
    author: String,
    imageUrl: String,
    date: String,
    introduction: String,
    content: String,
    tags: [String],
  },
  {
    timestamps: true,
  }
);

BlogSchema.statics.findBySlug = function (slug) {
  return this.find({ slug });
};

const Blog = mongoose.model('Blog', BlogSchema);

export default Blog;
