"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_session_1 = __importDefault(require("express-session"));
const user_1 = __importDefault(require("./routes/user"));
const models_1 = __importDefault(require("./models"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
// when conecting to the front this is probably the 
// config to use so I will leave it her for latter
// origin: 'http://localhost:5173',
// credentials: true,
}));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, express_session_1.default)({
    name: 'rovix',
    secret: '123456789',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        httpOnly: true,
        maxAge: 1000 * 60 * 60,
    },
    proxy: true,
}));
// Routes
app.use('/users', user_1.default);
const port = 3000;
models_1.default.sequelize
    .sync()
    .then(() => {
    app.listen(port, () => {
        console.log(`Server running on http://127.0.0.1:${port}`);
    });
})
    .catch((error) => console.error('Failed to sync DB: ', error));
