exports.validateCreateUser = async (req, res, next) => {
    const { name, password, email } = req.body;
    
    if (!name) {
        return res.status(400).send('Name is required');
    }

    if (!password) {
        return res.status(400).send('Password is required');
    }

    if (!email) {
        return res.status(400).send('Email is required');
    }

    return next();
};

exports.validateGetUser = async (req, res, next) => {
    const { password, email } = req.body;

    if (!password) {
        return res.status(400).send('Password is required');
    }

    if (!email) {
        return res.status(400).send('Email is required');
    }

    return next();
};