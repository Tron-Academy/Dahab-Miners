import { model, Schema } from "mongoose";

const BlogSchema = new Schema(
  {
    title: {
      type: String,
    },
    blogImage: {
      type: String,
    },
    blogImagePublicId: {
      type: String,
    },
    content: {
      type: String,
    },
  },
  { timestamps: true }
);

const Blog = model("Blog", BlogSchema);

export default Blog;
