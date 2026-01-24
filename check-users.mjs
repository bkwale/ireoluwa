import { createClient } from '@libsql/client';

const client = createClient({
  url: process.env.DATABASE_URL,
  authToken: process.env.DATABASE_AUTH_TOKEN,
});

async function checkUsers() {
  console.log('👥 Checking users in database...');

  const result = await client.execute('SELECT id, username, email, name, role FROM "User"');

  console.log(`\nFound ${result.rows.length} users:`);
  result.rows.forEach(row => {
    console.log(`  - ID: ${row.id}, Username: ${row.username}, Email: ${row.email}, Name: ${row.name}, Role: ${row.role}`);
  });

  client.close();
}

checkUsers();
