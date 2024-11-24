"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const sequelize_1 = require("sequelize");
const uuid_1 = require("uuid");
class User extends sequelize_1.Model {
    static initialize(sequelize) {
        User.init({
            user_id: {
                type: sequelize_1.DataTypes.UUID,
                defaultValue: () => (0, uuid_1.v4)(),
                primaryKey: true,
            },
            email: {
                type: sequelize_1.DataTypes.STRING,
                unique: true,
                allowNull: false,
            },
            password: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
            firstName: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
            lastName: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
        }, {
            sequelize,
            modelName: 'User',
            timestamps: false,
        });
    }
}
exports.User = User;
