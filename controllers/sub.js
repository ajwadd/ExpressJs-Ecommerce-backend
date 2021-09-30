const Sub = require ('../models/sub')
const slugify = require ('slugify')
const Product = require("../models/product");


exports.create = async (req, res) => {
    try {
        const {name, parent} = req.body
        const sub = await new Sub({name, parent, slug: slugify(name)}).save();
        res.json(sub);

    } catch (err) {
        console.log('err:', err)
        res.status(400).send('create sub failed')

    }


};

exports.list = async (req, res) => {
    try {
        const sub = await Sub.find({}).sort({createdAt: -1}).exec();
        res.json(sub);


    } catch (err) {

    }
};

exports.read = async (req, res) => {
    try {
        let sub = await Sub.findOne({slug: req.params.slug}).exec();
        const products = await Product.find({ subs: sub })
        .populate("category")
        .exec();

        res.json({
            sub,
            products,
        });

    } catch (err) {
        res.status(400).send('sub List')
    }
};

exports.update = async (req, res) => {
    try {
        const {name, parent} = req.body
        const updated = await Sub.findOneAndUpdate({ slug: req.params.slug}, { name, parent , slug: slugify(name)}, {new: true});
        res.json(updated);

    } catch (err) { 
        res.status(400).send('Sub updated')

    }
};

exports.remove = async (req, res) => {
    try {
        let deleted = await Sub.findOneAndDelete({slug: req.params.slug}).exec();
        res.json(deleted);

    } catch (err) {
        res.status(400).send('Sub delete failed')

    }
};