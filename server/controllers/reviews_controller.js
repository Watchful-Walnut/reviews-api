const model = require('../models/reviews_model.js');

module.exports = {
  get: async (req, res, next) => {
    try {
      const reviews = await model.get(req.query.product_id);
      if(!reviews[0]){
        res.status(404)
        throw new Error('No review found by that ID');
      }
      res.send(reviews[0]);
    } catch (e) {
      console.log(e);
      next(e);
    }
  },
  post: async (req, res, next) => {
    try {
      const reviews = await model.post(req.body);
      res.status(201).send(reviews);
    } catch (e) {
      console.log(e);
      next(e);
    }
  }

}