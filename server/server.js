const express = require('express');
const db = require('./mongo.js')

const app = express();
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

app.use(express.json());
app.use(express.static('../token'));

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