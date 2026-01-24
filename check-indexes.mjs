import { createClient } from '@libsql/client';

const client = createClient({
  url: process.env.DATABASE_URL,
  authToken: process.env.DATABASE_AUTH_TOKEN,
});

async function checkIndexes() {
  console.log('📇 Checking indexes...');

  const result = await client.execute(`
    SELECT name, tbl_name, sql FROM sqlite_master
    WHERE type='index' AND tbl_name='User'
    ORDER BY name;
  `);

  console.log(`\nFound ${result.rows.length} indexes on User table:`);
  result.rows.forEach(row => {
    console.log(`\n--- ${row.name} ---`);
    console.log(row.sql || '(auto-created)');
  });

  // Check what emails exist
  console.log('\n\n📧 Checking all emails:');
  const emails = await client.execute('SELECT DISTINCT email FROM "User"');
  emails.rows.forEach(row => {
    console.log(`  - ${row.email}`);
  });

  client.close();
}

checkIndexes();
