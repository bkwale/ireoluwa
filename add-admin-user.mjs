import { createClient } from '@libsql/client';
import bcrypt from 'bcryptjs';

const client = createClient({
  url: process.env.DATABASE_URL,
  authToken: process.env.DATABASE_AUTH_TOKEN,
});

async function addAdmin() {
  console.log('👤 Adding admin (guardian) user...');

  try {
    const guardianPassword = await bcrypt.hash('guardian123', 10);

    await client.execute({
      sql: `INSERT INTO "User" (id, username, email, name, passwordHash, role, enrolledAt, createdAt, updatedAt)
            VALUES (?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`,
      args: ['admin_user_001', 'admin', '[email protected]', 'Guardian', guardianPassword, 'GUARDIAN']
    });

    console.log('✅ Admin user created successfully!');
    console.log('');
    console.log('📝 Login credentials:');
    console.log('   Username: admin');
    console.log('   Password: guardian123');

  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error('Full error:', error);
  } finally {
    client.close();
  }
}

addAdmin();
