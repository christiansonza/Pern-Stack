const express = require('express')
const app = express()

const helmet = require('helmet')
const morgan = require('morgan')
const cors = require('cors')

require('dotenv').config()
const pool = require('./config/conn')
const PORT = process.env.PORT || 4001


app.use(express.json())
app.use(helmet())
app.use(morgan('dev'))

app.use(cors({
    origin:'http://localhost:5173',
    methods:['GET','POST','PUT','DELETE'],
    credentials:true
}))
app.use('/users',require('./Routes/userRouter'))


pool.connect()
  .then(() => {
    console.log("Connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => {
    console.error("Connection failed:", err);
  });
