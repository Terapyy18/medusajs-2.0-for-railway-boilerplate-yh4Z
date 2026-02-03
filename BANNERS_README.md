# Guide d'Installation du Système de Bannières

## ✅ Étapes Complétées

1. ✅ Table `banner` créée dans la base de données
2. ✅ 2 bannières par défaut insérées
3. ✅ Module Banner créé dans le backend
4. ✅ Routes API créées (admin et store)
5. ✅ Frontend mis à jour pour afficher les bannières

## 🚀 Utilisation

### Tester l'API Store (Public)

Une fois le backend démarré, testez l'endpoint :

```bash
curl http://localhost:9000/store/banners
```

Vous devriez voir vos 2 bannières par défaut.

### Gérer les Bannières via API Admin

#### 1. Obtenir un token admin

Connectez-vous au dashboard admin : http://localhost:9000/app

Ou utilisez l'API :
```bash
curl -X POST http://localhost:9000/auth/user/emailpass \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@yourmail.com",
    "password": "supersecret"
  }'
```

#### 2. Créer une nouvelle bannière

```bash
curl -X POST http://localhost:9000/admin/banners \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "title": "Nouvelle Collection",
    "subtitle": "Découvrez nos pièces uniques",
    "image_url": "https://example.com/image.jpg",
    "link_url": "/collections/new",
    "link_text": "Découvrir",
    "badge_text": "Nouveau",
    "badge_color": "#D4AF37",
    "background_color": "#2a2a2a",
    "button_variant": "secondary",
    "position": 2,
    "is_active": true
  }'
```

#### 3. Lister toutes les bannières

```bash
curl http://localhost:9000/admin/banners \
  -H "Authorization: Bearer YOUR_TOKEN"
```

#### 4. Mettre à jour une bannière

```bash
curl -X POST http://localhost:9000/admin/banners/banner_1 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "title": "Titre Modifié",
    "is_active": false
  }'
```

#### 5. Supprimer une bannière

```bash
curl -X DELETE http://localhost:9000/admin/banners/banner_1 \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## 📊 Structure des Données

### Champs de la Bannière

| Champ | Type | Obligatoire | Description | Exemple |
|-------|------|-------------|-------------|---------|
| `title` | string | ✅ | Titre principal | "Collection Égypte" |
| `subtitle` | string | ❌ | Sous-titre | "Pièces d'exception" |
| `image_url` | string | ❌ | URL de l'image de fond | "/images/banner.jpg" |
| `link_url` | string | ✅ | URL de destination | "/collections/egypt" |
| `link_text` | string | ✅ | Texte du bouton | "Découvrir" |
| `badge_text` | string | ❌ | Texte du badge | "Nouveauté" |
| `badge_color` | string | ❌ | Couleur hex du badge | "#D4AF37" |
| `background_color` | string | ❌ | Couleur hex du fond | "#1a1a1a" |
| `text_color` | string | ❌ | Couleur hex du texte | "#FFFFFF" |
| `button_variant` | string | ❌ | Style du bouton | "secondary" ou "transparent" |
| `position` | number | ❌ | Ordre d'affichage | 0, 1, 2... |
| `is_active` | boolean | ❌ | Actif/Inactif | true/false |

## 🎨 Utilisation dans le Frontend

Le composant `DiscoveryBanner` récupère automatiquement les bannières depuis l'API et les affiche.

Si aucune bannière n'est disponible, il affiche les bannières par défaut hardcodées.

## 🔧 Prochaines Étapes (optionnel)

1. **Interface Admin Custom** : Créer un widget dans le dashboard Medusa pour gérer les bannières visuellement
2. **Upload d'Images** : Intégrer avec un service de stockage (S3, Cloudinary, etc.)
3. **Planification** : Ajouter des dates de début/fin pour les bannières
4. **A/B Testing** : Ajouter des métriques pour suivre les clics
5. **Multilingue** : Ajouter des traductions par langue

## 🐛 Dépannage

### Le backend ne démarre pas

Si vous voyez des erreurs au démarrage, c'est probablement parce que le module Banner n'est pas correctement chargé. Solution :

1. Vérifiez que la table existe :
```bash
node setup-banner-table.js
```

2. Nettoyez et reconstruisez :
```bash
npm run build
```

### Les bannières ne s'affichent pas

1. Vérifiez que le backend est en cours d'exécution
2. Testez l'endpoint : `curl http://localhost:9000/store/banners`
3. Vérifiez la console du frontend pour les erreurs
4. Assurez-vous que `NEXT_PUBLIC_MEDUSA_BACKEND_URL` est défini

### Erreur CORS

Ajoutez l'URL du frontend dans `medusa-config.js` :
```javascript
module.exports = defineConfig({
  projectConfig: {
    http: {
      storeCors: process.env.STORE_CORS || "http://localhost:3000",
      adminCors: process.env.ADMIN_CORS || "http://localhost:7000,http://localhost:7001",
    }
  }
})
```
