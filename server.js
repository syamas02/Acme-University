const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const path = require('path');

const { syncAndSeed, models } = require('./db');
const { School, Student } = models;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

syncAndSeed();

app.use(express.json());
app.use('/dist', express.static(path.join(__dirname, '/dist')));
app.use('/public', express.static(path.join(__dirname, '/public')));
app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/api/schools', (req, res, next) => {
  School.findAll()
    .then(schools => res.send(schools))
    .catch(next);
});

app.get('/api/students', (req, res, next) => {
  Student.findAll()
    .then(students => res.send(students))
    .catch(next);
});

app.get('/api/schools/:id', (req, res, next) =>
  School.findById(req.params.id)
    .then(school => res.send(school))
    .catch(next)
);

app.get('/api/students/:id', (req, res, next) =>
  Student.findById(req.params.id)
    .then(student => res.send(student))
    .catch(next)
);

app.post('/api/students', (req, res, next) => {
  Student.create(req.body)
    .then(student => res.send(student))
    .catch(next);
});

app.post('/api/schools', (req, res, next) => {
  School.create(req.body)
    .then(school => res.send(school))
    .catch(next);
});

app.put('/api/schools/:id', (req, res, next) => {
  School.findById(req.params.id)
    .then(school => school.update(req.body))
    .then(school => res.send(school))
    .catch(next);
});

app.put('/api/students/:id', (req, res, next) => {
  Student.findById(req.params.id)
    .then(student => student.update(req.body))
    .then(student => res.send(student))
    .catch(next);
});

app.delete('/api/students/:id', (req, res, next) => {
  Student.findById(req.params.id)
    .then(student => student.destroy())
    .then(() => res.sendStatus(204))
    .catch(next);
});

app.delete('/api/schools/:id', (req, res, next) => {
  School.findById(req.params.id)
    .then(school => school.destroy())
    .then(() => res.sendStatus(204))
    .catch(next);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).send({ error: err.message });
});
