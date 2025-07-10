const express = require('express');
const app = express();
const path = require('path');
const server = require('./server')
const userRouter = require('./routes/user')

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', userRouter)

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
