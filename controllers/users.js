const User = require('../models/user')

module.exports.renderRegister = (req, res) => {
    res.render('users/register')
}

module.exports.register = async(req, res) => {
    try {
        const { username, email, password } = req.body;
        const user = new User({ email, username });
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err => {
            if(err) return next(err);
            res.redirect('/campgrounds')
        })
    } catch (error) {
        res.redirect('/register')
    }
}

module.exports.renderLogin = (req, res)=> {
    res.render('users/login')
}

module.exports.login = (req, res) => {
    console.log('Logged in successfully');
    res.redirect('/campgrounds')
}

module.exports.logout = (req, res) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        console.log('User Logged Out Successfully')
        res.redirect('/campgrounds');
    });
}