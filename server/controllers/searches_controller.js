const model = require('../models/searches_model.js');

module.exports = {
  rating: async (req, res, next) => {
    try {
      const search = await model.rating(req.query);
      if(!search[0]){
        res.status(404)
        throw new Error(`No product found by product_id ${req.query.product_id}`);
      } else if(!search[0].reviews[0]){
        res.status(404)
        throw new Error(`No reviews found by rating ${req.query.value}`);
      }
      console.log(search)
      res.send(search);
    } catch (e) {
      console.log(e);
      next(e);
    }
  },
  review_id: async (req, res, next) => {
    try {
      const search = await model.review_id(req.query);
      if(!search[0]){
        res.status(404)
        throw new Error(`No product found by product_id ${req.query.product_id}`);
      } else if(!search[0].reviews[0]){
        res.status(404)
        throw new Error(`No reviews found by review_id ${req.query.value}`);
      }
      console.log(search)
      res.send(search);
    } catch (e) {
      console.log(e);
      next(e);
    }
  },

}