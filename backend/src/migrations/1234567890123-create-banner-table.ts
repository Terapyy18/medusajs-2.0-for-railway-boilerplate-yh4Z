import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateBannerTable1234567890123 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "banner",
                columns: [
                    {
                        name: "id",
                        type: "varchar",
                        isPrimary: true,
                    },
                    {
                        name: "title",
                        type: "varchar",
                    },
                    {
                        name: "subtitle",
                        type: "varchar",
                        isNullable: true,
                    },
                    {
                        name: "image_url",
                        type: "text",
                        isNullable: true,
                    },
                    {
                        name: "link_url",
                        type: "text",
                    },
                    {
                        name: "link_text",
                        type: "varchar",
                    },
                    {
                        name: "badge_text",
                        type: "varchar",
                        isNullable: true,
                    },
                    {
                        name: "badge_color",
                        type: "varchar",
                        isNullable: true,
                    },
                    {
                        name: "background_color",
                        type: "varchar",
                        isNullable: true,
                    },
                    {
                        name: "text_color",
                        type: "varchar",
                        default: "'#FFFFFF'",
                    },
                    {
                        name: "button_variant",
                        type: "varchar",
                        default: "'secondary'",
                    },
                    {
                        name: "position",
                        type: "integer",
                        default: 0,
                    },
                    {
                        name: "is_active",
                        type: "boolean",
                        default: true,
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "CURRENT_TIMESTAMP",
                    },
                    {
                        name: "updated_at",
                        type: "timestamp",
                        default: "CURRENT_TIMESTAMP",
                        onUpdate: "CURRENT_TIMESTAMP",
                    },
                ],
            }),
            true
        )

        // Insert default banners
        await queryRunner.query(`
      INSERT INTO banner (id, title, subtitle, link_url, link_text, badge_text, badge_color, background_color, button_variant, position, is_active)
      VALUES 
        ('banner_1', 'La Collection Égypte', NULL, '/collections/egypt', 'Découvrir', 'Nouveauté', '#D4AF37', '#1a1a1a', 'secondary', 0, true),
        ('banner_2', 'Pièces d''Exception', NULL, '/store?type=set', 'Voir la sélection', 'Sélectionnés pour vous', '#D1D5DB', '#111827', 'transparent', 1, true)
    `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("banner")
    }
}
