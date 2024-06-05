let express = require('express');
let app = express();

app.use(express.json());

let students = [
    {id: 1, name: 'sergio', age: 20, enroll: true},
    {id: 2, name: 'camilo', age: 28, enroll: false},
    {id: 3, name: 'leydy', age: 18, enroll: false},
];

app.get('/', (req, res) =>{
    res.send('Node JS api');
});

app.get('/api/students', (req, res) =>{
    res.send(students);
});

app.get('/api/students/:id', (req, res) => {
    let student = students.find(c => c.id === parseInt(req.params.id));
    if(!student) return res.status(404).send('Estudiante no encontrado');
    else res.send(student);
})

app.post('/api/students', (req, res) => {
    let student = {
        id: students.length + 1,
        name: req.body.name,
        age: parseInt(req.body.age),
        enroll: (req.body.enroll ==='true')


    };

    students.push(student);
    res.send(student);
});

app.delete('/api/students/api', (req, res) => {
    let student = students.find(c => c.id === parseInt(req.params.id));
    if(!student) return res.status(404).send('Estudiante no encontrado')

    let index = students.indexOf(student);
    students.splice(index, 1);
    res.send(student);
});

let port = process.env.port || 80;
app.listen(port, () => console.log(`Escuchando en puerto ${port}...`));

