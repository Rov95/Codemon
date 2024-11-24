"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const sequelize_1 = require("sequelize");
const User_1 = require("./User");
const basename = path_1.default.basename(__filename);
const config = require(__dirname + '/../config/config.json').development;
const sequelize = new sequelize_1.Sequelize(config.database, config.username, config.password, config);
const db = {};
fs_1.default.readdirSync(__dirname)
    .filter((file) => file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.ts')
    .forEach((file) => {
    const model = require(path_1.default.join(__dirname, file));
    model.default(sequelize);
    db[model.default.name] = model.default;
});
db.sequelize = sequelize;
db.Sequelize = sequelize_1.Sequelize;
User_1.User.initialize(sequelize);
db.User = User_1.User;
exports.default = db;
