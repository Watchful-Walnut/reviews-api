CREATE TABLE reviews (
 review_id BIGSERIAL,
 product_id INTEGER,
 rating INTEGER,
 summary VARCHAR,
 recommend BOOLEAN,
 response VARCHAR,
 body VARCHAR,
 date TIMESTAMP,
 review_name: VARCHAR,
 helpfulness INTEGER
);


ALTER TABLE reviews ADD CONSTRAINT reviews_pkey PRIMARY KEY (review_id);
ALTER TABLE reviews ADD CONSTRAINT reviews_pkey KEY (product_id);

CREATE TABLE characteristics (
 characteristic_id INTEGER,
 product_id INTEGER,
 name VARCHAR
);


ALTER TABLE characteristics ADD CONSTRAINT characteristics_pkey PRIMARY KEY (characteristic_id);
ALTER TABLE characteristics ADD CONSTRAINT characteristics_pkey KEY (product_id);

CREATE TABLE photos (
 id BIGSERIAL,
 review_id INTEGER,
 url INTEGER
);


ALTER TABLE photos ADD CONSTRAINT photos_pkey PRIMARY KEY (id);
ALTER TABLE photos ADD CONSTRAINT photos_pkey KEY (review_id);

CREATE TABLE reviews_characteristics (
 id BIGSERIAL,
 characteristic_id INTEGER,
 review_id INTEGER,
 review_value INTEGER
);


ALTER TABLE reviews_characteristics ADD CONSTRAINT reviews_characteristics_pkey PRIMARY KEY (id);

ALTER TABLE photos ADD CONSTRAINT photos_review_id_fkey FOREIGN KEY (review_id) REFERENCES reviews(review_id);
ALTER TABLE reviews_characteristics ADD CONSTRAINT reviews_characteristics_characteristic_id_fkey FOREIGN KEY (characteristic_id) REFERENCES characteristics(characteristic_id);
ALTER TABLE reviews_characteristics ADD CONSTRAINT reviews_characteristics_review_id_fkey FOREIGN KEY (review_id) REFERENCES reviews(review_id);