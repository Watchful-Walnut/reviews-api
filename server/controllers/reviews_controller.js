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
      next(e);
    }
  },
  post: async (req, res, next) => {
    try {
      const reviews = await model.post(req.body);
      res.status(201).send(reviews);
    } catch (e) {
      next(e);
    }
  },
  helpful: async (req, res, next) => {
    try {
      if(!req.query.review_id){
        res.status(400)
        throw new Error('No review_id provided');
      }
      const helpful = await model.helpful(req.query);
      if(helpful.modifiedCount !== 1){
        res.status(400)
        throw new Error('Invalid review_id')
      }
      res.status(201).send();
    } catch (e) {
      next(e);
    }
  },
  report: async (req, res, next) => {
    try {
      if(!req.query.review_id){
        res.status(400)
        throw new Error('No review_id provided');
      }
      const helpful = await model.report(req.query);
      if(helpful.modifiedCount !== 1){
        res.status(400)
        throw new Error('Invalid review_id')
      }
      res.status(201).send();
    } catch (e) {
      next(e);
    }
  }

}