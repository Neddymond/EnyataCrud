const express = require("express");
const router = new express.Router();
const User = require("../Models/User");

/** Creating user*/
router.post("/users", async (req, res) => {
    const user = new User(req.body);
    try{
        await user.save();
        const token = await user.GenerateAuthToken();

        res.status(201).send({user, token});
    }catch (e) {
        res.status(400).send(e);
    }
});

/** Get user */
router.get("/users", auth, async (req, res) => {
    res.send(req.user);
});

/** Update a user */
router.patch("/users", auth, async (req, res) => {
    const reqBody = Object.keys(req.body);

    const allowedUpdates = ["name", "email", "password"];
    const isAllowedUpdates = reqBody.every((body) => allowedUpdates.includes(body));

    if(!isAllowedUpdates){
        return res.status(400).send({Error: "Invalid update"});
    }
    
    try{
        const user = req.user;
        reqBody.forEach((body) => user[body] = req.body[body]);
        await user.save();
        res.send(user);
    }catch (e) {
        res.status(500).send(e);
    }
});

/** Delete a user */
router.delete("/users", auth, async(req, res) => {
    try{
        await req.user.remove();
        res.send(req.user);
    }catch (e) {
        res.status(500).send(e);
    }
});