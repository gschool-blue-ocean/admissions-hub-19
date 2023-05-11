import pg from "pg";
const db = new pg.Pool({ connectionString: process.env.DATABASE_URL });

async function findAll(_req, res, next) {
  const result = await db.query("SELECT * FROM questions").catch(next);
  //console.log("Result", result.rows);
  res.send(result.rows);
}

async function findOne(req, res, next) {
  if (Number.isNaN(parseInt(req.params.id))) {
    res.sendStatus(400);
  } else {
    const result = await db
      .query("SELECT * FROM questions WHERE question_id=$1", [req.params.id])
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
  const { title, question, description } = req.body;
  const keys = "title, question, description";

  if (
    title === undefined ||
    question === undefined ||
    description === undefined
  ) {
    res.status(400).send("Recieved incorrect info");
  } else {
    const result = await db
      .query(`INSERT INTO questions(${keys}) VALUES ($1, $2, $3) RETURNING *`, [
        title,
        question,
        description,
      ])
      .catch(next);
    res.send(result.rows[0]);
  }
}

async function remove(req, res, next) {
  if (Number.isNaN(parseInt(req.params.id))) {
    res.sendStatus(400);
  } else {
    const result = await db
      .query("SELECT * FROM questions WHERE question_id=$1", [req.params.id])
      .catch(next);
    if (result.rows.length != 1) {
      res.sendStatus(404);
    } else {
      await db
        .query("DELETE FROM questions WHERE question_id = $1", [req.params.id])
        .catch(next);
      res.sendStatus(204);
    }
  }
}

async function update(req, res, next) {
  let haveKeys = true;
  const expectedKeys = ["title", "question", "description"];
  for (let key in req.body) {
    if (!expectedKeys.includes(key)) {
      haveKeys = false;
    }
  }
  if (!haveKeys) {
    res.status(400).send("Recieved incorrect info");
  } else if (Number.isNaN(parseInt(req.params.id))) {
    res.sendStatus(400);
  } else {
    const result = await db
      .query("SELECT * FROM questions WHERE question_id=$1", [req.params.id])
      .catch(next);
    if (result.rows.length != 1) {
      res.sendStatus(404);
    } else {
      // Perform the update for each key value requested
      const request = { id: req.params.id };
      for (let key in req.body) {
        let queryText = `UPDATE questions SET ${key}=$1 WHERE question_id = $2`;
        await db.query(queryText, [req.body[key], req.params.id]).catch(next);
        request[key] = req.body[key];
      }
      res.send(request);
    }
  }
}

export default { findAll, findOne, create, remove, update };
