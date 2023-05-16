import pg from "pg";
const db = new pg.Pool({ 
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'development' ? false : {rejectUnauthorized: false}
});

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
  if (
    user_id === undefined ||
    cohort_id === undefined ||
    numattempts === undefined ||
    paid === undefined ||
    paperwork1 === undefined ||
    paperwork2 === undefined ||
    paperwork3 === undefined ||
    isNaN(user_id) ||
    isNaN(cohort_id) ||
    isNaN(numattempts)
  ) {
    res.status(400).send("Recieved incorrect info");
  } else {
    const result = await db
      .query("SELECT * FROM students WHERE user_id=$1", [user_id])
      .catch(next);
    //console.log("STUDENTS RESULT ROWS", result.rows);
    if (result.rows.length != 0) {
      res.status(400).send("Student already exists for user");
    } else {
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
  }
}

async function remove(req, res, next) {
  if (Number.isNaN(parseInt(req.params.id))) {
    res.sendStatus(400);
  } else {
    const result = await db
      .query("SELECT * FROM students WHERE user_id = $1", [req.params.id])
      .catch(next);
    //console.log("DELETE RESULT", result.rows);
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
  let haveKeys = true;
  const expectedKeys = [
    "user_id",
    "cohort_id",
    "numattempts",
    "paid",
    "paperwork1",
    "paperwork2",
    "paperwork3",
  ];
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
      .query("SELECT * FROM students WHERE user_id=$1", [req.params.id])
      .catch(next);
    if (result.rows.length != 1) {
      res.sendStatus(404);
    } else {
      // Perform the update for each key value requested
      const request = { id: req.params.id };
      for (let key in req.body) {
        let queryText = `UPDATE students SET ${key}=$1 WHERE user_id = $2`;
        await db.query(queryText, [req.body[key], req.params.id]).catch(next);
        request[key] = req.body[key];
      }
      res.send(request);
    }
  }
}

export default { findAll, findOne, findAllInCohort, create, remove, update };
