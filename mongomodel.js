const reviewSchema = new Schema({
    review_id: {type: Number, index: true},
    rating: Number,
    summary: String,
    recommend: Boolean,
    response: String,
    body: String,
    date: Date,
    reviewer_name: String,
    helpfulness: Number,
    photos: [String],
    reported: Boolean,
    characteristics: Schema.Types.Mixed,
}, { _id : false })

const productSchema = new Schema({
    product_id: {type: Number, index: true},
    reviews: [reviewSchema],

}, { _id : false });


// const metaSchema = new Schema({
//     product_id: Number,
//     characteristics: {
//         String : {
//             1: Number,
//             2: Number,
//             3: Number,
//             4: Number,
//             5: Number,
//         },
//     }
//     ratings: {
//         1: Number,
//         2: Number,
//         3: Number,
//         4: Number,
//         5: Number,
//     },
//     recommend: {
//         true: Number,
//         false: Number,
//     }

// });

//Single document approach:

{
    "product_id": "63609",
    "results": [
        {
            "review_id": 1115681,
            "rating": 4,
            "summary": "arstarstarst",
            "recommend": true,
            "response": null,
            "body": "arstarstarst",
            "date": "2022-01-04T00:00:00.000Z",
            "reviewer_name": "andrew",
            "helpfulness": 6,
            "photos": [],
            "reported": true
        },
        {
            "review_id": 1095205,
            "rating": 4,
            "summary": "This product was ok!",
            "recommend": false,
            "response": "",
            "body": "I really did not like this product solely because I am tiny and do not fit into it.",
            "date": "2019-01-11T00:00:00.000Z",
            "reviewer_name": "mymainstreammother",
            "helpfulness": 4,
            "photos": [],
            "email": "something@something.com",
            "reported": false,
        },
    ],
}

// Many to one: Subset pattern - Can't use because FEC front end does review calculations and also requests all reviews at once.
// If used, would do search on product_id as an index.

//product_reviews: cache the first ten reviews, then search review collection for remaining.
//meta searches the review collection
{
    "product_id": "63609",
    "results": [
        {
            "review_id": 1115681,
            "rating": 4,
            "summary": "arstarstarst",
            "recommend": true,
            "response": null,
            "body": "arstarstarst",
            "date": "2022-01-04T00:00:00.000Z",
            "reviewer_name": "andrew",
            "helpfulness": 6,
            "photos": [],
            "email": "something@something.com",
            "reported": false,
        },
        {
            "review_id": 1095205,
            "rating": 4,
            "summary": "This product was ok!",
            "recommend": false,
            "response": "",
            "body": "I really did not like this product solely because I am tiny and do not fit into it.",
            "date": "2019-01-11T00:00:00.000Z",
            "reviewer_name": "mymainstreammother",
            "helpfulness": 4,
            "photos": [],
            "email": "something@something.com",
            "reported": false,
        },
    ],
}


//Reviews collection entries: Search when "more reviews" is clicked.

{
    "review_id": 1115681,
    "product_id": 63609,
    "rating": 4,
    "summary": "arstarstarst",
    "recommend": true,
    "response": null,
    "body": "arstarstarst",
    "date": "2022-01-04T00:00:00.000Z",
    "reviewer_name": "andrew",
    "helpfulness": 6,
    "photos": [],
    "email": "something@something.com",
    "reported": false,
}
{
    "review_id": 1095205,
    "product_id": 63609,
    "rating": 4,
    "summary": "This product was ok!",
    "recommend": false,
    "response": "",
    "body": "I really did not like this product solely because I am tiny and do not fit into it.",
    "date": "2019-01-11T00:00:00.000Z",
    "reviewer_name": "mymainstreammother",
    "helpfulness": 4,
    "photos": [],
    "email": "something@something.com",
    "reported": false,
}

//metadata:

{
    "product_id": "63609",
    "ratings": {
        "1": "15",
        "3": "1",
        "4": "20",
        "5": "40"
    },
    "recommended": {
        "false": "29",
        "true": "47"
    },
    "characteristics": {
        "Fit": {
            "id": 213423,
            "value": "2.7500000000000000"
        },
        "Length": {
            "id": 213424,
            "value": "2.3333333333333333"
        },
        "Comfort": {
            "id": 213425,
            "value": "2.6363636363636364"
        },
        "Quality": {
            "id": 213426,
            "value": "2.4545454545454545"
        }
    }
}