let keystone = require('keystone');
let { API_KEY } = require('../auth');

// TODO kill me
module.exports = function(req, res) {
    let user = req.user;
    let response = {
        registered: false,
        apiKey: API_KEY,
    }

    if (user) {
        response.user = {
            authorName: user.authorName,
            authorPatronymic: user.authorPatronymic,
            name: user.name,
            _id: user.id,
        }
        response.registered = true;
    }
    
    res.apiResponse(response);
}