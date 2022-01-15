const db = require('../mongo.js');

module.exports = {
  rating: async (query) => {
    console.log(query)
    try{
      const search = await db.collection.aggregate(
        [ { $match: {_id: parseInt(query.product_id)} },
          {$project: {
             reviews: {
               $filter: {
                  input: "$reviews", as: "review", cond: {
                    $eq:["$$review.rating", parseInt(query.value)]
                  }
              }}
            }}]
        ).toArray();
      return search;
    } catch (e) {console.log(e)}
  },
  review_id: async (query) => {
    console.log(query)
    try{
      const search = await db.collection.aggregate(
        [ { $match: {_id: parseInt(query.product_id)} },
          {$project: {
             reviews: {
               $filter: {
                  input: "$reviews", as: "review", cond: {
                    $eq:["$$review.review_id", parseInt(query.value)]
                  }
              }}
            }}]
        ).toArray();
      return search;
    } catch (e) {console.log(e)}
  },
  reviewer_name: async (query) => {
    console.log(query)
    try{
      const search = await db.collection.aggregate(
        [ { $match: {_id: parseInt(query.product_id)} },
          {$project: {
             reviews: {
               $filter: {
                  input: "$reviews", as: "review", cond: {
                    $eq:["$$review.reviewer_name", query.value]
                  }
              }}
            }}]
        ).toArray();
      return search;
    } catch (e) {console.log(e)}
  },
}