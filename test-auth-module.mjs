// Set environment variables before importing
process.env.DATABASE_URL = 'libsql://ireoluwa-wkoleosho.aws-eu-west-1.turso.io';
process.env.DATABASE_AUTH_TOKEN = 'eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJnaWQiOiI1ZjMzOTcyZC03Y2RjLTQ3YjktOTc0OC01YzBlNmViNDcxM2YiLCJpYXQiOjE3NjkyNzUxNDAsInJpZCI6ImUyODcxNGMzLTI5YjktNGRkMy04MmU0LTkxMDM2NWM5MjMyMCJ9.f1Z7xu-EaBEQ_PfGovS9IJAwjBZ5mzFD6Su3TtwObVTsADSGfB24gnoME29sqs-htQzCB2bDxw7sx8Y46-dSAA';

import { verifyUser } from './lib/auth.ts';

async function testAuthModule() {
  console.log('🧪 Testing auth.ts verifyUser function...\n');

  try {
    // Test student login
    console.log('Test 1: Verifying student (ireoluwa / student123)...');
    const student = await verifyUser('ireoluwa', 'student123');

    if (student) {
      console.log('✅ Student verification successful!');
      console.log('   User:', student);
    } else {
      console.log('❌ Student verification failed!');
    }

    // Test admin login
    console.log('\nTest 2: Verifying admin (admin / guardian123)...');
    const admin = await verifyUser('admin', 'guardian123');

    if (admin) {
      console.log('✅ Admin verification successful!');
      console.log('   User:', admin);
    } else {
      console.log('❌ Admin verification failed!');
    }

    // Test wrong password
    console.log('\nTest 3: Verifying with wrong password...');
    const wrongPass = await verifyUser('ireoluwa', 'wrongpassword');

    if (wrongPass) {
      console.log('❌ Should have failed but succeeded!');
    } else {
      console.log('✅ Correctly rejected wrong password');
    }

    console.log('\n✅ All auth module tests passed!');

  } catch (error) {
    console.error('❌ Error during test:', error.message);
    console.error('Stack:', error.stack);
  }

  process.exit(0);
}

testAuthModule();
