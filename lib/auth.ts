import { prisma } from './db';
import bcrypt from 'bcryptjs';

export type UserRole = 'STUDENT' | 'GUARDIAN' | 'ADMIN';

export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

export async function verifyUser(email: string, password: string): Promise<User | null> {
  const user = await prisma.user.findUnique({
    where: { email },
    select: {
      id: true,
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
    email: user.email,
    name: user.name,
    role: user.role,
  };
}

export async function createUser(
  email: string,
  password: string,
  name: string,
  role: UserRole = 'STUDENT'
): Promise<User> {
  const passwordHash = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email,
      name,
      passwordHash,
      role,
    },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
    },
  });

  return user;
}
