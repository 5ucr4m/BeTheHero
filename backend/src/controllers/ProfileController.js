const connection = require("../database/connection");

module.exports = {
  index: async (req, res) => {
    const { authorization } = req.headers;
    const incidents = await connection("incidents")
      .where("ong_id", authorization)
      .select("*");
    return res.json(incidents);
  }
};
