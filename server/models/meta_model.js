const db = require('../mongo.js')

module.exports = {
  characteristics: async (id) => {
    try {
      const characteristics = await db.collection.aggregate(
        [{$match:
           {_id: parseInt(id)}
          },{$unwind:
             "$reviews"
            }, {$unwind:
               {path: "$reviews.characteristics"}
              }, {$group:
                 {_id: "$reviews.characteristics.name", value: { $avg: "$reviews.characteristics.value"}, id: {$avg: "$reviews.characteristics.id"}}
                }]).toArray();
      return characteristics;
    } catch(e) {return e };
  },
}