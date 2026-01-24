import { prisma } from './db';
import bcrypt from 'bcryptjs';

export type UserRole = 'STUDENT' | 'GUARDIAN' | 'ADMIN';

export interface User {
  id: string;
  username: string;
  email: string;
  name: string;
  role: string;
}

export async function verifyUser(username: string, password: string): Promise<User | null> {
  const user = await prisma.user.findUnique({
    where: { username },
    select: {
      id: true,
      username: true,
      email: true,
      name: true,
      role: true,
      passwordHash: true,
    },
  });

  if (!user) {
    return null;
  }

  const isValid = await bcrypt.compare(password, user.passwordHash);
  if (!isValid) {
    return null;
  }

  return {
    id: user.id,
    username: user.username,
    email: user.email,
    name: user.name,
    role: user.role,
  };
}

export async function createUser(
  username: string,
  email: string,
  password: string,
  name: string,
  role: UserRole = 'STUDENT'
): Promise<User> {
  const passwordHash = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      username,
      email,
      name,
      passwordHash,
      role,
    },
    select: {
      id: true,
      username: true,
      email: true,
      name: true,
      role: true,
    },
  });

  return user;
}
