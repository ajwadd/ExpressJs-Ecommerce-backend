const express = require('express')

const router = express.Router()


// middelwares
const { authCheck } = require('../middelwares/auth');
// controllers
const { userCart, getUserCart, emptyCart, saveAdress, applyCouponToUserCart, createOrder, orders, addToWishlist,
    wishlist , removeFromWishlist, createCashOrder
 } = require('../controllers/user')
//route
router.post('/user/cart', authCheck, userCart); // save cart
router.get('/user/cart', authCheck, getUserCart); // get cart
router.delete('/user/cart', authCheck, emptyCart); // emty cart
router.post('/user/address', authCheck, saveAdress); 

// coupon
router.post('/user/cart/coupon', authCheck, applyCouponToUserCart)

// order
router.post("/user/order", authCheck, createOrder); // stripe
router.post("/user/cash-order", authCheck, createCashOrder); // COD
router.get("/user/orders", authCheck, orders);

// wishlist
router.post("/user/wishlist", authCheck, addToWishlist);
router.get("/user/wishlist", authCheck, wishlist);
router.put("/user/wishlist/:productId", authCheck, removeFromWishlist);





module.exports = router;