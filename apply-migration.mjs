import { createClient } from '@libsql/client';
import fs from 'fs';

const client = createClient({
  url: process.env.DATABASE_URL,
  authToken: process.env.DATABASE_AUTH_TOKEN,
});

async function applyMigration() {
  console.log('🔧 Applying database migration to Turso...');
  console.log('📍 Database:', process.env.DATABASE_URL);
  console.log('');

  try {
    // Read the migration SQL
    const migrationSQL = fs.readFileSync('./prisma/migrations/20260124171710_add_username/migration.sql', 'utf-8');

    // Remove comments and split by semicolon followed by newline
    const cleanSQL = migrationSQL
      .split('\n')
      .filter(line => !line.trim().startsWith('--'))
      .join('\n');

    const statements = cleanSQL
      .split(/;\s*\n/)
      .map(s => s.trim())
      .filter(s => s.length > 10); // Filter out empty or very short statements

    console.log(`📝 Found ${statements.length} SQL statements to execute`);
    console.log('');

    // Execute each statement
    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i];
      const preview = statement.substring(0, 50).replace(/\s+/g, ' ');
      console.log(`⏳ [${i + 1}/${statements.length}] ${preview}...`);

      try {
        await client.execute(statement);
        console.log(`✅ Statement ${i + 1} completed`);
      } catch (error) {
        // Ignore "already exists" errors
        if (error.message && (error.message.includes('already exists') || error.message.includes('duplicate'))) {
          console.log(`⚠️  Statement ${i + 1} skipped (already exists)`);
        } else {
          console.error(`❌ Error in statement ${i + 1}:`, error.message);
          throw error;
        }
      }
    }

    console.log('');
    console.log('🎉 Migration applied successfully!');
    console.log('');

    // Verify tables were created
    const result = await client.execute(`
      SELECT name FROM sqlite_master
      WHERE type='table'
      ORDER BY name;
    `);

    console.log('📊 Tables in database:');
    result.rows.forEach(row => {
      console.log(`   - ${row.name}`);
    });

  } catch (error) {
    console.error('❌ Error applying migration:', error.message);
    process.exit(1);
  } finally {
    client.close();
  }
}

applyMigration();
