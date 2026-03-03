-- Script de création de la table Banner
-- PostgreSQL

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

-- Insérer des bannières par défaut
INSERT INTO banner (id, title, link_url, link_text, badge_text, badge_color, background_color, button_variant, position, is_active)
VALUES 
    ('banner_1', 'La Collection Égypte', '/collections/egypt', 'Découvrir', 'Nouveauté', '#D4AF37', '#1a1a1a', 'secondary', 0, true),
    ('banner_2', 'Pièces d''Exception', '/store?type=set', 'Voir la sélection', 'Sélectionnés pour vous', '#D1D5DB', '#111827', 'transparent', 1, true)
ON CONFLICT (id) DO NOTHING;

-- Vérifier que les bannières ont été créées
SELECT * FROM banner ORDER BY position;
