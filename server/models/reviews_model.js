const db = require('../mongo.js')

const getNextReviewId = async () => {
  const nextId = await db.counters.findOneAndUpdate(
    {_id: "review_id"}, {$inc: {seq: 1}}, {new: true}
  )
  return nextId.value;
}
//last was 5774853

module.exports = {
  get: async (query) => {
    try {
      const reviews = await db.collection.find({_id: parseInt(query)}).toArray();
      return reviews;
    } catch(e) {return e };
  },
  post: async (body) => {
    try {
      const nextId = await getNextReviewId();
      const review = {
        review_id: nextId.seq,
        rating: body.rating,
        date: ((new Date()).getTime()).toString(),
        summary: body.summary,
        body: body.body,
        recommend: body.recommend,
        reported: false,
        reviewer_name: body.reviewer_name,
        reviewer_email: body.email,
        response: null,
        helpfulness: 0,
        photos: body.photos,
        characteristics: body.characteristics
      }
      const post = db.collection.updateOne({_id: body.product_id, 'reviews.review_id': {$ne: review.review_id}}, {$push:{reviews: review}}, {upsert: true})
      return post;
    } catch(e) {return e };
  },
  helpful: async (query) => {
    try {
      const put = db.collection.updateOne({reviews: { $elemMatch: { review_id: parseInt(query.review_id) }  }}, {$inc: {"reviews.$.helpfulness": 1}});
      return put;
    } catch(e) {return e };
  },
  report: async (query) => {
    try {
      const put = db.collection.updateOne({reviews: { $elemMatch: { review_id: parseInt(query.review_id) }  }}, {$set: {"reviews.$.reported": true}});
      return put;
    } catch(e) {return e };
  }
}