const async = require('async');
const reviewsModel = require('../models/reviews_model.js');
const metaModel = require('../models/meta_model.js');

module.exports = {
  meta: async (req, res, next) => {
    //Optimize by moving to mogno queries
    try {
      const reviews = await reviewsModel.get(req.query.product_id);
      if(!reviews[0]){
        res.status(404)
        throw new Error('No review found by that ID');
      }
      const characteristics = await metaModel.characteristics(req.query.product_id);
      console.log(characteristics)
      let meta = {
        product_id: req.query.product_id,
        ratings: {
          1: 0,
          2: 0,
          3: 0,
          4: 0,
          5: 0
        },
        recommend: {
          false: 0,
          true: 0
        },
        characteristics: {
        }
      }
      async.map(characteristics, (char)=> {
        meta.characteristics[char._id] = {id: char.id, value: char.value}
      })
      async.map(reviews[0].reviews, (review) => {
        meta.ratings[review.rating]++
        review.recommend ? meta.recommend.true++ : meta.recommend.false++;
        return;
      })
      res.send(meta);
    } catch (e) {
      console.log(e);
      next(e);
    }
  },

}