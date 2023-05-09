const request = require("supertest");

const { baseURL } = require("../../testEnv.js");

let cohortsLength = 0; // holds length of all cohorts
describe(`GET all /cohorts`, () => {
  it("should return 200", async () => {
    const response = await request(baseURL).get(`/cohorts`);
    expect(response.statusCode).toBe(200);
    expect(response.error).toBe(false);
  });
  it(`should return cohorts`, async () => {
    const response = await request(baseURL).get(`/cohorts`);
    expect(response.body.length >= 1).toBe(true);
    cohortsLength = response.body.length;
  });
});

describe("GET valid /cohort/:id", () => {
  const id = 1;
  it("should return 200", async () => {
    const response = await request(baseURL).get(`/cohort/${id}`);
    expect(response.statusCode).toBe(200);
    expect(response.error).toBe(false);
  });
  it("should return 1 cohort", async () => {
    const response = await request(baseURL).get(`/cohort/${id}`);
    expect(response.body.cohort_id == id).toBe(true);
  });
});

describe("GET int invalid /cohort/:id", () => {
  const id = 0;
  it("should return 404", async () => {
    const response = await request(baseURL).get(`/cohort/${id}`);
    expect(response.statusCode).toBe(404);
    expect(response.text == "Not Found").toBe(true);
  });
});

describe("GET non-int /cohort/:id", () => {
  const id = "p";
  it("should return 400", async () => {
    const response = await request(baseURL).get(`/cohort/${id}`);
    expect(response.statusCode).toBe(400);
    expect(response.text == "Bad Request").toBe(true);
  });
});

let postID = 0; // holds cohort_id of newly created cohort
describe("POST /cohort/", () => {
  let testDate = new Date();
  testDate = `${testDate.getFullYear()}-${testDate.getMonth()}-${testDate.getDate()}`;
  const newCohort = {
    name: "TEST",
    start_date: testDate,
  };
  it("should create and return 1 cohort", async () => {
    const response = await request(baseURL).post("/cohort").send(newCohort);
    postID = response.body.cohort_id;
    expect(response.statusCode).toBe(200);
    expect(response.body.name == "TEST").toBe(true);
  });
  it("should be previous cohort.length + 1", async () => {
    const response = await request(baseURL).get("/cohorts");
    expect(response.body.length == cohortsLength + 1).toBe(true);
  });
});

describe("UPDATE valid /cohort/:id", () => {
  const updateCohort = {
    name: "TESTED",
  };
  it("should update and return updated info", async () => {
    const response = await request(baseURL)
      .patch(`/cohort/${postID}`)
      .send(updateCohort);
    expect(response.statusCode).toBe(200);
    expect(response.body.name == "TESTED").toBe(true);
  });
});

describe("UPDATE int invalid /cohort/:id", () => {
  const id = 0;
  const updateCohort = {
    name: "TESTED",
  };
  it("should return 404", async () => {
    const response = await request(baseURL)
      .patch(`/cohort/${id}`)
      .send(updateCohort);
    expect(response.statusCode).toBe(404);
    expect(response.text == "Not Found").toBe(true);
  });
});

describe("UPDATE non-int invalid /cohort/:id", () => {
  const id = "p";
  const updateCohort = {
    name: "TESTED",
  };
  it("should return 400", async () => {
    const response = await request(baseURL)
      .patch(`/cohort/${id}`)
      .send(updateCohort);
    expect(response.statusCode).toBe(400);
    expect(response.text == "Bad Request").toBe(true);
  });
});

describe("DELETE valid /cohort/:id", () => {
  it("should return 204", async () => {
    const response = await request(baseURL).delete(`/cohort/${postID}`);
    expect(response.statusCode).toBe(204);
  });
  it("GET cohort_id should return 404", async () => {
    const response = await request(baseURL).get(`/cohort/${postID}`);
    expect(response.statusCode).toBe(404);
    expect(response.text == "Not Found").toBe(true);
  });
});

describe("DELETE int invalid /cohort/:id", () => {
  it("should return 404", async () => {
    const response = await request(baseURL).delete(`/cohort/${postID}`);
    expect(response.statusCode).toBe(404);
    expect(response.text == "Not Found").toBe(true);
  });
});

describe("DELETE non-int invalid /cohort/:id", () => {
  const id = "p";
  it("should return 400", async () => {
    const response = await request(baseURL).delete(`/cohort/${id}`);
    expect(response.statusCode).toBe(400);
    expect(response.text == "Bad Request").toBe(true);
  });
});
