import pg from "pg";
const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl:
    process.env.NODE_ENV === "development"
      ? false
      : { rejectUnauthorized: false },
});

async function findAll(_req, res, next) {
  const result = await db.query("SELECT * FROM students").catch(next);
  res.send(result.rows);
}

async function findOne(req, res, next) {
  if (Number.isNaN(parseInt(req.params.id))) {
    res.sendStatus(400);
  } else {
    const result = await db
      .query("SELECT * FROM students WHERE student_id = $1", [req.params.id])
      .catch(next);
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
        "SELECT * FROM students INNER JOIN cohorts ON students.cohort_id=cohorts.cohort_id WHERE students.cohort_id = $1",
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
  const { first_name, last_name, email, start_date, status } = req.body;
  const keys = "first_name, last_name, email, start_date, status";
  if (
    first_name === undefined ||
    last_name === undefined ||
    email === undefined
  ) {
    res.status(400).send("Recieved incorrect info");
  } else {
    const result = await db
      .query("SELECT * FROM students WHERE email=$1", [email])
      .catch(next);
    if (result.rows.length != 0) {
      res.status(400).send("Student email already exists");
    } else {
      const result = await db
        .query(
          `INSERT INTO students(${keys}) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
          [first_name, last_name, email, start_date, status]
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
      .query("SELECT * FROM students WHERE student_id = $1", [req.params.id])
      .catch(next);
    if (result.rows.length != 1) {
      res.sendStatus(404);
    } else {
      await db
        .query("DELETE FROM students WHERE student_id = $1", [req.params.id])
        .catch(next);
      res.json({ message: "Student deleted" });
    }
  }
}

function update(req, res, next) {
  try {
    db.query(`UPDATE students SET
    first_name=coalesce($1, first_name),
    last_name=coalesce($2, last_name),
    email=coalesce($3, email),
    start_date=coalesce($4, start_date),
    status=coalesce($5, status),
    score=coalesce($6, score)
    WHERE student_id=$7
    `, [req.body.first_name, req.body.last_name, req.body.email, req.body.start_date, req.body.status, req.body.score, req.params.id])
    res.status(200).send("Updated!")
  } catch (err) {
    console.error(err)
    res.status(400).send("bad request")
  }
}



export default { findAll, findOne, findAllInCohort, create, remove, update };
