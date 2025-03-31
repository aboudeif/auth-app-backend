import { AppError } from '../utils/AppError';
import { UserService, User } from './UserService';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { NextApiRequest } from 'next';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export class AuthService {
    constructor(private userService: UserService) {}

    async signup(email: string, password: string, name: string): Promise<{ user: User; token: string }> {
        const user = await this.userService.create({ email, password, name });
        
        const token = jwt.sign(
            { id: user.id, email: user.email },
            JWT_SECRET,
            { expiresIn: '24h' }
        );

        return {
            user: {
                id: user.id,
                email: user.email,
                name: user.name
            },
            token
        };
    }

    async login(email: string, password: string): Promise<{ user: User; token: string }> {
        const user = await this.userService.findByEmail(email);
        
        if (!user) {
            throw AppError.unauthorized('Invalid credentials');
        }

        const isValidPassword = await bcrypt.compare(password, user.password!);
        if (!isValidPassword) {
            throw AppError.unauthorized('Invalid credentials');
        }

        const token = jwt.sign(
            { id: user.id, email: user.email },
            JWT_SECRET,
            { expiresIn: '24h' }
        );

        return {
            user: {
                id: user.id,
                email: user.email,
                name: user.name
            },
            token
        };
    }

    async logout(): Promise<{ success: boolean; message: string }> {
        return {
            success: true,
            message: 'Successfully logged out'
        };
    }
}