const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

//Parameterized queries. Used to prevent SQL injection:
const queryString = `
  SELECT students.id as student_id, students.name as name, cohorts.name as cohort
  FROM students
  JOIN cohorts ON cohorts.id = cohort_id
  WHERE cohorts.name LIKE $1
  LIMIT $2;
  `;
//$1 and $2 are the new placeholders from terminal line

const cohortName = process.argv[2];
const limit = process.argv[3] || 5;
//store all potentially malicious values in an array
const values = [`%${cohortName}%`, limit];

//function that accepts SQL query as a JS string
//returns a promise that contains our result when query is successful
pool.query(queryString, values)
//^^ OR 5 in case argument for max is not provided in terminal
//result is an array of JS objects
  .then(res => {
    res.rows.forEach(user => {
      console.log(`${user.name} has an id of ${user.student_id} and was in the ${user.cohort} cohort`);
    // console.log(res.rows);
    });
  })
  .catch(err => console.error('query error', err.stack));