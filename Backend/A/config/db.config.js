const env = require('./env.js');

const Sequelize = require('sequelize');
const sequelize = new Sequelize(env.database, env.username, env.password, {
    host: env.host,
    dialect: env.dialect,
    operatorsAliases: false,

    pool: {
        max: env.max,
        min: env.pool.min,
        acquire: env.pool.acquire,
        idle: env.pool.idle
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require('../model/user.model.js')(sequelize, Sequelize);
db.role = require('../model/role.model.js')(sequelize, Sequelize);
db.box = require('../model/box.model.js')(sequelize, Sequelize);
db.site = require('../model/site.model.js')(sequelize, Sequelize);
db.line = require('../model/lines.model.js')(sequelize, Sequelize);
db.machine = require('../model/machine.model.js')(sequelize, Sequelize);
db.article= require('../model/article.model.js')(sequelize, Sequelize);
db.bundle = require('../model/bundle.model.js')(sequelize, Sequelize);
db.carte_pending_operation = require('../model/carte_pending_operation.model.js')(sequelize, Sequelize);
db.carte_pending_session = require('../model/carte_pending_session.model.js')(sequelize, Sequelize);

db.job = require('../model/job.model.js')(sequelize, Sequelize);
db.machine_type = require('../model/machine_type.model.js')(sequelize, Sequelize);
db.employes = require('../model/employes.model.js')(sequelize, Sequelize);
db.operation = require('../model/operation.model.js')(sequelize, Sequelize);
db.operation_template = require('../model/operation_template.model.js')(sequelize, Sequelize);
db.ordre = require('../model/ordre.model.js')(sequelize, Sequelize);
db.user_session = require('../model/user_session.model.js')(sequelize, Sequelize);
db.permissions = require('../model/permissions.model')(sequelize,Sequelize);
db.has_permissions = require('../model/has_permissions')(sequelize,Sequelize);
db.profiles = require('../model/profiles.model')(sequelize,Sequelize);
db.sequence = require('../model/sequence.model')(sequelize,Sequelize);
db.artopt = require('../model/art-opt.model')(sequelize,Sequelize);
db.line_op = require('../model/line-op')(sequelize,Sequelize);
db.bundle_line = require('../model/bundle-line')(sequelize,Sequelize);
db.cutomer = require('../model/customer.model')(sequelize,Sequelize);
db.artline = require('../model/art-line.model')(sequelize,Sequelize);
db.profil_permis = require('../model/profil_permis.model')(sequelize,Sequelize);



db.role.belongsToMany(db.user, { through: 'user_roles', foreignKey: 'id', otherKey: 'userId'});
db.user.belongsToMany(db.role, { through: 'user_roles', foreignKey: 'userId', otherKey: 'id'});

// profiles -- permission (many to many)
db.profiles.belongsToMany(db.permissions,{through: 'profil_permis', foreignKey:'profile_id', otherKey:'permission_id'});
db.permissions.belongsToMany(db.profiles,{through: 'profil_permis', foreignKey:'permission_id', otherKey:'profile_id'});
// line has many machine
db.line.hasMany(db.machine,{foreignKey:'line_id'});
db.machine.belongsTo(db.line,{foreignKey:'line_id'});

//machine has one machine type
db.machine_type.hasOne(db.machine,{foreignKey:'mach_type_id'});
db.machine.belongsTo(db.machine_type, {foreignKey:'mach_type_id'});

//machine -- operation template(many to many)
db.machine.belongsToMany(db.operation_template, { through: 'machine_op', foreignKey: 'mach_id', otherKey: 'operation_template_id'});
db.operation_template.belongsToMany(db.machine, { through: 'machine_op', foreignKey: 'operation_template_id', otherKey: 'mach_id'});


//site has many line
db.site.hasMany(db.line,{foreignKey:'site_id'});
db.line.belongsTo(db.site,{foreignKey:'site_id'});

// job has many employe
db.job.hasMany(db.employes,{foreignKey:'job_id'});
db.employes.belongsTo(db.job,{foreignKey:'job_id'})

// line has many box
db.line.hasMany(db.box,{foreignKey:'line_id'});
db.box.belongsTo(db.line,{foreignKey:'line_id'});

// machine has one box
db.box.belongsTo(db.machine, {foreignKey:'mach_id'});
db.machine.hasOne(db.box,{foreignKey:'mach_id'});

// employe has one user-session
db.employes.hasOne(db.user_session,{foreignKey:'emp_id'});
db.user_session.belongsTo(db.employes,{foreignKey:'emp_id'});

// user-session has one box
db.user_session.belongsTo(db.box,{foreignKey:'box_id'});
db.box.hasOne(db.user_session,{foreignKey:'box_id'});


//user-session has one c.p.s
db.carte_pending_session.belongsTo(db.user_session,{foreignKey:'usersession_id'});
db.user_session.hasOne(db.carte_pending_session,{foreignKey:'usersession_id'});

//

//ordre has Many bundle
db.ordre.hasMany(db.bundle, {foreignKey:'ord_id'});
db.bundle.belongsTo(db.ordre, {foreignKey:'ord_id'});

//bundle has many operation
db.bundle.hasMany(db.operation,{foreignKey:'bundle_id'});
db.operation.belongsTo(db.bundle,{foreignKey:'bundle_id'});

//bundle has many line
db.bundle.belongsToMany(db.line, {through:'bundle-lines', foreignKey:'bundle_id', otherKey:'line_id'});
db.line.belongsToMany(db.bundle, {through:'bundle-lines', foreignKey:'line_id', otherKey:'bundle_id'});

// operation has many sequences
db.operation_template.hasMany(db.sequence, {foreignKey:'operation_template_id'});
db.sequence.belongsTo(db.operation_template, {foreignKey:'operation_template_id'});

//  article -- operation_temp (many to many)
db.article.belongsToMany(db.operation_template,{through:'art-opts', foreignKey:'article_id', otherKey:'operation_template_id'});
db.operation_template.belongsToMany(db.article, {through:'art-opts', foreignKey:'operation_template_id', otherKey:'article_id'});

// operation -- line (many to many)
db.operation.belongsToMany(db.line,{through:'line-ops', foreignKey:'operation_id', otherKey:'line_id'});
db.line.belongsToMany(db.operation,{through:'line-ops', foreignKey:'line_id', otherKey:'operation_id'});


// line -- article (many to many)
db.line.belongsToMany(db.article,{through:'art-line', foreignKey:'line_id', otherKey:'article_id'});
db.article.belongsToMany(db.line,{through:'art-line', foreignKey:'article_id', otherKey:'line_id'});

// article has many ordre
db.article.hasMany(db.ordre,{foreignKey:'article_id'});
db.ordre.belongsTo(db.article,{foreignKey:'article_id'});

// customer has many site
db.cutomer.hasMany(db.site,{foreignKey:'client_id'});
db.site.belongsTo(db.cutomer,{foreignKey:'client_id'});

//customer has many order
db.cutomer.hasMany(db.ordre,{foreignKey:'client_id'});
db.ordre.belongsTo(db.cutomer,{foreignKey:'client_id'});




module.exports = db;
