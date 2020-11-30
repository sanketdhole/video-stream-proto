const db = require("../utils/db");

module.exports.getFeed = (req, res, next) => {
  //fetch most recent feed
  db.all("select * from posts order by created_at desc limit 10", (e, rows) => {
    if (e) {
      next("Error processing request");
    } else {
      let resObj = { posts: rows };
      res.send(resObj);
    }
  });
};
