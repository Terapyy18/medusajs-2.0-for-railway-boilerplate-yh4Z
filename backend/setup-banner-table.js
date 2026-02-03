/**
 * Script pour créer la table banner dans la base de données
 * Exécution: node setup-banner-table.js
 */

const { Client } = require('pg')
require('dotenv').config()

const SQL = `
CREATE TABLE IF NOT EXISTS banner (
    id VARCHAR PRIMARY KEY,
    title VARCHAR NOT NULL,
    subtitle VARCHAR,
    image_url TEXT,
    link_url TEXT NOT NULL,
    link_text VARCHAR NOT NULL,
    badge_text VARCHAR,
    badge_color VARCHAR,
    background_color VARCHAR,
    text_color VARCHAR DEFAULT '#FFFFFF',
    button_variant VARCHAR DEFAULT 'secondary',
    position INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO banner (id, title, link_url, link_text, badge_text, badge_color, background_color, button_variant, position, is_active)
VALUES 
    ('banner_1', 'La Collection Égypte', '/collections/egypt', 'Découvrir', 'Nouveauté', '#D4AF37', '#1a1a1a', 'secondary', 0, true),
    ('banner_2', 'Pièces d''Exception', '/store?type=set', 'Voir la sélection', 'Sélectionnés pour vous', '#D1D5DB', '#111827', 'transparent', 1, true)
ON CONFLICT (id) DO NOTHING;
`

async function setupBannerTable() {
    const client = new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : undefined
    })

    try {
        console.log('🔌 Connexion à la base de données...')
        await client.connect()

        console.log('📝 Création de la table banner...')
        await client.query(SQL)

        console.log('✅ Table banner créée avec succès!')

        // Vérification
        const result = await client.query('SELECT * FROM banner ORDER BY position')
        console.log(`\n📊 ${result.rows.length} bannière(s) trouvée(s):`)
        result.rows.forEach(banner => {
            console.log(`   - ${banner.id}: ${banner.title} (${banner.is_active ? 'Actif' : 'Inactif'})`)
        })

    } catch (error) {
        console.error('❌ Erreur:', error.message)
        process.exit(1)
    } finally {
        await client.end()
        console.log('\n✨ Terminé!')
    }
}

setupBannerTable()
