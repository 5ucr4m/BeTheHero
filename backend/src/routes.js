const express = require("express");
const { celebrate, Segments, Joi } = require("celebrate");

const OngController = require("./controllers/OngController");
const IncidentController = require("./controllers/IncidentController");
const ProfileController = require("./controllers/ProfileController");
const SessionController = require("./controllers/SessionController");

const routes = express.Router();

const ongsSchema = {
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    whatsapp: Joi.string().required().min(10).max(11),
    city: Joi.string().required(),
    uf: Joi.string().required().length(2),
  }),
};

const authSchema = {
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required(),
  }).unknown(),
};

const pageSchema = {
  [Segments.QUERY]: {
    page: Joi.number(),
  },
};

const paramsSchema = {
  [Segments.PARAMS]: {
    id: Joi.number().required(),
  },
};

routes.get("/", (req, res) => {
  return res.json({
    evento: "Semana Omnistack 11",
    author: "Marcus Vincius Campos Soares",
  });
});

routes.post("/baxim", (req, res) => {
  console.log(req.headers);
  res.json(res);
});

routes.post("/session", SessionController.store);

routes.get("/ongs", OngController.index);
routes.post("/ongs", celebrate(ongsSchema), OngController.store);

routes.get("/profile", celebrate(authSchema), ProfileController.index);

routes.get("/incidents", celebrate(pageSchema), IncidentController.index);
routes.post("/incidents", IncidentController.store);
routes.delete(
  "/incidents/:id",
  celebrate(paramsSchema),
  celebrate(authSchema),
  IncidentController.delete
);

module.exports = routes;
