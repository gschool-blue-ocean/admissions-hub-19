const request = require("supertest");

const { baseURL } = require("../../testEnv.js");

let questionsLength = 0; // holds length of all questions
describe(`GET all /questions`, () => {
  it("should return 200", async () => {
    const response = await request(baseURL).get(`/questions`);
    expect(response.statusCode).toBe(200);
    expect(response.error).toBe(false);
  });
  it(`should return questions`, async () => {
    const response = await request(baseURL).get(`/questions`);
    expect(response.body.length >= 1).toBe(true);
    questionsLength = response.body.length;
  });
});

describe("GET valid /question/:id", () => {
  const id = 1;
  it("should return 200", async () => {
    const response = await request(baseURL).get(`/question/${id}`);
    expect(response.statusCode).toBe(200);
    expect(response.error).toBe(false);
  });
  it("should return 1 question", async () => {
    const response = await request(baseURL).get(`/question/${id}`);
    expect(response.body.question_id == id).toBe(true);
  });
});

describe("GET int invalid /question/:id", () => {
  const id = 0;
  it("should return 404", async () => {
    const response = await request(baseURL).get(`/question/${id}`);
    expect(response.statusCode).toBe(404);
    expect(response.text == "Not Found").toBe(true);
  });
});

describe("GET non-int /question/:id", () => {
  const id = "p";
  it("should return 400", async () => {
    const response = await request(baseURL).get(`/question/${id}`);
    expect(response.statusCode).toBe(400);
    expect(response.text == "Bad Request").toBe(true);
  });
});

let postID = 0; // holds question_id of newly created question
describe("POST /question/", () => {
  const newQuestion = {
    title: "Testing the Tested Question",
    question: "function () => { console.log('Testing' }",
    description: "Test question to verify that this table works",
  };
  it("should create and return 1 question", async () => {
    const response = await request(baseURL).post("/question").send(newQuestion);
    postID = response.body.question_id;
    expect(response.statusCode).toBe(200);
    expect(response.body.title == "Testing the Tested Question").toBe(true);
  });
  it("should be previous question.length + 1", async () => {
    const response = await request(baseURL).get("/questions");
    expect(response.body.length == questionsLength + 1).toBe(true);
  });
});

describe("UPDATE valid /question/:id", () => {
  const updateQuestion = {
    title: "TESTED the Tested Question",
  };
  it("should update and return updated info", async () => {
    const response = await request(baseURL)
      .patch(`/question/${postID}`)
      .send(updateQuestion);
    expect(response.statusCode).toBe(200);
    expect(response.body.title == "TESTED the Tested Question").toBe(true);
  });
});

describe("UPDATE int invalid /question/:id", () => {
  const id = 0;
  const updateQuestion = {
    title: "TESTED the Tested Question",
  };
  it("should return 404", async () => {
    const response = await request(baseURL)
      .patch(`/question/${id}`)
      .send(updateQuestion);
    expect(response.statusCode).toBe(404);
    expect(response.text == "Not Found").toBe(true);
  });
});

describe("UPDATE non-int invalid /question/:id", () => {
  const id = "p";
  const updateQuestion = {
    title: "TESTED the Tested Question",
  };
  it("should return 400", async () => {
    const response = await request(baseURL)
      .patch(`/question/${id}`)
      .send(updateQuestion);
    expect(response.statusCode).toBe(400);
    expect(response.text == "Bad Request").toBe(true);
  });
});

describe("UPDATE invalid key names /question/:id", () => {
  const updateUser = {
    titles: "TESTED the Tested Question",
  };
  it("should return 400", async () => {
    const response = await request(baseURL)
      .patch(`/user/${postID}`)
      .send(updateUser);
    expect(response.statusCode).toBe(400);
    expect(response.text == "Recieved incorrect info").toBe(true);
  });
});

describe("DELETE valid /question/:id", () => {
  it("should return 204", async () => {
    const response = await request(baseURL).delete(`/question/${postID}`);
    expect(response.statusCode).toBe(204);
  });
  it("GET question_id should return 404", async () => {
    const response = await request(baseURL).get(`/question/${postID}`);
    expect(response.statusCode).toBe(404);
    expect(response.text == "Not Found").toBe(true);
  });
});

describe("DELETE int invalid /question/:id", () => {
  it("should return 404", async () => {
    const response = await request(baseURL).delete(`/question/${postID}`);
    expect(response.statusCode).toBe(404);
    expect(response.text == "Not Found").toBe(true);
  });
});

describe("DELETE non-int invalid /question/:id", () => {
  const id = "p";
  it("should return 400", async () => {
    const response = await request(baseURL).delete(`/question/${id}`);
    expect(response.statusCode).toBe(400);
    expect(response.text == "Bad Request").toBe(true);
  });
});
