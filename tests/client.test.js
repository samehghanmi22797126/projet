const request = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

let token;

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);
  await User.deleteMany({});

  const user = await User.create({
    name: "Agent",
    email: "agent@example.com",
    password: "password123",
    role: "agent",
  });

  token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Client endpoints", () => {
  it("should create a client", async () => {
    const res = await request(app)
      .post("/api/clients")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Client Test",
        email: "client@example.com",
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe("Client Test");
  });

  it("should get clients", async () => {
    const res = await request(app)
      .get("/api/clients")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
