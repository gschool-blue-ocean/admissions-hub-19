import pg from "pg";
const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl:
    process.env.NODE_ENV === "development"
      ? false
      : { rejectUnauthorized: false },
});

async function findAll(_req, res, next) {
  const result = await db.query("SELECT * FROM attempts").catch(next);
  //console.log("Result", result.rows);
  res.send(result.rows);
}

async function findOne(req, res, next) {
  if (Number.isNaN(parseInt(req.params.id))) {
    res.sendStatus(400);
  } else {
    const result = await db
      .query("SELECT * FROM attempts WHERE attempt_id=$1", [req.params.id])
      .catch(next);
    if (result.rows.length != 1) {
      res.sendStatus(404);
    } else {
      //console.log("Result", result.rows[0]);
      res.send(result.rows[0]);
    }
  }
}

async function findAllForStudent(req, res, next) {
  if (Number.isNaN(parseInt(req.params.id))) {
    res.sendStatus(400);
  } else {
    const result = await db
      .query("SELECT * FROM attempts WHERE student_id = $1", [req.params.id])
      .catch(next);
    if (result.rows.length === 0) {
      res.sendStatus(404);
    } else {
      res.send(result.rows);
    }
  }
}

async function findAllForStaff(req, res, next) {
  if (Number.isNaN(parseInt(req.params.id))) {
    res.sendStatus(400);
  } else {
    const result = await db
      .query("SELECT * FROM attempts WHERE staff_id = $1", [req.params.id])
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
    date,
    student_id,
    staff_id,
    question1_id,
    rating1,
    question2_id,
    rating2,
    question3_id,
    rating3,
    notes,
    rating_score,
  } = req.body;
  const keys =
    "date, student_id, staff_id, question1_id, rating1, question2_id, rating2, question3_id, rating3, notes, rating_score";

  if (
    date === undefined ||
    student_id === undefined ||
    staff_id === undefined ||
    question1_id === undefined ||
    rating1 === undefined ||
    question2_id === undefined ||
    rating2 === undefined ||
    question3_id === undefined ||
    rating3 === undefined ||
    notes === undefined ||
    rating_score === undefined ||
    isNaN(student_id) ||
    isNaN(staff_id) ||
    isNaN(question1_id) ||
    isNaN(question2_id) ||
    isNaN(question3_id) ||
    isNaN(rating1) ||
    isNaN(rating2) ||
    isNaN(rating3) ||
    isNaN(rating_score)
  ) {
    res.status(400).send("Recieved incorrect info");
  } else {
    const result = await db
      .query(
        `INSERT INTO attempts(${keys}) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *`,
        [
          date,
          student_id,
          staff_id,
          question1_id,
          rating1,
          question2_id,
          rating2,
          question3_id,
          rating3,
          notes,
          rating_score,
        ]
      )
      .catch(err => {
        if(err) {
          res.send(err)
        }
      });
    res.send(result.rows[0]);
  }
}

async function remove(req, res, next) {
  if (Number.isNaN(parseInt(req.params.id))) {
    res.sendStatus(400);
  } else {
    const result = await db
      .query("SELECT * FROM attempts WHERE attempt_id=$1", [req.params.id])
      .catch(next);
    if (result.rows.length != 1) {
      res.sendStatus(404);
    } else {
      await db
        .query("DELETE FROM attempts WHERE attempt_id = $1", [req.params.id])
        .catch(next);
      res.sendStatus(204);
    }
  }
}

async function update(req, res, next) {
  let haveKeys = true;
  const expectedKeys = [
    "date",
    "student_id",
    "staff_id",
    "question1_id",
    "rating1",
    "question2_id",
    "rating2",
    "question3_id",
    "rating3",
    "notes",
    "rating_score",
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
      .query("SELECT * FROM attempts WHERE attempt_id=$1", [req.params.id])
      .catch(next);
    if (result.rows.length != 1) {
      res.sendStatus(404);
    } else {
      // Perform the update for each key value requested
      const request = { id: req.params.id };
      for (let key in req.body) {
        let queryText = `UPDATE attempts SET ${key}=$1 WHERE attempt_id = $2`;
        await db.query(queryText, [req.body[key], req.params.id]).catch(next);
        request[key] = req.body[key];
      }
      res.send(request);
    }
  }
}

export default {
  findAll,
  findOne,
  findAllForStudent,
  findAllForStaff,
  create,
  remove,
  update,
};
