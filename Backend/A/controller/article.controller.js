const db = require('../config/db.config.js');
const config = require('../config/config.js');
const Article = db.article;

// creat article
exports.create = (req, res) => {
    // Save to database
    Article.create({
        code: req.body.code,
        description: req.body.description,
        article_name: req.body.article_name
    }).then(article => {
        if(req.body.operation_templatess){
            article.setOperation_templates(req.body.operation_templatess);
        }
        res.send({article:article});
    }).catch(function (err) {
        console.log("create failed with error: " + err);
        return 0;

    });
};

// findall article
exports.findAll = (req, res) => {
    Article.findAll().then(article => {

        res.send({article:article});
    }).catch(function (err) {
        console.log("find failed with error: " + err);
        return 0;

        });
};

// find article by ID
exports.findById = (req, res) => {
    article.findById(req.params.article_id).then(artc => {
        res.send(artc);
    })
};

// update article
exports.update= (req,res) =>{
    const id = req.params.article_id;
    article.update({
            code: req.body.code,
            description: req.body.description,
            article_name: req.body.article_name
        },
        { where: {article_id: id} }
    ).then((article) => {
        if(req.body.operation_templatess){
            article.setOperation_templates(req.body.operation_templatess);
        }
        res.send({article:article});
    });
}

// delete article with ID
exports.delete = (req, res) => {
    const id = req.params.article_id;
    Article.destroy({
        where: {article_id: id  }
    }).then(() => {
        res.send('ok');
    }).catch(function (err) {
        console.log("delete failed with error: " + err);
        return 0;
        // handle error;
    });
};
