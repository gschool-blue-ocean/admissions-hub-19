const request = require("supertest");

const { baseURL } = require("../../testEnv.js");

// NOTE
// NO LONGER NEEDED AT STUDENTS IS NOT JOINED TO USERS
//
//let testUserID = 1; // holds the test user_id needed for creating a new student
// beforeAll ( async () => {
//   const newUser = {
//     first_name: "Bugs",
//     last_name: "Bunny",
//     email: "Bugs.Bunny@LooneyToons.com",
//     is_staff: false,
//     salt: "passwordSalt",
//     password_hash: "passwordHash",
//   };
//   const response = await request(baseURL).post("/user").send(newUser);
//   testUserID = response.body.user_id;
//   console.log("CREATE USER FOR TESTING:", testUserID);
//   console.log("CREATE USER FOR TESTING:", response.body);
// });

// afterAll(async () => {
//   await request(baseURL).delete(`/user/${testUserID}`);
//   console.log("DELETED USER FOR TESTING");
// });

// describe("Creating a test /user/", () => {
//   const newUser = {
//     first_name: "Bugs",
//     last_name: "Bunny",
//     email: "Bugs.Bunny@LooneyToons.com",
//     is_staff: false,
//     salt: "passwordSalt",
//     password_hash: "passwordHash",
//   };
//   it("creating a test user", async () => {
//     const response = await request(baseURL).post("/user").send(newUser);
//     expect(response.statusCode).toBe(200);
//     expect(response.body.email == "Bugs.Bunny@LooneyToons.com").toBe(true);
//     testUserID = response.body.user_id;
//     console.log("CREATE USER FOR TESTING:", testUserID);
//     console.log("CREATE USER FOR TESTING:", response.body);
//   });
// });

//console.log("testUserID: ", testUserID);

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
    first_name: "Jimmy",
    last_name: "Nuetron",
    email: "jimmy.nuetron@space.com",
    cohort_id: 1,
    numattempts: 2,
    paid: true,
    paperwork: true,
  };
  //console.log("TEST USER INFO:", newstudent);
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

//console.log("Updated postID:", postID);

describe("POST duplicate /student/", () => {
  const newstudent = {
    first_name: "Jimmy",
    last_name: "Nuetron",
    email: "jimmy.nuetron@space.com",
    cohort_id: 1,
    numattempts: 2,
    paid: true,
    paperwork: true,
  };
  it("should return 400", async () => {
    const response = await request(baseURL).post("/student").send(newstudent);
    expect(response.statusCode).toBe(400);
    expect(response.text == "Student email already exists").toBe(true);
  });
});

describe("UPDATE valid /student/:id", () => {
  const updateStudent = { numattempts: 3 };
  it("should update and return updated info", async () => {
    const response = await request(baseURL)
      .patch(`/student/${postID}`)
      .send(updateStudent);
    //console.log("UPDATE RESPONSE:", response.body);
    expect(response.statusCode).toBe(200);
    expect(response.body.numattempts == 3).toBe(true);
  });
});

describe("UPDATE int invalid /student/:id", () => {
  const id = 0;
  const updateStudent = { numattempts: 3 };
  it("should return 404", async () => {
    const response = await request(baseURL)
      .patch(`/student/${id}`)
      .send(updateStudent);
    expect(response.statusCode).toBe(404);
    expect(response.text == "Not Found").toBe(true);
  });
});

describe("UPDATE non-int invalid /student/:id", () => {
  const id = "p";
  const updateStudent = { numattempts: 3 };
  it("should return 400", async () => {
    const response = await request(baseURL)
      .patch(`/student/${id}`)
      .send(updateStudent);
    expect(response.statusCode).toBe(400);
    expect(response.text == "Bad Request").toBe(true);
  });
});

describe("UPDATE invalid key names /student/:id", () => {
  const updateStudent = { numattempt: 3 };
  it("should return 400", async () => {
    const response = await request(baseURL)
      .patch(`/user/${postID}`)
      .send(updateStudent);
    expect(response.statusCode).toBe(400);
    expect(response.text == "Recieved incorrect info").toBe(true);
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

// NOTE
// NO LONGER NEEDED AT STUDENTS IS NO LONGER JOINED TO USERS
// describe("DELETE test /user/:id", () => {
//   it("should return 204", async () => {
//     const response = await request(baseURL).delete(`/user/${testUserID}`);
//     expect(response.statusCode).toBe(204);
//   });
//   it("GET user_id should return 404", async () => {
//     const response = await request(baseURL).get(`/user/${testUserID}`);
//     expect(response.statusCode).toBe(404);
//     expect(response.text == "Not Found").toBe(true);
//   });
// });
