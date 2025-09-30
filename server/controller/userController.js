const pool = require('../config/conn');

const getUser = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users ORDER BY id ASC');
    res.status(200).json({rows:result.rows});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const postUser = async (req, res) => {
  try {
    const { first_name, middle_name, last_name, contact, address } = req.body;

    if (!first_name || !middle_name || !last_name || !contact || !address) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const result = await pool.query(
      'INSERT INTO users(first_name, middle_name, last_name, contact, address) VALUES($1,$2,$3,$4,$5) RETURNING *',
      [first_name, middle_name, last_name, contact, address]
    );

    res.status(201).json({
      message: 'User created!',
      data: result.rows[0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { first_name, middle_name, last_name, contact, address } = req.body;

    const result = await pool.query(
      'UPDATE users SET first_name=$1, middle_name=$2, last_name=$3, contact=$4, address=$5 WHERE id=$6 RETURNING *',
      [first_name, middle_name, last_name, contact, address, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      message: 'User updated!',
      data: result.rows[0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const destroyUser = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      'DELETE FROM users WHERE id=$1 RETURNING *',
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      message: 'User deleted!',
      data: result.rows[0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getUserId = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('SELECT * FROM users WHERE id=$1', [id]);
        if (result.rows.length === 0) return res.status(404).json({ message: 'User not found' });
        res.json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}


module.exports = {
  getUser,
  postUser,
  updateUser,
  destroyUser,
  getUserId
};
