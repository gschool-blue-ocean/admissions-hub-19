import pg from "pg";
import crypto from "crypto"
import  jwt  from "jsonwebtoken";

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl:
    process.env.NODE_ENV === "development"
      ? false
      : { rejectUnauthorized: false },
});

function generateHash(password) {

  const salt = crypto.randomBytes(16).toString('hex'); // Generate a random salt

  const hash = crypto
    .pbkdf2Sync(password, salt, 10000, 64, 'sha512') // Perform the hashing algorithm (pbkdf2Sync)
    .toString('hex'); // Convert the hash to a hexadecimal string
  return { salt, hash };
}
console.log(generateHash('password'))

async function findAll(_req, res, next) {
  const result = await db.query("SELECT * FROM users").catch(next);
  //console.log("Result", result.rows);
  res.send(result.rows);
}

async function findOne(req, res, next) {
  if (Number.isNaN(parseInt(req.params.id))) {
    res.sendStatus(400);
  } else {
    const result = await db
      .query("SELECT * FROM users WHERE user_id=$1", [req.params.id])
      .catch(next);
    if (result.rows.length != 1) {
      res.sendStatus(404);
    } else {
      //console.log("Result", result.rows[0]);
      res.send(result.rows[0]);
    }
  }
}

async function create(req, res, next) {
  const { first_name, last_name, email, password } = req.body;
  const keys = "first_name, last_name, email, salt, password_hash";
  const {salt, hash} = generateHash(password)
  //console.log("CREATE USER BODY:", req.body);
  if (
    first_name === undefined ||
    last_name === undefined ||
    email === undefined ||
    password === undefined
  ) {
    res.statusMessage = "Recieved incorrect info";
    res.status(400).send("Recieved incorrect info");
  } else {
    const result = await db
      .query("SELECT * FROM users WHERE email=$1", [email])
      .catch(next);
    if (result.rows.length != 0) {
      res.statusMessage = "Email address already exists";
      res.status(400).send("Email address already exists");
    } else {
      // const hash = await bcrypt.genSalt(10, (err, salt) => {
      //   bcrypt.hash(password_hash, salt, function(err, hash) {
      //   return hash});
      //   })

      const result = await db
        .query(
          `INSERT INTO users (${keys}) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
          [first_name, last_name, email, salt, hash]
        )
        .catch(next);
      res.send(result.rows[0]);
    }
  }
}

async function remove(req, res, next) {
  if (Number.isNaN(parseInt(req.params.id))) {
    res.sendStatus(400);
  } else {
    const result = await db
      .query("SELECT * FROM users WHERE user_id=$1", [req.params.id])
      .catch(next);
    if (result.rows.length != 1) {
      res.sendStatus(404);
    } else {
      await db
        .query("DELETE FROM users WHERE user_id = $1", [req.params.id])
        .catch(next);
      res.sendStatus(204);
    }
  }
}

async function update(req, res, next) {
  let haveKeys = true;
  const expectedKeys = [
    "first_name",
    "last_name",
    "email",
    "salt",
    "password_hash",
  ];
  for (let key in req.body) {
    if (!expectedKeys.includes(key)) {
      haveKeys = false;
    }
  }
  // Check if :id is valid
  if (!haveKeys) {
    res.status(400).send("Recieved incorrect info");
  } else if (Number.isNaN(parseInt(req.params.id))) {
    res.sendStatus(400);
  } else {
    const result = await db
      .query("SELECT * FROM users WHERE user_id=$1", [req.params.id])
      .catch(next);
    if (result.rows.length != 1) {
      res.sendStatus(404);
    } else {
      // Perform the update for each key value requested
      const request = { id: req.params.id };
      for (let key in req.body) {
        let queryText = `UPDATE users SET ${key}=$1 WHERE user_id = $2`;
        await db.query(queryText, [req.body[key], req.params.id]).catch(next);
        request[key] = req.body[key];
      }
      res.send(request);
    }
  }
}

async function authenticate(req, res, next) {
  const { email, password } = req.body;

  if (!email || !password) {
    res.statusMessage = "Missing email or password";
    res.status(400).send("Missing email or password");
    return;
  }

  const result = await db.query("SELECT * FROM users WHERE email=$1", [email])
    .catch(next);
  if (result.rows.length === 0) {
    res.statusMessage = "User not found";
    res.status(404).send("User not found");
    return;
  }

  const storedHash = result.rows[0].password_hash;
  const storedSalt = result.rows[0].salt;

  const inputHash = crypto.pbkdf2Sync(password, storedSalt, 10000, 64, 'sha512').toString('hex');

  if (inputHash === storedHash) {
    const payload = 
    { email: result.rows[0].email,
      userId: result.rows[0].user_id
    };
    const secretKey = crypto.randomBytes(30).toString('hex');
    const token = jwt.sign(payload, secretKey, { expiresIn: '1h' })
    res.send(
      {
        message: "Authentication successful", 
        token: token,
        email: payload.email,
        userId: payload.userId
      }); 
  } else {
    res.statusMessage = "Incorrect password";
    res.status(401).send("Incorrect password");
  }
}

export default { findAll, findOne, create, remove, update, authenticate };
