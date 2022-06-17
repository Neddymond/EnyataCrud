const express = require("express");

const userRouter = require("./Routes/UserRouter");

const app = express();

app.use(express.json());
app.use('/user', userRouter);

const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});

module.exports = app;