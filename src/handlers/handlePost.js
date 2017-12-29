const qs = require("querystring");
const postData = require("../postData.js");

const handlePost = (req, res) => {
  let data = "";
  req.on("data", chunk => {
    data += chunk;
  });
  req.on("end", () => {
    const topicObj = qs.parse(data);
    res.writeHead(302, { Location: "/thanks" });
    postData.addTopic(topicObj, postData.postData);
    res.end();
  });
};

module.exports = handlePost;
