const express = require('express');
const db = require('./mongo.js')
const controller = require('./controllers/index.js')


const app = express();
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

app.use(express.json());
app.use(express.static('../token'));

//REVIEW DATA
app.route('/reviews/')
  .get(controller.reviews.get);
  // .post()
app.route('/reviews/meta')
  .get(controller.meta.meta);

//PUTS
// app.put('/reviews/helpful')
// app.put('/reviews/report')

//SEARCHES
app.route('/reviews/search/id')
  .get(controller.searches.review_id);
app.route('/reviews/search/rating')
  .get(controller.searches.rating);

//TESTING
app.route('/reviews/randomproduct/test')
.get(async(req, res) => {
  const id = Math.floor(Math.random()*(20000) + 1);
  db.collection.find({_id: id}).toArray((err, data)=> {
    res.send(data[0]);
  });
});

app.route('/reviews/randomreview/test')
.get(async(req, res) => {
  const id = Math.floor(Math.random()*(200000) + 1);
  db.collection.find({reviews: { $elemMatch: { review_id: id }  }},{reviews: { $elemMatch: { review_id: id }  }}).toArray((err, data)=> {
    res.send(data[0]);
  });
});