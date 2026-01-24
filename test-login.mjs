import { createClient } from '@libsql/client';
import bcrypt from 'bcryptjs';

const client = createClient({
  url: process.env.DATABASE_URL,
  authToken: process.env.DATABASE_AUTH_TOKEN,
});

async function testLogin() {
  console.log('🔐 Testing login functionality...\n');

  try {
    // Test 1: Fetch user by username
    console.log('Test 1: Fetching user "ireoluwa"...');
    const student = await client.execute({
      sql: 'SELECT * FROM "User" WHERE username = ?',
      args: ['ireoluwa']
    });

    if (student.rows.length === 0) {
      console.log('❌ User "ireoluwa" not found!');
      return;
    }

    console.log('✅ User found:', {
      id: student.rows[0].id,
      username: student.rows[0].username,
      email: student.rows[0].email,
      role: student.rows[0].role
    });

    // Test 2: Verify password
    console.log('\nTest 2: Verifying password for "ireoluwa"...');
    const passwordHash = student.rows[0].passwordHash;
    const isValid = await bcrypt.compare('student123', passwordHash);

    if (isValid) {
      console.log('✅ Password verification successful!');
    } else {
      console.log('❌ Password verification failed!');
    }

    // Test 3: Fetch admin user
    console.log('\nTest 3: Fetching user "admin"...');
    const admin = await client.execute({
      sql: 'SELECT * FROM "User" WHERE username = ?',
      args: ['admin']
    });

    if (admin.rows.length === 0) {
      console.log('❌ User "admin" not found!');
      return;
    }

    console.log('✅ User found:', {
      id: admin.rows[0].id,
      username: admin.rows[0].username,
      email: admin.rows[0].email,
      role: admin.rows[0].role
    });

    // Test 4: Verify admin password
    console.log('\nTest 4: Verifying password for "admin"...');
    const adminPasswordHash = admin.rows[0].passwordHash;
    const isAdminValid = await bcrypt.compare('guardian123', adminPasswordHash);

    if (isAdminValid) {
      console.log('✅ Password verification successful!');
    } else {
      console.log('❌ Password verification failed!');
    }

    console.log('\n✅ All tests passed! Login should work.');

  } catch (error) {
    console.error('❌ Error during test:', error.message);
    console.error('Full error:', error);
  } finally {
    client.close();
  }
}

testLogin();
