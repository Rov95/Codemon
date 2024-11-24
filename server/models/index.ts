import fs from 'fs';
import path from 'path';
import { Sequelize } from 'sequelize';
import User from './User';

const basename = path.basename(__filename);
const config = require(__dirname + '/../config/config.json').development;

const sequelize = new Sequelize(config.database, config.username, config.password, config);

const db: any = {};

const initializeModels = async () => {
    const modelFiles = fs
        .readdirSync(__dirname)
        .filter((file) => file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.ts');

    for (const file of modelFiles) {
        const modelImport = await import(path.join(__dirname, file));
        const model = modelImport.default;
        if (model && typeof model.initialize === 'function') {
            model.initialize(sequelize);
            db[model.name] = model;
        }
    }
};

(async () => {
    await initializeModels();
})();


db.sequelize = sequelize;
db.Sequelize = Sequelize;

User.initialize(sequelize);
db.User = User;

export default db;
