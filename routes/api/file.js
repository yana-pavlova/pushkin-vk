let keystone = require('keystone');
let { requireAdmin, requireUser } = require('../auth');
let fs = require('fs');

const E = require('./ERRORS');

// Upload image
// TODO: check doubles
exports.uploadImage = function(req, res) {
    requireUser(req, res, () => {
        let files = req.files;
        if (!files) return res.apiError('Не указаны файлы.', 'no files');
        let file = files.files;
        
        if (!file.mimetype.includes('image/')) return res.apiError('Только изображения.', 'images only');

        fs.readFile(file.path, (err, data) => {
            if (err) {
                console.log(err);
                return res.apiError(E.INNER_ERROR);
            }

            let path = keystone.get('uploadsPath');
            let fullPath = path + file.name;
            // console.log('???????????????', fullPath);
            
            fs.writeFile(fullPath, data, function (err) {
                if (err) {
                    console.log(err);
                    return res.apiError(E.INNER_ERROR);
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