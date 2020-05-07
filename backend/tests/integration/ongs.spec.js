const request = require("supertest");
const app = require("../../src/app");
const connection = require("../../src/database/connection");

describe("ONG", () => {
  beforeAll(async () => {
    await connection.migrate.rollback();
    await connection.migrate.latest();
  });

  afterAll(async () => {
    await connection.destroy();
  });

  let id;

  it("should be able to create new ONG", async () => {
    const response = await request(app)
      .post("/ongs")
      .send({
        name: "Casa de Palha",
        email: "contato@gmail.com",
        whatsapp: "86989891472",
        city: "Teresina",
        uf: "PI"
      });

    expect(response.body).toHaveProperty("id");
    expect(response.body.id).toHaveLength(8);
    id = response.body.id;
  });

  it("should be able to create new ONG 2", async () => {
    const response = await request(app).get("/ongs");

    console.log(response.body);
    expect(true).toBe(true);
  });
});
