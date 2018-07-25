let keystone = require('keystone');
let { requireAdmin, requireUser } = require('../auth');
let fs = require('fs');


// Upload image
// TODO: check doubles
exports.uploadImage = function(req, res) {
    requireUser(req, res, () => {
        let files = req.files;
        if (!files) return res.apiError('error', 'no files');
        let file = files.files;
        
        if (!file.mimetype.includes('image/')) return res.apiError('error', 'images only');

        fs.readFile(file.path, (err, data) => {
            if (err) {
                console.log(err);
                return res.apiError('error', 'something goes wrong');
            }

            let path = process.cwd() + '/data/uploads/'
            let fullPath = path + file.name;
            
            fs.writeFile(fullPath, data, function (err) {
                if (err) {
                    console.log(err);
                    return res.apiError('error', 'something goes wrong');
                }
                res.apiResponse({
                    fileName: file.name,
                    path: path,
                    fullPath: fullPath,
                });
            });
        });
    })
}