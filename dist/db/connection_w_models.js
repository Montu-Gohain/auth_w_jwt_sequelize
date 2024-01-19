"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Todo = exports.User = exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const dotenv = __importStar(require("dotenv"));
const sequelize_2 = require("sequelize");
const bcrypt_1 = __importDefault(require("bcrypt"));
const uuid_1 = require("uuid");
const sequelize_3 = require("sequelize");
dotenv.config();
const DB_URL = process.env.DB_URI;
exports.sequelize = new sequelize_1.Sequelize(DB_URL);
// Todo : Let's connect with our database.
exports.default = async () => {
    try {
        await exports.sequelize.authenticate();
        console.log("Successfully connected with the database 🗄️🗄️🗄️.");
    }
    catch (error) {
        console.log(error);
    }
};
// Todo : Let's define some models
exports.User = exports.sequelize.define("user", {
    id: {
        type: sequelize_2.UUID,
        defaultValue: () => (0, uuid_1.v4)(),
        primaryKey: true,
    },
    username: {
        type: sequelize_2.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: sequelize_2.STRING,
        allowNull: false,
    },
}, {
    timestamps: true,
});
// Todo : Let's encrypt the user given password , before storing it in the DB.
exports.User.beforeCreate(async (_user_) => {
    const salt = await bcrypt_1.default.genSalt(10);
    _user_.password = await bcrypt_1.default.hash(_user_.password, salt);
});
/*
 Let's create another Model : Todo , which will include tasks.
 WE Will create an One to Many relationship model with the USER's model. i.e One user can have multiple todos that he'll create and he can access the todos that are created by himself.
*/
exports.Todo = exports.sequelize.define("todo", {
    task: {
        type: sequelize_2.STRING,
        allowNull: false,
    },
    is_complete: {
        type: sequelize_3.BOOLEAN,
        defaultValue: false,
    },
}, {
    timestamps: true,
});
// Todo: Let's make the association here.
exports.User.hasMany(exports.Todo);
exports.Todo.belongsTo(exports.User);
// sync_all_tables_forced();
// alter_all_tables();
//# sourceMappingURL=connection_w_models.js.map