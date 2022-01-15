const db = require('../mongo.js')

const getNextReviewId = async () => {
  const nextId = await db.db.collection('counters').findAndModify(
    {
      query: {_id: "review_id"},
      update: {$inc: {seq: 1} },
      new: true
    }
  )
  return nextId.seq;
}
//last was 1000011

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
      return nextId;
    } catch(e) {return e };
  }
}