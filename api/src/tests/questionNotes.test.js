const request = require("supertest");

const { baseURL } = require("../../testEnv.js");

let question_notesLength = 0; // holds length of all question_notes
describe(`GET all /question_notes`, () => {
  it("should return 200", async () => {
    const response = await request(baseURL).get(`/question_notes`);
    expect(response.statusCode).toBe(200);
    expect(response.error).toBe(false);
  });
  it(`should return question_notes`, async () => {
    const response = await request(baseURL).get(`/question_notes`);
    expect(response.body.length >= 1).toBe(true);
    question_notesLength = response.body.length;
  });
});

describe("GET valid /question_note/:id", () => {
  const id = 1;
  it("should return 200", async () => {
    const response = await request(baseURL).get(`/question_note/${id}`);
    expect(response.statusCode).toBe(200);
    expect(response.error).toBe(false);
  });
  it("should return 1 question_note", async () => {
    const response = await request(baseURL).get(`/question_note/${id}`);
    expect(response.body.question_note_id == id).toBe(true);
  });
});

describe("GET int invalid /question_note/:id", () => {
  const id = 0;
  it("should return 404", async () => {
    const response = await request(baseURL).get(`/question_note/${id}`);
    expect(response.statusCode).toBe(404);
    expect(response.text == "Not Found").toBe(true);
  });
});

describe("GET non-int /question_note/:id", () => {
  const id = "p";
  it("should return 400", async () => {
    const response = await request(baseURL).get(`/question_note/${id}`);
    expect(response.statusCode).toBe(400);
    expect(response.text == "Bad Request").toBe(true);
  });
});

describe("GET valid /question_notes/question/:id", () => {
  const id = 1;
  it("should return 200", async () => {
    const response = await request(baseURL).get(
      `/question_notes/question/${id}`
    );
    expect(response.statusCode).toBe(200);
    expect(response.error).toBe(false);
  });
  it("should return 1 question_note", async () => {
    const response = await request(baseURL).get(
      `/question_notes/question/${id}`
    );
    expect(response.body.length >= 1).toBe(true);
  });
});

describe("GET int invalid /question_notes/question/:id", () => {
  const id = 0;
  it("should return 404", async () => {
    const response = await request(baseURL).get(
      `/question_notes/question/${id}`
    );
    expect(response.statusCode).toBe(404);
    expect(response.text == "Not Found").toBe(true);
  });
});

describe("GET non-int /question_notes/question/:id", () => {
  const id = "p";
  it("should return 400", async () => {
    const response = await request(baseURL).get(
      `/question_notes/question/${id}`
    );
    expect(response.statusCode).toBe(400);
    expect(response.text == "Bad Request").toBe(true);
  });
});

let postID = 0; // holds question_note_id of newly created question_note
describe("POST /question_note/", () => {
  const newquestion_note = {
    question_id: 1,
    note: "I am working long!",
  };
  it("should create and return 1 question_note", async () => {
    const response = await request(baseURL)
      .post("/question_note")
      .send(newquestion_note);
    postID = response.body.question_note_id;
    expect(response.statusCode).toBe(200);
    expect(response.body.note == "I am working long!").toBe(true);
  });
  it("should be previous question_note.length + 1", async () => {
    const response = await request(baseURL).get("/question_notes");
    expect(response.body.length == question_notesLength + 1).toBe(true);
  });
});

describe("UPDATE valid /question_note/:id", () => {
  const updatequestion_note = {
    note: "I have worked long!",
  };
  it("should update and return updated info", async () => {
    const response = await request(baseURL)
      .patch(`/question_note/${postID}`)
      .send(updatequestion_note);
    expect(response.statusCode).toBe(200);
    expect(response.body.note == "I have worked long!").toBe(true);
  });
});

describe("UPDATE int invalid /question_note/:id", () => {
  const id = 0;
  const updatequestion_note = {
    note: "I have worked long!",
  };
  it("should return 404", async () => {
    const response = await request(baseURL)
      .patch(`/question_note/${id}`)
      .send(updatequestion_note);
    expect(response.statusCode).toBe(404);
    expect(response.text == "Not Found").toBe(true);
  });
});

describe("UPDATE non-int invalid /question_note/:id", () => {
  const id = "p";
  const updatequestion_note = {
    email: "I have worked long!",
  };
  it("should return 400", async () => {
    const response = await request(baseURL)
      .patch(`/question_note/${id}`)
      .send(updatequestion_note);
    expect(response.statusCode).toBe(400);
    expect(response.text == "Bad Request").toBe(true);
  });
});

describe("DELETE valid /question_note/:id", () => {
  it("should return 204", async () => {
    const response = await request(baseURL).delete(`/question_note/${postID}`);
    expect(response.statusCode).toBe(204);
  });
  it("GET question_note_id should return 404", async () => {
    const response = await request(baseURL).get(`/question_note/${postID}`);
    expect(response.statusCode).toBe(404);
    expect(response.text == "Not Found").toBe(true);
  });
});

describe("DELETE int invalid /question_note/:id", () => {
  it("should return 404", async () => {
    const response = await request(baseURL).delete(`/question_note/${postID}`);
    expect(response.statusCode).toBe(404);
    expect(response.text == "Not Found").toBe(true);
  });
});

describe("DELETE non-int invalid /question_note/:id", () => {
  const id = "p";
  it("should return 400", async () => {
    const response = await request(baseURL).delete(`/question_note/${id}`);
    expect(response.statusCode).toBe(400);
    expect(response.text == "Bad Request").toBe(true);
  });
});
