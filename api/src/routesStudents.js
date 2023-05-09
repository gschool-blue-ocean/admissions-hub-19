import pg from "pg";
const db = new pg.Pool({ connectionString: process.env.DATABASE_URL });

async function findAll(_req, res, next) {
  const result = await db
    .query(
      "SELECT * FROM students INNER JOIN users ON students.user_id=users.user_id"
    )
    .catch(next);
  //console.log("Result", result.rows);
  res.send(result.rows);
}

async function findOne(req, res, next) {
  if (Number.isNaN(parseInt(req.params.id))) {
    res.sendStatus(400);
  } else {
    const result = await db
      .query(
        "SELECT * FROM students INNER JOIN users ON students.user_id=users.user_id WHERE students.user_id = $1",
        [req.params.id]
      )
      .catch(next);
    //console.log("Result", result.rows);
    if (result.rows.length != 1) {
      res.sendStatus(404);
    } else {
      res.send(result.rows[0]);
    }
  }
}

async function findAllInCohort(req, res, next) {
  if (Number.isNaN(parseInt(req.params.id))) {
    res.sendStatus(400);
  } else {
    const result = await db
      .query(
        "SELECT * FROM students INNER JOIN users ON students.user_id=users.user_id WHERE students.cohort_id = $1",
        [req.params.id]
      )
      .catch(next);
    if (result.rows.length === 0) {
      res.sendStatus(404);
    } else {
      res.send(result.rows);
    }
  }
}

async function create(req, res, next) {
  const {
    user_id,
    cohort_id,
    numattempts,
    paid,
    paperwork1,
    paperwork2,
    paperwork3,
  } = req.body;
  const keys =
    "user_id, cohort_id, numattempts, paid, paperwork1, paperwork2, paperwork3";

  const result = await db
    .query(
      `INSERT INTO students(${keys}) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [
        user_id,
        cohort_id,
        numattempts,
        paid,
        paperwork1,
        paperwork2,
        paperwork3,
      ]
    )
    .catch(next);
  res.send(result.rows[0]);
}

async function remove(req, res, next) {
  if (Number.isNaN(parseInt(req.params.id))) {
    res.sendStatus(400);
  } else {
    const result = await db
      .query("SELECT * FROM students WHERE user_id=$1", [req.params.id])
      .catch(next);
    if (result.rows.length != 1) {
      res.sendStatus(404);
    } else {
      await db
        .query("DELETE FROM students WHERE user_id = $1", [req.params.id])
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
      .query("SELECT * FROM students WHERE user_id=$1", [req.params.id])
      .catch(next);
    if (result.rows.length != 1) {
      res.sendStatus(404);
    } else {
      // Perform the update for each key value requested
      const request = { id: req.params.id };
      for (let key in req.params.body) {
        let queryText = `UPDATE students SET ${key}=$1 WHERE user_id = $2`;
        await db.query(queryText, [req.body[key], req.params.id]).catch(next);
        request.key = req.params.body[key];
      }
      res.send(request);
    }
  }
}

export default { findAll, findOne, findAllInCohort, create, remove, update };
