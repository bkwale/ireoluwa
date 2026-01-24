import { createClient } from '@libsql/client';

const client = createClient({
  url: process.env.DATABASE_URL,
  authToken: process.env.DATABASE_AUTH_TOKEN,
});

async function checkTables() {
  console.log('📊 Checking tables in database...');

  const result = await client.execute(`
    SELECT name, sql FROM sqlite_master
    WHERE type='table'
    ORDER BY name;
  `);

  console.log('\nTables found:');
  result.rows.forEach(row => {
    console.log(`\n--- ${row.name} ---`);
    console.log(row.sql);
  });

  client.close();
}

checkTables();
