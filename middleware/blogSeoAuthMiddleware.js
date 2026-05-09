export const validateBlogSeoApiKey = (req, res, next) => {
  const apiKey = req.headers["x-api-key"];
  if (!apiKey || apiKey !== process.env.BLOGSEO_API_KEY) {
    return res.status(401).json({ msg: "Unauthorized: Invalid or missing API key" });
  }
  next();
};
