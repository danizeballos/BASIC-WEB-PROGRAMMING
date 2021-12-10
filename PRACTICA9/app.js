const express = require('express')
const mysql = require('mysql')

const app = express()

app.use(express.json())
app.set('view engine', 'ejs')

var pool 

const createPool = () => 
{
    pool = mysql.createPool
    ({
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: 'Univalle',
        database: 'tareapractica8'
    })
}

app.get('/professorform', (req, res) => 
{
    res.render('professorform')
})

app.get('/professors', (req, res) => 
{
    pool.getConnection((err, connection) => {

        connection.query('SELECT id, first_name AS firstName, last_name AS lastName, ' +
            'birth_date AS birthDate, city, salary FROM professor', (error, rows) => 
            {

            if (error) 
            {
                console.log(error)
                res.writeHead(500, {'Content-Type': 'application/json'})
                res.end(JSON.stringify({result: 'error'}))
                connection.release()
                return
            }

            res.writeHead(200, {'Content-Type': 'application/json'})
            res.end(JSON.stringify(rows))
            connection.release()
        })
    })
})

app.post('/professors', (req, res) => 
{
    let professor = req.body

    pool.getConnection((err, connection) => 
    {
        connection.query('INSERT INTO professor(first_name, last_name, birth_date, city, salary) ' +
                     'VALUES (?, ?, ?, ?, ?)',
                     [professor.firstName, professor.lastName, professor.birthDate, professor.city, professor.salary],
                     (error, rows) => {
        
            if (error) 
            {
                console.log(error)
                res.writeHead(500, {'Content-Type': 'application/json'})
                res.end(JSON.stringify({result: 'error'}))
                connection.release()
                return
            }

            res.writeHead(200, {'Content-Type': 'application/json'})
            res.end(JSON.stringify(rows))
            connection.release()
        })
    })
})

app.put('/professors', (req, res) => 
{
    let professor = req.body

    pool.getConnection((err, connection) => 
    {
        connection.query('UPDATE professor SET first_name = ?, last_name = ?, birth_date = ?, city = ?, salary = ? ' +
                     'WHERE id = ?',
                     [professor.firstName, professor.lastName, professor.birthDate, professor.city, professor.salary, professor.id],
                     (error, rows) => {
        
            if (error) 
            {
                console.log(error)
                res.writeHead(500, {'Content-Type': 'application/json'})
                res.end(JSON.stringify({result: 'error'}))
                connection.release()
                return
            }

            res.writeHead(200, {'Content-Type': 'application/json'})
            res.end(JSON.stringify(rows))
            connection.release()
        })
    })
})

app.delete('/professors/:id', (req, res) => 
{
    let id = req.params.id

    pool.getConnection((err, connection) => 
    {
        connection.query('DELETE FROM professor WHERE id = ?', [id], (error, rows) => {
            if (error) 
            {
                console.log(error)
                res.writeHead(500, {'Content-Type': 'application/json'})
                res.end(JSON.stringify({result: 'error'}))
                connection.release()
                return
            }
    
            res.writeHead(200, {'Content-Type': 'application/json'})
            res.end(JSON.stringify(rows))
            connection.release()
        })
    })
})

app.listen(3000, () => 
{
    createPool()
    console.log('Server initialized')
})