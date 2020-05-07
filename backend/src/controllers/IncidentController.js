const crypto = require("crypto");
const connection = require("../database/connection");

module.exports = {
  index: async (req, res) => {
    const { page = 1 } = req.query;

    const [count] = await connection("incidents").count();

    const incidents = await connection("incidents")
      .join("ongs", "ongs.id", "=", "incidents.ong_id")
      .limit(5)
      .offset((page - 1) * 5)
      .select(["ongs.*", "incidents.*"]);

    res.header("X-Total-Count", count["count(*)"]);

    return res.json(incidents);
  },
  store: async (req, res) => {
    const { title, description, value } = req.body;
    const { authorization } = req.headers;

    const [id] = await connection("incidents").insert({
      title,
      description,
      value,
      ong_id: authorization
    });

    return res.json({ id });
  },
  delete: async (req, res) => {
    const { id } = req.params;
    const ong_id = req.headers.authorization;

    const incident = await connection("incidents")
      .where("id", id)
      .select("ong_id")
      .first();

    if (!incident) {
      return res.status(401).json({ error: "Operation not permited." });
    }

    if (incident.ong_id !== ong_id) {
      return res.status(401).json({ error: "Operation not permited." });
    }

    await connection("incidents")
      .delete()
      .where("id", id);

    return res.status(204).send();
  }
};
