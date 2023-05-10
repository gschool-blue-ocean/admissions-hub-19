import pg from "pg";
const db = new pg.Pool({ connectionString: process.env.DATABASE_URL });

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
  const { first_name, last_name, email, is_staff, salt, password_hash } =
    req.body;
  const keys = "first_name, last_name, email, is_Staff, salt, password_hash";

  const result = await db
    .query("SELECT * FROM users WHERE email=$1", [email])
    .catch(next);
  if (result.rows.length != 0) {
    res.sendStatus(400);
  } else {
    const result = await db
      .query(
        `INSERT INTO users (${keys}) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
        [first_name, last_name, email, is_staff, salt, password_hash]
      )
      .catch(next);
    res.send(result.rows[0]);
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
  // Check if :id is valid
  if (Number.isNaN(parseInt(req.params.id))) {
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

export default { findAll, findOne, create, remove, update };
