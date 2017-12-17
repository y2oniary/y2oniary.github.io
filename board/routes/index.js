const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const obj = {
  connectionLimit: 100,
  host: 'localhost',
  user: 'root',
  password: 'H@pp2n!ng!',
  database: 'test'
};

const pool = mysql.createPool(obj);

// Index
router.get('/', (req, res, next) => {

  pool.getConnection((err, conn) => {

    if (err) {
      return next(err);
    };

    const sql = `SELECT number,
                         name,
                         title,
                         DATE_FORMAT(date, '%Y-%c-%d %T') as date,
                         hits
                         FROM exampleboard ORDER BY number DESC`;
    const arr = [];

    conn.query(sql, arr, (err, results) => {
      if (err) {
        return next(err);
      };

      const obj = {
        "title": 'Fast Campus Board',
        "results": results
      }
      res.render('index', obj);
      conn.release();
    });
  });
});


// New
router.get('/new', (req, res, next) => {
  const obj = {
    title: '새 글 쓰기'
  }

  res.render('new', obj);
});


// Create
router.post('/create', (req, res, next) => {
  // 입력받은 값을 변수에 저장한다.
  const name = req.body.name;
  const password = req.body.password;
  const title = req.body.title;
  const content = req.body.content;



  // 커넥션 풀에서 연결 객체를 얻어오고 입력받은 정보를 exampleboard 테이블에 저장한다.
  pool.getConnection((err, conn) => {
    if (err) {
      return next(err);
    };

    const sql = `INSERT INTO exampleboard (name, password, title, content) values (?, ?, ?, ?)`;
    const arr = [name, password, title, content];

    conn.query(sql, arr, (err, result) => {
      if (err) {
        return next(err);
      };

      console.log('저장 완료');
      conn.release();
      res.redirect("/");
    });
  });
});


// Show
router.get('/show/:number', (req, res, next) => {
  const number = req.params.number;

  pool.getConnection((err, conn) => {
    if (err) {
      return next(err);
    };

    const sql = 'UPDATE exampleboard SET hits = hits + 1 WHERE number = ?';
    const arr = [number];

    conn.query(sql, arr, (err, result) => {
      if (err) {
        return next(err);
      };
      console.log(result);

      const sql = `SELECT number,
                          name,
                          title,
                          content,
                          date
                          FROM exampleboard WHERE number = ? `;

      conn.query(sql, arr, (err, results) => {
        const obj = {
          results: results[0]
        };

        res.render('show', obj);
        conn.release();
      });
    });
  });
});


// Edit
router.get('/edit/:number', (req, res, next) => {
  const number = req.params.number;

  pool.getConnection((err, conn) => {
    if (err) {
      return next(err);
    };

    const sql = 'SELECT number, name, title, content FROM exampleboard WHERE number = ?';
    const arr = [number];

    conn.query(sql, arr, (err, results) => {
      const obj = {
        title: '글 수정하기',
        results: results
      };
      res.render('edit', obj);
      conn.release();

    });
  });
});


// Update
router.post('/update/:number', (req, res, next) => {
  const number = req.params.number;
  const name = req.body.name;
  const password = req.body.password;
  const title = req.body.title;
  const content = req.body.content;

  pool.getConnection((err, conn) => {
    if (err) {
      return next(err);
    };

    const sql = 'UPDATE exampleboard SET name = ?, title = ?, content = ? WHERE number = ? and password = ?';
    const arr = [name, title, content, number, password];

    conn.query(sql, arr, (err, result) => {
      if (err) {
        return next(err);
      };

      if (result.affectedRows == 1) {
        res.redirect(`/show/${number}`);
      } else {
        res.send(`<script>alert('비밀번호가 맞지 않습니다.'); history.back();</script>`);
        
      }

      conn.release();
    });
  });
});


// Delete
router.post('/delete/:number', (req, res, next) => {
  
})
module.exports = router;