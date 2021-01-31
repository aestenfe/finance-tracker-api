const { request, response } = require("express");
const { pool } = require("../../config")

const getAccounts = (request, response) => {
  pool.query('SELECT * FROM accounts',(error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const getAccount = (request, response) => {
  if (!request.header('apiKey') || request.header('apiKey') !== process.env.API_KEY) {
    return response.status(401).json({status: 'error', message: 'Unauthorized.'})
  }

  const id = parseInt(request.params.id);

  pool.query(
    'SELECT * FROM accounts WHERE id = $1',
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

const addAccount = (request, response) => {
  if (!request.header('apiKey') || request.header('apiKey') !== process.env.API_KEY) {
    return response.status(401).json({status: 'error', message: 'Unauthorized.'})
  }

  const { name } = request.body;

  pool.query(
    "INSERT INTO accounts (name) VALUES ($1)",
    [name],
    (error) => {
      if (error) {
        throw error;
      }
      response.status(201).json({ status: "success", message: "Account added."});
    }
  )
};

const updateAccount = (request, response) => {
  if (!request.header('apiKey') || request.header('apiKey') !== process.env.API_KEY) {
    return response.status(401).json({status: 'error', message: 'Unauthorized.'})
  }

  const id = parseInt(request.params.id);
  const { name } = request.body;

  pool.query(
    'UPDATE users SET name = $1 where id = $3',
    [name, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`User modified with ID: ${id}`);
    }
  );
};

const deleteAccount = (request, response) => {
  if (!request.header('apiKey') || request.header('apiKey') !== process.env.API_KEY) {
    return response.status(401).json({status: 'error', message: 'Unauthorized.'})
  }
  
  const id = parseInt(request.params.id);
  pool.query(
    "DELETE FROM accounts where id = $1",
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send("User deleted with ID: ${id}");
    }
  )
}

module.exports = {
  getAccounts,
  getAccount,
  addAccount,
  updateAccount,
  deleteAccount,
};
