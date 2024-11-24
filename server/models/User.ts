import { Model, DataTypes, Sequelize } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
import { UserAttributes } from '../interfaces/User';

export default class User extends Model<UserAttributes> implements UserAttributes {
    public user_id!: string;
    public email!: string;
    public password!: string;
    public firstName!: string;
    public lastName!: string;

    static initialize(sequelize: Sequelize) {
        User.init(
        {
            user_id: {
            type: DataTypes.UUID,
            defaultValue: () => uuidv4(),
            primaryKey: true,
            },
            email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            },
            password: {
            type: DataTypes.STRING,
            allowNull: false,
            },
            firstName: {
            type: DataTypes.STRING,
            allowNull: false,
            },
            lastName: {
            type: DataTypes.STRING,
            allowNull: false,
            },
        },
        {
            sequelize,
            modelName: 'User',
            timestamps: false,
        }
        );
        return User;
    }
}
