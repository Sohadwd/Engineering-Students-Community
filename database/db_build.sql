BEGIN;

DROP TABLE IF EXISTS semester, material, topics, topic_semester CASCADE;

CREATE TABLE semester(
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(30) NOT NULL
);

CREATE TABLE material(
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(30) NOT NULL
);

CREATE TABLE topics(
  id SERIAL PRIMARY KEY NOT NULL,
  title VARCHAR(30) NOT NULL,
  body VARCHAR(700) NOT NULL,
  material_id INTEGER REFERENCES material(id)
);

CREATE TABLE topic_semester(
  topic_id INTEGER REFERENCES topics(id),
  semester_id INTEGER REFERENCES semester(id)
);

INSERT INTO semester (name) VALUES
('First material'),
('Second material');

INSERT INTO material (name) VALUES
('Network'),
('Java II');

INSERT INTO topics (title, body, material_id) VALUES
('test test', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.
  Lorem Ipsum has been the industry standard dummy text ever since the 1500s,
  when an unknown printer took a galley of type and scrambled it to make a type specimen book.
  It has survived not only five centuries, but also the leap into electronic typesetting, remaining
  essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets
  containing Lorem Ipsum passages,and more recently with desktop publishing software like Aldus
  PageMaker including versions of Lorem Ipsum.', 1),

  ('Second test', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.
    Lorem Ipsum has been the industry standard dummy text ever since the 1500s,
    when an unknown printer took a galley of type and scrambled it to make a type specimen book.
    It has survived not only five centuries, but also the leap into electronic typesetting, remaining
    essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets
    containing Lorem Ipsum passages,and more recently with desktop publishing software like Aldus
    PageMaker including versions of Lorem Ipsum.', 2);

INSERT INTO topic_semester (topic_id, semester_id) VALUES
(1, 1),
(2, 2);

COMMIT;
