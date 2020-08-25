const verifySignUp = require('./verifySignUp');
const authJwt = require('./verifyJwtToken');
module.exports = function (app) {

    const controller = require('../controller/controller.js');
    const article_controller = require('../controller/article.controller');
    const box_controller = require('../controller/box.controller');
    const employe_controller = require('../controller/employes.controller');
    const opereration_controller = require('../controller/operation.controller');
    const ordre_controller = require('../controller/ordre.controller');
    const sequence_controller = require('../controller/sequence.controller');
    const operation_template_controller = require('../controller/operation _template.controller');
    const bundle_controller = require('../controller/bundle.controller');
    const line_controller = require('../controller/line.controller');
    const customer_controller = require('../controller/customer.controller');
    const user_session_controller = require('../controller/user_session.controller');
    const machine_controller = require('../controller/machine.controller');
    const machine_type_controller = require('../controller/machine_type.controller');
    const site_controller = require('../controller/site.controller');
    const profile_controller =require('../controller/profiles.controller');
    const permission_controller = require('../controller/permission.controller');
    const multer = require('multer');
    const MIME_TYPE_MAP = {
        'image/png': 'png',
        'image/jpeg': 'jpeg',
        'image/jpg': 'jpg',
    };

    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            const isValid = MIME_TYPE_MAP[file.mimetype];
            let err = new Error('invalide mime type');
            if (isValid) {
                err = null;
            }
            cb(err, 'A/images');
        },
        filename: (req, file, cb) => {
            const name = file.originalname.toLowerCase().split(' ').join('-');
            const ext = MIME_TYPE_MAP[file.mimetype];
            cb(null, name + '-' + Date.now() + '.' + ext);
        }
    });

    app.use((req, res, next) => {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader(
            "Access-Control-Allow-Headers",
            "Origin, X-Requested-With, Content-Type, Accept, x-access-token"
        );
        res.setHeader(
            "Access-Control-Allow-Methods",
            "GET, POST, PATCH, PUT, DELETE, OPTIONS"
        );
        next();
    });

    app.post('/api/auth/signup', [verifySignUp.checkDuplicateUserNameOrEmail, verifySignUp.checkRolesExisted], controller.signup);

    app.post('/api/auth/signin', controller.signin);

    app.get('/api/test/user', [authJwt.verifyToken], controller.userContent);

    app.get('/api/test/admin', [authJwt.verifyToken, authJwt.isAdmin], controller.adminBoard);

    app.get('/api/test/findall', controller.findAll);

    app.get('/api/test/findOne', controller.findOne);

    app.post('/api/test/create', controller.create);

    app.delete('/api/test/delete', controller.delete);

    // gestion article
    app.post('/api/test/creat_article', article_controller.create);
    app.get('/api/test/findall_article', article_controller.findAll);
    app.delete('/api/test/delete/article/:article_id', article_controller.delete);

    // gestion box
    app.post('/api/test/creat_box', box_controller.create);
    app.get('/api/test/findall_box', box_controller.findAll);
    app.put('/api/test/update_box/:box_id',box_controller.update);
    app.delete('/api/test/delete_box/:boxid', box_controller.delete);

    // gestion profile
    app.post('/api/test/creat_profile',profile_controller.create);
    app.get('/api/test/findall_profile', profile_controller.findAll);
    // permision
    app.get('/api/test/findall_permis',permission_controller.findAll);

    // gestion employe-Operateurs
    app.post('/api/test/creat_Operateurs', multer({storage: storage}).single('image'), employe_controller.createOp);
    app.get('/api/test/findall_Operateurs', employe_controller.findAllOp);
    app.delete('/api/test/delete/employe/:emp_id', employe_controller.delete);

    // gestion employe-Supervisors
    app.post('/api/test/creat_Supervisors', multer({storage: storage}).single('image'), employe_controller.createSup);
    app.get('/api/test/findall_Supervisors', employe_controller.findAllSup);
    app.delete('/api/test/delete/employe/:emp_id', employe_controller.delete);

    // gestion employe-Mechanics
    app.post('/api/test/creat_Mechanics', multer({storage: storage}).single('image'), employe_controller.createMech);
    app.get('/api/test/findall_Mechanics', employe_controller.findAllMech);
    app.delete('/api/test/delete/employe/:emp_id', employe_controller.delete);

    // gestion employe-Electronics
    app.post('/api/test/creat_Electronics', multer({storage: storage}).single('image'), employe_controller.creatElec);
    app.get('/api/test/findall_Electronics', employe_controller.findAllElc);
    app.delete('/api/test/delete/employe/:emp_id', employe_controller.delete);

    //gestion operation
    app.post('/api/test/creat_operation', opereration_controller.creat);
    app.get('/api/test/findall_operation', opereration_controller.findAll);

    //gestion machine
    app.post('/api/test/creat_machine', machine_controller.create);
    app.get('/api/test/findall_mach', machine_controller.findAll);
    app.put('/api/test/update_mach/:mach_id', machine_controller.update);
    app.delete('/api/test/delete_mach/:mach_id', machine_controller.delete);


    // gestion ordre
    app.post('/api/test/creat_ordre', ordre_controller.create);
    app.get('/api/test/findall_ordre', ordre_controller.findAll);
    app.get('/api/test/find_ordre/:ordre_id', ordre_controller.findById);
    app.put('/api/test/update/:ordre_id', ordre_controller.update);
    app.delete('/api/test/delete/:ordre_id', ordre_controller.delete);

    // gestion bundle
    app.post('/api/test/creat_bundle/:ord_id', bundle_controller.create);
    app.get('/api/test/findall_bundle/:ord_id', bundle_controller.findAll);


    //gestion sequence
    app.post('/api/test/creat-sequence/:operation_template_id', sequence_controller.creat);
    app.get('/api/test/findall_sequence/:operation_template_id', sequence_controller.findAll);

    //gestion operation_template
    app.post('/api/test/creat_operation_t', operation_template_controller.creat);
    app.get('/api/test/findall_operation_t', operation_template_controller.findAll);
    app.get('/api/test/find_operation/:operation_template_id', operation_template_controller.findById);
    app.put('/api/test/update/operation/:operation_template_id', operation_template_controller.update);
    app.delete('/api/test/delete/operation/:operation_template_id', operation_template_controller.delete);

    // gestion line
    app.post('/api/test/creat_line', line_controller.create);
    app.get('/api/test/find_all_line', line_controller.findAll);
    app.put('/api/test/update_line/:line_id', line_controller.update);
    app.delete('/api/test/delete_line/:line_id', line_controller.delete);

    //gestion customers
    app.post('/api/test/creat_customer', customer_controller.create);
    app.get('/api/test/find_all_customer', customer_controller.findAll);
    app.put('/api/test/update_customer/:client_id', customer_controller.update);
    app.delete('/api/test/delete_customer/:client_id', customer_controller.delete);

    // gestion user_session
    app.get('/api/test/creat_user_session', user_session_controller.authAction);

    //gestion machine type
    app.post('/api/test/creat_machtyp',machine_type_controller.create);
    app.get('/api/test/findall_machtyp', machine_type_controller.findAll);
    app.put('/api/test/update_machtyp/:mach_type_id', machine_type_controller.update);
    app.delete('/api/test/delete_machtyp/:mach_type_id', machine_type_controller.delete);

    //gestion site
    app.post('/api/test/creat_site',site_controller.create);
    app.get('/api/test/findall_site', site_controller.findAll);
    app.put('/api/test/update_site/:site_id', site_controller.update);
    app.delete('/api/test/delete_site/:site_id', site_controller.delete);


}
