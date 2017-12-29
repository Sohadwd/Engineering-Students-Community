const dbConnection = require("../../database/db_connection.js");

const getData = cb => {
  dbConnection.query(
    "SELECT topics_org.title, topics_org.body, material.name AS seme_name FROM topics AS topics_org INNER JOIN material ON topics_org.material_id = material.id",
    (err, res) => {
      if (err) {
        cb(err);
      } else {
        cb(null, res.rows);
      }
    }
  );
};

module.exports = getData;
