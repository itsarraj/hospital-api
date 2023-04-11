const Doctor = require('./models/Doctor.js');

module.exports.createProfile = function (req, res) {
    if (req.body.password != req.body.confirmpassword) {
        notie.alert({
            type: 'warning',
            text: "Passwords Don't Match",
        });
        return res.redirect('back');
    }
};
