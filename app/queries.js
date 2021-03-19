const Pool = require('pg').Pool
const pool = new Pool({
	  user: 'testuser',
	  host: '34.71.11.3',
	  database: 'persons',
	  password: 'j@m;qOBaFw=X(iK3DG+ZsR7,',
	  port: 5432,
})


const getUsers = (request, response) => {
	pool.query('SELECT * FROM persons ORDER BY id ASC', (error, results) => {
	  if (error) {
		throw error
	  }
	  response.status(200).json(results.rows)
	})
  }

const getUserById = (request, response) => {
	const id = parseInt(request.params.id)
  
	pool.query('SELECT * FROM persons WHERE id = $1', [id], (error, results) => {
	  if (error) {
		throw error
	  }
	  response.status(200).json(results.rows)
	})
  }
  
const createUser = (request, response) => {
	const { name, age } = request.body
  
	pool.query('INSERT INTO persons (name, age) VALUES ($1, $2) RETURNING id', [name, age], (error, results) => {
		if (error) {
		throw error
		}
		response.status(201).send(`User added with ID: ${results.rows[0].id}\n`)
		})  
	}

const updateUser = (request, response) => {
	const id = parseInt(request.params.id)
	const { name, age } = request.body
  
	pool.query(
	  'UPDATE persons SET name = $1, age = $2 WHERE id = $3',
	  [name, age, id],
	  (error, results) => {
		if (error) {
		  throw error
		}
		response.status(200).send(`User modified with ID: ${id}\n`)
	  }
	)
  }

const deleteUser = (request, response) => {
	const id = parseInt(request.params.id)
  
	pool.query('DELETE FROM persons WHERE id = $1', [id], (error, results) => {
	  if (error) {
		throw error
	  }
	  response.status(200).send(`User deleted with ID: ${id}\n`)
	})
  }

  module.exports = {
	getUsers,
	getUserById,
	createUser,
	updateUser,
	deleteUser,
  }