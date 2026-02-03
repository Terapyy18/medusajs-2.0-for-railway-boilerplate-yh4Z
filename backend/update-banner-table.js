const { Client } = require('pg')
require('dotenv').config()

const SQL = `
ALTER TABLE banner ADD COLUMN IF NOT EXISTS deleted_at TIMESTAMPTZ NULL;
`

async function updateBannerTable() {
    // Parse DATABASE_URL manually since Medusa might use a different format or just use the string directly
    const connectionString = process.env.DATABASE_URL
    if (!connectionString) {
        console.error('❌ DATABASE_URL is missing in .env')
        process.exit(1)
    }

    const client = new Client({
        connectionString,
        ssl: { rejectUnauthorized: false } // Required for Railway
    })

    try {
        console.log('🔌 Connecting to database...')
        await client.connect()

        console.log('📝 Updating banner table...')
        await client.query(SQL)

        console.log('✅ Banner table updated successfully (deleted_at added)!')

    } catch (error) {
        console.error('❌ Error:', error)
        process.exit(1)
    } finally {
        await client.end()
        console.log('✨ Done!')
    }
}

updateBannerTable()
