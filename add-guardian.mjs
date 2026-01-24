import { createClient } from '@libsql/client';
import bcrypt from 'bcryptjs';

const client = createClient({
  url: process.env.DATABASE_URL,
  authToken: process.env.DATABASE_AUTH_TOKEN,
});

async function addGuardian() {
  console.log('👤 Adding guardian user...');

  try {
    const guardianPassword = await bcrypt.hash('guardian123', 10);

    await client.execute({
      sql: `INSERT INTO "User" (id, username, email, name, passwordHash, role, enrolledAt, createdAt, updatedAt)
            VALUES (?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`,
      args: ['clzguardian001', 'admin', '[email protected]', 'Guardian', guardianPassword, 'GUARDIAN']
    });

    console.log('✅ Guardian user created successfully!');
    console.log('   Username: admin');
    console.log('   Password: guardian123');

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    client.close();
  }
}

addGuardian();
