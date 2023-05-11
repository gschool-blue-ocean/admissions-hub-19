const request = require("supertest");
const { baseURL } = require("../../testEnv.js");

describe(`Can Connect to API Routes`, () => {
  it("should return 200", async () => {
    const response = await request(baseURL).get(`/test`);
    expect(response.statusCode).toBe(200);
    expect(response.error).toBe(false);
  });
  it(`should return text`, async () => {
    const response = await request(baseURL).get(`/test`);
    expect(response.text == "Test Response Good").toBe(true);
  });
});

describe(`Returns error on bad route request`, () => {
  it("should return 404", async () => {
    const response = await request(baseURL).get(`/testing`);
    expect(response.statusCode).toBe(404);
    expect(response.text).toMatch("Cannot GET /testing");
  });
});

describe(`Can Retrieve data from Database`, () => {
  it("should return 200", async () => {
    const response = await request(baseURL).get(`/users`);
    expect(response.statusCode).toBe(200);
    expect(response.error).toBe(false);
  });
  it(`should return data`, async () => {
    const response = await request(baseURL).get(`/users`);
    expect(response.body.length >= 1).toBe(true);
  });
});

//import request from "supertest";
//import { it, expect, beforeAll, afterEach, afterAll } from "vitest";

//import server from "./server.js";
//import db from "./db/db.js";

// FIXME: Use docker in GitHub CI to setup a real database.

// beforeAll(() => {
//   // Run migrations against in-memory database.
//   return db.migrate.latest();
// });

// afterEach(() => {
//   // Clear out table after each test.
//   return db.table("tasks").truncate();
// });

// afterAll(() => {
//   return db.destroy();
// });

// it("GET /api/tasks returns tasks", async () => {
//   await request(server)
//     .post("/api/tasks")
//     .send({ description: "Clean bathroom" });
//   await request(server)
//     .post("/api/tasks")
//     .send({ description: "Do the laundry" });

//   const tasks = await request(server).get("/api/tasks");
//   expect(tasks.body).toEqual([
//     { id: expect.any(Number), description: "Clean bathroom" },
//     { id: expect.any(Number), description: "Do the laundry" },
//   ]);
// });

// it("DELETE /api/tasks deletes a task", async () => {
//   await request(server).post("/api/tasks").send({ description: "Do dishes" });

//   const {
//     body: { id },
//   } = await request(server).get("/api/tasks");

//   await request(server)
//     .delete(`/api/tasks/${id}`)
//     .send({ description: "Do dishes" });

//   const { status } = await request(server)
//     .get(`/api/tasks/${id}`)
//     .send({ description: "Do dishes" });

//   expect(status).toBe(404);
// });
