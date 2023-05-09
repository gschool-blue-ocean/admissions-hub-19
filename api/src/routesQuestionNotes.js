import pg from "pg";
const db = new pg.Pool({ connectionString: process.env.DATABASE_URL });

async function findAll(req, res, next) {
  const result = await db.query("SELECT * FROM question_notes").catch(next);
  //console.log("Result", result.rows);
  res.send(result.rows);
}

async function findOne(req, res, next) {
  if (Number.isNaN(parseInt(req.params.id))) {
    res.sendStatus(400);
  } else {
    const result = await db
      .query("SELECT * FROM question_notes WHERE question_note_id=$1", [
        req.params.id,
      ])
      .catch(next);
    if (result.rows.length != 1) {
      res.sendStatus(404);
    } else {
      //console.log("Result", result.rows[0]);
      res.send(result.rows[0]);
    }
  }
}

async function findAllForQuestion(req, res, next) {
  if (Number.isNaN(parseInt(req.params.id))) {
    res.sendStatus(400);
  } else {
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
}

async function create(req, res, next) {
  const { question_id, note } = req.body;
  const keys = "question_id, note";

  const result = await db
    .query(`INSERT INTO question_notes(${keys}) VALUES ($1, $2) RETURNING *`, [
      question_id,
      note,
    ])
    .catch(next);
  res.send(result.rows[0]);
}

async function remove(req, res, next) {
  if (Number.isNaN(parseInt(req.params.id))) {
    res.sendStatus(400);
  } else {
    const result = await db
      .query("SELECT * FROM question_notes WHERE question_note_id=$1", [
        req.params.id,
      ])
      .catch(next);
    if (result.rows.length != 1) {
      res.sendStatus(404);
    } else {
      await db
        .query("DELETE FROM question_notes WHERE question_note_id = $1", [
          req.params.id,
        ])
        .catch(next);
      res.sendStatus(204);
    }
  }
}

async function update(req, res, next) {
  if (Number.isNaN(parseInt(req.params.id))) {
    res.sendStatus(400);
  } else {
    const result = await db
      .query("SELECT * FROM question_notes WHERE question_note_id=$1", [
        req.params.id,
      ])
      .catch(next);
    if (result.rows.length != 1) {
      res.sendStatus(404);
    } else {
      // Perform the update for each key value requested
      const request = { id: req.params.id };
      for (let key in req.body) {
        let queryText = `UPDATE question_notes SET ${key}=$1 WHERE question_note_id = $2`;
        await db.query(queryText, [req.body[key], req.params.id]).catch(next);
        request[key] = req.body[key];
      }
      res.send(request);
    }
  }
}

export default { findAll, findOne, findAllForQuestion, create, remove, update };
