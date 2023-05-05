import pg from "pg";
const db = new pg.Pool({ connectionString: process.env.DATABASE_URL });

async function findAll(_req, res, next) {
  const result = await db.query("SELECT * FROM question_notes").catch(next);
  console.log("Result", result.rows);
  res.send(result.rows);
}

async function findOne(req, res, next) {
  const result = await db
    .query("SELECT * FROM question_notes WHERE id=$1", [req.params.id])
    .catch(next);
  console.log("Result", result.rows);
  res.send(result.rows[0]);
}

async function findAllForQuestion(req, res, next) {
  const result = await db
    .query("SELECT * FROM question_notes WHERE question_id = $1", [
      req.params.id,
    ])
    .catch(next);
  if (result.rows.length === 0) {
    res.sendStatus(404);
  } else {
    res.send(result.rows);
  }
}

async function create(req, res, next) {
  const { question_id, note } = req.body;
  const keys = "question_id, note";

  const result = await db
    .query(`INSERT INTO question_notes(${keys}) VALUES ($1)`, [
      question_id,
      note,
    ])
    .catch(next);
  res.send(result.rows[0]);
}

async function remove(req, res, next) {
  await db
    .query("DELETE FROM question_notes WHERE id = $1", [req.params.id])
    .catch(next);
  res.sendStatus(204);
}

async function update(req, res, next) {
  const request = { id: req.params.id };

  // Perform the update for each key value requested
  for (let key in req.params.body) {
    let queryText = `UPDATE question_notes SET ${key}=$1 WHERE id = $2`;
    await db
      .query(queryText, [req.params.body[key], req.params.id])
      .catch(next);
    request.key = req.params.body[key];
  }
  res.send(request);
}

export default { findAll, findOne, findAllForQuestion, create, remove, update };
