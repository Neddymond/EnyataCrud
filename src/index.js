const express = require("express");
require("./db/mongoose");

const userRouter = require("./Routers/UserRouter");
const taskRouter = require("./Routers/TaskRouter");

const app = express();

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});

module.exports = app;