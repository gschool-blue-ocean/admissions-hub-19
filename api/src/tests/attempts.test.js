const request = require("supertest");

const { baseURL } = require("../../testEnv.js");

let attemptsLength = 0; // holds length of all attempts
describe(`GET all /attempts`, () => {
  it("should return 200", async () => {
    const response = await request(baseURL).get(`/attempts`);
    expect(response.statusCode).toBe(200);
    expect(response.error).toBe(false);
  });
  it(`should return attempts`, async () => {
    const response = await request(baseURL).get(`/attempts`);
    expect(response.body.length >= 1).toBe(true);
    attemptsLength = response.body.length;
  });
});

describe("GET valid /attempt/:id", () => {
  const id = 1;
  it("should return 200", async () => {
    const response = await request(baseURL).get(`/attempt/${id}`);
    expect(response.statusCode).toBe(200);
    expect(response.error).toBe(false);
  });
  it("should return 1 attempt", async () => {
    const response = await request(baseURL).get(`/attempt/${id}`);
    expect(response.body.attempt_id == id).toBe(true);
  });
});

describe("GET int invalid /attempt/:id", () => {
  const id = 0;
  it("should return 404", async () => {
    const response = await request(baseURL).get(`/attempt/${id}`);
    expect(response.statusCode).toBe(404);
    expect(response.text == "Not Found").toBe(true);
  });
});

describe("GET non-int /attempt/:id", () => {
  const id = "p";
  it("should return 400", async () => {
    const response = await request(baseURL).get(`/attempt/${id}`);
    expect(response.statusCode).toBe(400);
    expect(response.text == "Bad Request").toBe(true);
  });
});

describe("GET valid /attempts/student/:id", () => {
  const id = 1;
  it("should return 200", async () => {
    const response = await request(baseURL).get(`/attempts/student/${id}`);
    expect(response.statusCode).toBe(200);
    expect(response.error).toBe(false);
  });
  it("should return all attempts by student", async () => {
    const response = await request(baseURL).get(`/attempts/student/${id}`);
    expect(response.body.length >= 1).toBe(true);
  });
});

describe("GET int invalid /attempts/student/:id", () => {
  const id = 0;
  it("should return 404", async () => {
    const response = await request(baseURL).get(`/attempts/student/${id}`);
    expect(response.statusCode).toBe(404);
    expect(response.text == "Not Found").toBe(true);
  });
});

describe("GET non-int /attempts/student/:id", () => {
  const id = "p";
  it("should return 400", async () => {
    const response = await request(baseURL).get(`/attempts/student/${id}`);
    expect(response.statusCode).toBe(400);
    expect(response.text == "Bad Request").toBe(true);
  });
});

describe("GET valid /attempts/staff/:id", () => {
  const id = 2;
  it("should return 200", async () => {
    const response = await request(baseURL).get(`/attempts/staff/${id}`);
    expect(response.statusCode).toBe(200);
    expect(response.error).toBe(false);
  });
  it("should return all attempts by staff", async () => {
    const response = await request(baseURL).get(`/attempts/staff/${id}`);
    expect(response.body.length >= 1).toBe(true);
  });
});

describe("GET int invalid /attempts/staff/:id", () => {
  const id = 0;
  it("should return 404", async () => {
    const response = await request(baseURL).get(`/attempts/staff/${id}`);
    expect(response.statusCode).toBe(404);
    expect(response.text == "Not Found").toBe(true);
  });
});

describe("GET non-int /attempts/staff/:id", () => {
  const id = "p";
  it("should return 400", async () => {
    const response = await request(baseURL).get(`/attempts/staff/${id}`);
    expect(response.statusCode).toBe(400);
    expect(response.text == "Bad Request").toBe(true);
  });
});

let postID = 0; // holds attempt_id of newly created attempt
describe("POST /attempt/", () => {
  let testDate = new Date();
  testDate = `${testDate.getFullYear()}-${testDate.getMonth()}-${testDate.getDate()}`;
  const newattempt = {
    date: testDate,
    student_id: 1,
    staff_id: 2,
    question1_id: 1,
    answer1: "none",
    rating1: 0,
    question2_id: 1,
    answer2: "none",
    rating2: 0,
    question3_id: 1,
    answer3: "none",
    rating3: 0,
    notes: "Student just locked up!",
    rating_score: 0,
    pass: true,
  };
  it("should create and return 1 attempt", async () => {
    const response = await request(baseURL).post("/attempt").send(newattempt);
    postID = response.body.attempt_id;
    expect(response.statusCode).toBe(200);
    expect(response.body.pass == true).toBe(true);
  });
  it("should be previous attempt.length + 1", async () => {
    const response = await request(baseURL).get("/attempts");
    expect(response.body.length == attemptsLength + 1).toBe(true);
  });
});

describe("UPDATE valid /attempt/:id", () => {
  const updateattempt = {
    pass: false,
  };
  it("should update and return updated info", async () => {
    const response = await request(baseURL)
      .patch(`/attempt/${postID}`)
      .send(updateattempt);
    expect(response.statusCode).toBe(200);
    expect(response.body.pass == false).toBe(true);
  });
});

describe("UPDATE int invalid /attempt/:id", () => {
  const id = 0;
  const updateattempt = {
    pass: false,
  };
  it("should return 404", async () => {
    const response = await request(baseURL)
      .patch(`/attempt/${id}`)
      .send(updateattempt);
    expect(response.statusCode).toBe(404);
    expect(response.text == "Not Found").toBe(true);
  });
});

describe("UPDATE non-int invalid /attempt/:id", () => {
  const id = "p";
  const updateattempt = {
    pass: false,
  };
  it("should return 400", async () => {
    const response = await request(baseURL)
      .patch(`/attempt/${id}`)
      .send(updateattempt);
    expect(response.statusCode).toBe(400);
    expect(response.text == "Bad Request").toBe(true);
  });
});

describe("UPDATE invalid key names /attempt/:id", () => {
  const updateUser = {
    passes: false,
  };
  it("should return 400", async () => {
    const response = await request(baseURL)
      .patch(`/user/${postID}`)
      .send(updateUser);
    expect(response.statusCode).toBe(400);
    expect(response.text == "Recieved incorrect info").toBe(true);
  });
});

describe("DELETE valid /attempt/:id", () => {
  it("should return 204", async () => {
    const response = await request(baseURL).delete(`/attempt/${postID}`);
    expect(response.statusCode).toBe(204);
  });
  it("GET attempt_id should return 404", async () => {
    const response = await request(baseURL).get(`/attempt/${postID}`);
    expect(response.statusCode).toBe(404);
    expect(response.text == "Not Found").toBe(true);
  });
});

describe("DELETE int invalid /attempt/:id", () => {
  it("should return 404", async () => {
    const response = await request(baseURL).delete(`/attempt/${postID}`);
    expect(response.statusCode).toBe(404);
    expect(response.text == "Not Found").toBe(true);
  });
});

describe("DELETE non-int invalid /attempt/:id", () => {
  const id = "p";
  it("should return 400", async () => {
    const response = await request(baseURL).delete(`/attempt/${id}`);
    expect(response.statusCode).toBe(400);
    expect(response.text == "Bad Request").toBe(true);
  });
});
