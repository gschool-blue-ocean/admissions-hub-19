const request = require("supertest");

const { baseURL } = require("../../testEnv.js");

let usersLength = 0; // holds length of all users
describe(`GET all /users`, () => {
  it("should return 200", async () => {
    const response = await request(baseURL).get(`/users`);
    expect(response.statusCode).toBe(200);
    expect(response.error).toBe(false);
  });
  it(`should return users`, async () => {
    const response = await request(baseURL).get(`/users`);
    expect(response.body.length >= 1).toBe(true);
    usersLength = response.body.length;
  });
});

describe("GET valid /user/:id", () => {
  const id = 1;
  it("should return 200", async () => {
    const response = await request(baseURL).get(`/user/${id}`);
    expect(response.statusCode).toBe(200);
    expect(response.error).toBe(false);
  });
  it("should return 1 user", async () => {
    const response = await request(baseURL).get(`/user/${id}`);
    expect(response.body.user_id == id).toBe(true);
  });
});

describe("GET int invalid /user/:id", () => {
  const id = 0;
  it("should return 404", async () => {
    const response = await request(baseURL).get(`/user/${id}`);
    expect(response.statusCode).toBe(404);
    expect(response.text == "Not Found").toBe(true);
  });
});

describe("GET non-int /user/:id", () => {
  const id = "p";
  it("should return 400", async () => {
    const response = await request(baseURL).get(`/user/${id}`);
    expect(response.statusCode).toBe(400);
    expect(response.text == "Bad Request").toBe(true);
  });
});

describe("POST with duplicated email address /user/", () => {
  const id = 1;
  let newUser;
  beforeAll(async () => {
    let response = await request(baseURL).get(`/user/${id}`);
    response = JSON.parse(response.text);
    newUser = {
      first_name: response.first_name,
      last_name: response.last_name,
      email: response.email,
      is_staff: response.is_staff,
      salt: response.salt,
      password_hash: response.password_hash,
    };
    //console.log("NewUser:", newUser);
  });
  it("should deny creation of a pre-existing email", async () => {
    const response = await request(baseURL).post("/user").send(newUser);
    //console.log("RESPONSE:", response);
    expect(response.statusCode).toBe(400);
    expect(response.text == "Email address already exists").toBe(true);
  });
});

describe("POST with incorrect key names /user/", () => {
  const newUser = {
    first_names: "Johny",
    last_names: "Quest",
    emails: "Johny.Quest@thefuture.net",
    is_staff: true,
    salt: "passwordSalt",
    password_hash: "passwordHash",
  };
  //console.log("NewUser:", newUser);
  it("should deny creation when recieving bad key names", async () => {
    const response = await request(baseURL).post("/user").send(newUser);
    expect(response.statusCode).toBe(400);
    expect(response.text == "Recieved incorrect info").toBe(true);
  });
});

let postID = 0; // holds user_id of newly created user
describe("POST /user/", () => {
  const newUser = {
    first_name: "Johny",
    last_name: "Quest",
    email: "Johny.Quest@thefuture.net",
    is_staff: true,
    salt: "passwordSalt",
    password_hash: "passwordHash",
  };
  it("should create and return 1 user", async () => {
    const response = await request(baseURL).post("/user").send(newUser);
    postID = response.body.user_id;
    expect(response.statusCode).toBe(200);
    expect(response.body.email == "Johny.Quest@thefuture.net").toBe(true);
  });
  it("should be previous user.length + 1", async () => {
    const response = await request(baseURL).get("/users");
    expect(response.body.length == usersLength + 1).toBe(true);
  });
});

describe("UPDATE valid /user/:id", () => {
  const updateUser = {
    email: "Johny.Quest@thepast.net",
  };
  it("should update and return updated info", async () => {
    const response = await request(baseURL)
      .patch(`/user/${postID}`)
      .send(updateUser);
    expect(response.statusCode).toBe(200);
    expect(response.body.email == "Johny.Quest@thepast.net").toBe(true);
  });
});

describe("UPDATE int invalid /user/:id", () => {
  const id = 0;
  const updateUser = {
    email: "Johny.Quest@thepast.net",
  };
  it("should return 404", async () => {
    const response = await request(baseURL)
      .patch(`/user/${id}`)
      .send(updateUser);
    expect(response.statusCode).toBe(404);
    expect(response.text == "Not Found").toBe(true);
  });
});

describe("UPDATE non-int invalid /user/:id", () => {
  const id = "p";
  const updateUser = {
    email: "Johny.Quest@thepast.net",
  };
  it("should return 400", async () => {
    const response = await request(baseURL)
      .patch(`/user/${id}`)
      .send(updateUser);
    expect(response.statusCode).toBe(400);
    expect(response.text == "Bad Request").toBe(true);
  });
});

describe("UPDATE invalid key names /user/:id", () => {
  const updateUser = {
    emails: "Johny.Quest@thepast.net",
  };
  it("should return 400", async () => {
    const response = await request(baseURL)
      .patch(`/user/${postID}`)
      .send(updateUser);
    expect(response.statusCode).toBe(400);
    expect(response.text == "Recieved incorrect info").toBe(true);
  });
});

describe("DELETE valid /user/:id", () => {
  it("should return 204", async () => {
    const response = await request(baseURL).delete(`/user/${postID}`);
    expect(response.statusCode).toBe(204);
  });
  it("GET user_id should return 404", async () => {
    const response = await request(baseURL).get(`/user/${postID}`);
    expect(response.statusCode).toBe(404);
    expect(response.text == "Not Found").toBe(true);
  });
});

describe("DELETE int invalid /user/:id", () => {
  it("should return 404", async () => {
    const response = await request(baseURL).delete(`/user/${postID}`);
    expect(response.statusCode).toBe(404);
    expect(response.text == "Not Found").toBe(true);
  });
});

describe("DELETE non-int invalid /user/:id", () => {
  const id = "p";
  it("should return 400", async () => {
    const response = await request(baseURL).delete(`/user/${id}`);
    expect(response.statusCode).toBe(400);
    expect(response.text == "Bad Request").toBe(true);
  });
});
