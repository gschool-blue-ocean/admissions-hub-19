import pg from "pg";
const db = new pg.Pool({ connectionString: process.env.DATABASE_URL });

async function findAll(_req, res, next) {
  const result = await db.query("SELECT * FROM users").catch(next);
  console.log("Result", result.rows);
  res.send(result.rows);
}

async function findOne(req, res, next) {
  const result = await db
    .query("SELECT * FROM users WHERE id=$1", [req.params.id])
    .catch(next);
  console.log("Result", result.rows);
  res.send(result.rows[0]);
}

async function create(req, res, next) {
  const { first_name, last_name, email, is_staff, salt, password_hash } =
    req.body;
  const keys = "first_name, last_name, email, isStaff, salt, password_hash";

  const result = await db
    .query(`INSERT INTO users(${keys}) VALUES ($1)`, [
      first_name,
      last_name,
      email,
      is_staff,
      salt,
      password_hash,
    ])
    .catch(next);
  res.send(result.rows[0]);
}

async function remove(req, res, next) {
  await db
    .query("DELETE FROM users WHERE id = $1", [req.params.id])
    .catch(next);
  res.sendStatus(204);
}

async function update(req, res, next) {
  const request = { id: req.params.id };

  // Perform the update for each key value requested
  for (let key in req.params.body) {
    let queryText = `UPDATE users SET ${key}=$1 WHERE id = $2`;
    await db
      .query(queryText, [req.params.body[key], req.params.id])
      .catch(next);
    request.key = req.params.body[key];
  }
  res.send(request);
}

export default { findAll, findOne, create, remove, update };
