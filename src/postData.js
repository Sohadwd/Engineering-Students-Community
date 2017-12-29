const dbConnect = require("../database/db_connection.js");

function addTopic(obj, cb) {
  console.log(obj);
  dbConnect.query(
    `SELECT exists(SELECT title FROM topics WHERE topics.title = '${obj.title}') FROM topics;`,
    (err, res) => {
      if (err) {
        cb(err);
      } else if (res.rows[0].exists) {
        obj.title += "*";
        addTopic(obj, cb);
      } else {
        cb(null, obj);
      }
    }
  );
}

function postData(err, object) {
  dbConnect.query(
    `SELECT exists(SELECT name FROM material WHERE material.name = '${object.material}') FROM material LIMIT 1;`,
    (err, res) => {
      if (err) return console.log("Some Thing happend while checking the mate");
      console.log(res.rows[0]);
      if (res.rows[0].exists) {
        dbConnect.query(
          `INSERT INTO topics (title, body, material_id) VALUES ('${object.title}', '${object.body}', (SELECT id FROM material WHERE material.name = '${object.material}')) RETURNING ID;`,
          (err, res) => {
            //make an insertion to the topics table with the title and the body coming from the user, and the material_id being returned from the callback this is nested in
            // console.log("Error :\t", err);
            // console.log("response :\t", res);
            if (err) {
              console.log("err", err);
            }
            console.log("topic added", res.rows[0].id);
          }
        );
      } else {
        console.log("got here", object.material);
        dbConnect.query(
          `INSERT INTO material (name) VALUES ('${object.material}') RETURNING ID;`,
          (err, res) => {
            //make insertion of the material to the materials table, returning the ID
            if (err) return console.log("Error There isan error:\t", err);

            console.log("material added");
            const materialID = res.rows[0].id; //apparently this is how you get the id of the most recently inserted row
            console.log("materialID", materialID);
            dbConnect.query(
              `INSERT INTO topics (title, body, material_id) VALUES ('${object.title}', '${object.body}', ${materialID}) RETURNING ID;`,
              (err, res) => {
                //make an insertion to the topics table with the title and the body coming from the user, and the material_id being returned from the callback this is nested in
                if (err) return console.log("err:\t");

                console.log("topic added");
              }
            );
          }
        );
      }
    }
  );
}

module.exports = {
  postData,
  addTopic
};
