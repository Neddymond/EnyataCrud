const { sequelize, Sequelize } = require('../models/index');
const User = require('../models/user')(sequelize, Sequelize);
const bcrypt = require('bcrypt');

exports.CreateUser = async (req, res) => {
    try{
        const userDetails = req.body;
        userDetails.password = bcrypt.hashSync(userDetails.password, 10);

        const user = await User.create(userDetails);

        res.status(201).send(user);
    }catch (err) {
        res.status(400).send(err);
    }
}

exports.GetUser = async(req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ where: {email} });
        if(!user) {
            return res.status(404).send('User not found');
        }

        const isMatched = await bcrypt.compare(password, user.password);
        if(!isMatched) {
            return res.status(404).send('User not found');
        }

        res.status(200).send(user);
    } catch (err) {
        res.status(400).send(err);
    }
}

exports.UpdateUser = async (req, res) => {
    const userId = req.params.id;
    const reqBody = Object.keys(req.body);

    const allowedUpdates = ["name", "email", "password"];
    const isAllowedUpdates = reqBody.every((body) => allowedUpdates.includes(body));

    if(!isAllowedUpdates){
        return res.status(400).send({Error: "Invalid update"});
    }
    
    try{
        const user = await User.findByPk(userId);

        if (!user) {
            return res.status(404).send('User not found');
        }

        if(req.body.password){
            req.body.password = bcrypt.hashSync(req.body.password, 10);
        }

        user.set(req.body);
        await user.save();

        res.send(user);
    }catch (e) {
        res.status(400).send(e);
    }
}

exports.DeleteUser = async(req, res) => {
    try{
        const user = await User.findByPk(req.params.id);

        if (!user) {
            return res.status(404).send('User not found');
        }

        await user.destroy()
    
        res.status(200).send({message: 'User deleted successfully'});
    }catch (err) {
        res.status(400).send(err);
    }
}