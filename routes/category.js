const express = require('express')

const router = express.Router()

//middlewares
const { authCheck, adminCheck } = require("../middelwares/auth")

// controller 
const {create, read, update, remove, list, getSubs } = require("../controllers/category")

//route
router.post('/category', authCheck, adminCheck, create) 
router.get('/category/:slug', read) 
router.get('/categories', list) 
router.put('/category/:slug', authCheck, adminCheck, update) 
router.delete('/category/:slug', authCheck, adminCheck, remove) 
router.get('/category/subs/:_id', getSubs) 





module.exports = router;