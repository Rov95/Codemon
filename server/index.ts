import express from 'express';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import userRouter from './routes/user';
import db from './models';
import cors from 'cors';

const app = express();

app.use(
    cors({
        // when conecting to the front this is probably the 
        // config to use so I will leave it her for latter
        
        // origin: 'http://localhost:5173',
        // credentials: true,
    })
);

app.use(express.json());
app.use(cookieParser());

app.use(
    session({
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
    })
);

// Routes
app.use('/users', userRouter);

const port = 3000;

db.sequelize
    .sync()
    .then(() => {
        app.listen(port, () => {
        console.log(`Server running on http://127.0.0.1:${port}`);
        });
    })
    .catch((error:any) => console.error('Failed to sync DB: ', error));
