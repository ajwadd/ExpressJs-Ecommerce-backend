const Category = require("../models/category");
const slugify = require("slugify");
const Sub = require("../models/sub");
const Product = require("../models/product");

exports.create = async (req, res) => {
  try {
    const { name } = req.body;
    const category = await new Category({ name, slug: slugify(name) }).save();
    res.json(category);
  } catch (err) {
    //console.log(err)
    res.status(400).send("reate category failed");
  }
};

exports.list = async (req, res) => {
  try {
    const category = await Category.find({}).sort({ createdAt: -1 }).exec();
    res.json(category);
  } catch (err) {}
};

exports.read = async (req, res) => {
  let category = await Category.findOne({ slug: req.params.slug }).exec();
  // res.json(category);
  const products = await Product.find({ category }).populate("category").exec();

  res.json({
    category,
    products,
  });
};

exports.update = async (req, res) => {
  try {
    const { name } = req.body;
    const updated = await Category.findOneAndUpdate(
      { slug: req.params.slug },
      { name, slug: slugify(name) },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).send("category updated");
  }
};

exports.remove = async (req, res) => {
  try {
    let deleted = await Category.findOneAndDelete({
      slug: req.params.slug,
    }).exec();
    res.json(deleted);
  } catch (err) {
    res.status(400).send("category delete failed");
  }
};

exports.getSubs = async (req, res) => {
  Sub.find({ parent: req.params._id }).exec((err, subs) => {
    if (err) console.log(err);
    res.json(subs);
  });
};
