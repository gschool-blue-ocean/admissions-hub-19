const request = require("supertest");

const { baseURL } = require("../../testEnv.js");

let studentsLength = 0; // holds length of all students
describe(`GET all /students`, () => {
  it("should return 200", async () => {
    const response = await request(baseURL).get(`/students`);
    expect(response.statusCode).toBe(200);
    expect(response.error).toBe(false);
  });
  it(`should return students`, async () => {
    const response = await request(baseURL).get(`/students`);
    expect(response.body.length >= 1).toBe(true);
    studentsLength = response.body.length;
  });
});

describe("GET valid /student/:id", () => {
  const id = 1;
  it("should return 200", async () => {
    const response = await request(baseURL).get(`/student/${id}`);
    expect(response.statusCode).toBe(200);
    expect(response.error).toBe(false);
  });
  it("should return 1 student", async () => {
    const response = await request(baseURL).get(`/student/${id}`);
    expect(response.body.student_id == id).toBe(true);
  });
});

describe("GET int invalid /student/:id", () => {
  const id = 0;
  it("should return 404", async () => {
    const response = await request(baseURL).get(`/student/${id}`);
    expect(response.statusCode).toBe(404);
    expect(response.text == "Not Found").toBe(true);
  });
});

describe("GET non-int /student/:id", () => {
  const id = "p";
  it("should return 400", async () => {
    const response = await request(baseURL).get(`/student/${id}`);
    expect(response.statusCode).toBe(400);
    expect(response.text == "Bad Request").toBe(true);
  });
});

describe("GET valid /students/cohort/:id", () => {
  const id = 1;
  it("should return 200", async () => {
    const response = await request(baseURL).get(`/students/cohort/${id}`);
    expect(response.statusCode).toBe(200);
    expect(response.error).toBe(false);
  });
  it("should return 1 student", async () => {
    const response = await request(baseURL).get(`/students/cohort/${id}`);
    expect(response.body.length >= 1).toBe(true);
  });
});

describe("GET int invalid /students/cohort/:id", () => {
  const id = 0;
  it("should return 404", async () => {
    const response = await request(baseURL).get(`/students/cohort/${id}`);
    expect(response.statusCode).toBe(404);
    expect(response.text == "Not Found").toBe(true);
  });
});

describe("GET non-int /students/cohort/:id", () => {
  const id = "p";
  it("should return 400", async () => {
    const response = await request(baseURL).get(`/students/cohort/${id}`);
    expect(response.statusCode).toBe(400);
    expect(response.text == "Bad Request").toBe(true);
  });
});

let postID = 0; // holds student_id of newly created student
describe("POST /student/", () => {
  const newstudent = {
    user_id: 1,
    cohort_id: 1,
    numattempts: 2,
    paid: true,
    paperwork1: true,
    paperwork2: true,
    paperwork3: true,
  };
  it("should create and return 1 student", async () => {
    const response = await request(baseURL).post("/student").send(newstudent);
    postID = response.body.student_id;
    expect(response.statusCode).toBe(200);
    expect(response.body.numattempts == 2).toBe(true);
  });
  it("should be previous student.length + 1", async () => {
    const response = await request(baseURL).get("/students");
    expect(response.body.length == studentsLength + 1).toBe(true);
  });
});

describe("UPDATE valid /student/:id", () => {
  const updatestudent = {
    numAttempts: 3,
  };
  it("should update and return updated info", async () => {
    const response = await request(baseURL)
      .patch(`/student/${postID}`)
      .send(updatestudent);
    expect(response.statusCode).toBe(200);
    expect(response.body.numattempts == 3).toBe(true);
  });
});

describe("UPDATE int invalid /student/:id", () => {
  const id = 0;
  const updatestudent = {
    numAttempts: 3,
  };
  it("should return 404", async () => {
    const response = await request(baseURL)
      .patch(`/student/${id}`)
      .send(updatestudent);
    expect(response.statusCode).toBe(404);
    expect(response.text == "Not Found").toBe(true);
  });
});

describe("UPDATE non-int invalid /student/:id", () => {
  const id = "p";
  const updatestudent = {
    numAttempts: 3,
  };
  it("should return 400", async () => {
    const response = await request(baseURL)
      .patch(`/student/${id}`)
      .send(updatestudent);
    expect(response.statusCode).toBe(400);
    expect(response.text == "Bad Request").toBe(true);
  });
});

describe("DELETE valid /student/:id", () => {
  it("should return 204", async () => {
    const response = await request(baseURL).delete(`/student/${postID}`);
    expect(response.statusCode).toBe(204);
  });
  it("GET student_id should return 404", async () => {
    const response = await request(baseURL).get(`/student/${postID}`);
    expect(response.statusCode).toBe(404);
    expect(response.text == "Not Found").toBe(true);
  });
});

describe("DELETE int invalid /student/:id", () => {
  it("should return 404", async () => {
    const response = await request(baseURL).delete(`/student/${postID}`);
    expect(response.statusCode).toBe(404);
    expect(response.text == "Not Found").toBe(true);
  });
});

describe("DELETE non-int invalid /student/:id", () => {
  const id = "p";
  it("should return 400", async () => {
    const response = await request(baseURL).delete(`/student/${id}`);
    expect(response.statusCode).toBe(400);
    expect(response.text == "Bad Request").toBe(true);
  });
});
