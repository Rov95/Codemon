import express, { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import db from '../models';

const { User } = db;
const router = express.Router();

router.post('/register', async (req: any, res: any) => {
    const { email, password, firstName, lastName } = req.body;

    try {
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
        return res.status(400).json({ error: 'Email already in use' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ email, password: hashedPassword, firstName, lastName });

        req.session!.userId = newUser.user_id;
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
});

router.post('/login', async (req: any, res: any) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ where: { email } });

        if (!user) {
        return res.status(400).json({ error: 'Invalid email or password.' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
        return res.status(400).json({ error: 'Invalid email or password.' });
        }

        req.session!.userId = user.user_id;
        req.session!.save((err:any) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to save session' });
        }
        });

        res.status(200).json({ message: 'User logged in successfully' });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
});

router.get('/me', async (req: any, res: any) => {
    try {
        if (!req.session!.userId) {
        return res.status(401).json({ error: 'You must be logged in to view your information' });
        }
        const user = await User.findByPk(req.session!.userId);
        if (!user) {
        return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json({ user });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
    });

    router.post('/logout', (req: Request, res: Response) => {
    req.session!.destroy((err) => {
        if (err) {
        return res.status(500).json({ error: 'Error logging out' });
        }
        res.clearCookie('rovix');
        res.status(200).json({ message: 'Logged out successfully' });
    });
});

export default router;
