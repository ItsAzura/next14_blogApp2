import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      min: 3,
    },
    content: {
      type: String,
      required: true,
      min: 10,
    },
    image: {
      type: String,
      default: '',
    },
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Blog = mongoose?.models?.Blog || mongoose.model('Blog', blogSchema);

export default Blog;
