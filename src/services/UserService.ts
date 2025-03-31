import bcrypt from 'bcrypt';

export interface User {
    id: string;
    email: string;
    password?: string;
    name: string;
}

export class UserService {
    private users: User[] = [
        {
            id: '1',
            email: 'test@example.com',
            password: '$2b$10$YourHashedPasswordHere',
            name: 'Test User'
        }
    ];

    async findById(id: string): Promise<User | undefined> {
        return this.users.find(user => user.id === id);
    }

    async findByEmail(email: string): Promise<User | undefined> {
        return this.users.find(user => user.email === email);
    }

    async create(userData: Omit<User, 'id'>): Promise<User> {
        const existingUser = await this.findByEmail(userData.email);
        if (existingUser) {
            throw new Error('Email already exists');
        }

        const hashedPassword = await bcrypt.hash(userData.password!, 10);
        const newUser: User = {
            id: String(this.users.length + 1),
            ...userData,
            password: hashedPassword
        };
        this.users.push(newUser);
        return newUser;
    }
} 