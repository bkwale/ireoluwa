import { createClient } from '@libsql/client';

const client = createClient({
  url: process.env.DATABASE_URL,
  authToken: process.env.DATABASE_AUTH_TOKEN,
});

async function queryAll() {
  console.log('🔍 Querying ALL data from User table...\n');

  const result = await client.execute('SELECT * FROM "User"');

  console.log(`Found ${result.rows.length} rows:\n`);

  result.rows.forEach((row, index) => {
    console.log(`--- User ${index + 1} ---`);
    console.log(JSON.stringify(row, null, 2));
    console.log('');
  });

  client.close();
}

queryAll();
