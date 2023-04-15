const request = require("supertest");
const app = require("./index.js");
const jwt = require("jsonwebtoken");

const secretKeys = "ss";

describe("GET /gettoken/:name", () => {
  test("should return a JWT token", async () => {
    const res = await request(app).get("/gettoken/wut").expect(200);
    console.log(res.text);
    const decoded = jwt.verify(res.text, secretKeys);
    expect(decoded.user).toBe("wut");
  });
});

test("Querry", async () => {
  const response = await request(app).get("/test");
  expect(response.statusCode).toBe(200);
  expect(response.text).toBe(
    '[{"ID":1,"Equa":"x^4-13"},{"ID":2,"Equa":"1/4+x/2"}]'
  );
});