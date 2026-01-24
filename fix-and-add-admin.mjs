import { createClient } from '@libsql/client';
import bcrypt from 'bcryptjs';

const client = createClient({
  url: process.env.DATABASE_URL,
  authToken: process.env.DATABASE_AUTH_TOKEN,
});

async function fixAndAddAdmin() {
  console.log('🔧 Fixing database and adding admin...\n');

  try {
    // Drop the email unique index
    console.log('1. Dropping User_email_key index...');
    await client.execute('DROP INDEX IF EXISTS "User_email_key"');
    console.log('✅ Index dropped\n');

    // Add admin user
    console.log('2. Adding admin user...');
    const guardianPassword = await bcrypt.hash('guardian123', 10);

    await client.execute({
      sql: `INSERT INTO "User" (id, username, email, name, passwordHash, role, enrolledAt, createdAt, updatedAt)
            VALUES (?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`,
      args: ['admin_user_001', 'admin', '[email protected]', 'Guardian', guardianPassword, 'GUARDIAN']
    });
    console.log('✅ Admin user added\n');

    // Recreate the email unique index
    console.log('3. Recreating User_email_key index...');
    await client.execute('CREATE UNIQUE INDEX "User_email_key" ON "User"("email")');
    console.log('✅ Index recreated\n');

    // Verify both users exist
    console.log('4. Verifying users...');
    const result = await client.execute('SELECT id, username, email, role FROM "User"');
    console.log(`\nFound ${result.rows.length} users:`);
    result.rows.forEach(row => {
      console.log(`  - ${row.username} (${row.role}): ${row.email}`);
    });

    console.log('\n✅ Setup complete!');
    console.log('\n📝 Login credentials:');
    console.log('   Student: username: ireoluwa / password: student123');
    console.log('   Guardian: username: admin / password: guardian123');

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    client.close();
  }
}

fixAndAddAdmin();
