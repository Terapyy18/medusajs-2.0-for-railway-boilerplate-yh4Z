# 🖨️ TeraPrintStudio — Documentation du projet

> Plateforme e-commerce complète spécialisée dans l'impression professionnelle et personnalisée.  
> Construite sur **MedusaJS 2.0** (backend) + **Next.js 15** (storefront), déployée sur **Railway**.

---

## 🧭 Vue d'ensemble — Comment fonctionne le projet ?

Ce projet est une **boutique en ligne "full-stack"**, c'est-à-dire qu'il contient à la fois le **site visible par les clients** et le **moteur qui fait tout tourner en arrière-plan**.

Voici comment les différentes parties s'articulent :

```
┌─────────────────────────────────────────────────────────────────────┐
│                        🌍 INTERNET                                  │
└──────────────┬──────────────────────────────┬───────────────────────┘
               │                              │
       ┌───────▼──────┐              ┌────────▼────────┐
       │  STOREFRONT  │              │   BACK OFFICE   │
       │  (Next.js)   │              │  (Medusa Admin) │
       │ Port :8000   │              │  Port :9000/app │
       └───────┬──────┘              └────────┬────────┘
               │                              │
               └──────────────┬───────────────┘
                              │
                    ┌─────────▼──────────┐
                    │     BACKEND API    │
                    │   (MedusaJS 2.0)   │
                    │    Port :9000      │
                    └──────┬─────┬──────┘
                           │     │
              ┌────────────┘     └───────────────┐
              │                                  │
     ┌────────▼────────┐               ┌─────────▼────────┐
     │   PostgreSQL    │               │   Services tiers  │
     │   (Base de      │               │  Stripe · PayPal  │
     │    données)     │               │  SendCloud · Resend│
     └─────────────────┘               │  MeiliSearch · MinIO│
                                       └──────────────────┘
```

En résumé :
- Le **Storefront** est la boutique que voit l'acheteur (catalogue, panier, paiement…)
- Le **Back Office** est l'interface d'administration que seul le vendeur utilise (gérer produits, commandes, stocks…)
- Le **Backend** est le cerveau : il reçoit les demandes du storefront et du back office, gère la base de données, envoie les emails, communique avec SendCloud pour la livraison, etc.

---

## 🗂️ Structure du dépôt

```
medusajs-2.0-for-railway-boilerplate-yh4Z/
├── backend/          ← 🧠 Le cerveau de la boutique (API, logique métier)
└── storefront/       ← 🛍️ La boutique visible par les clients
```

---

## 🧠 Partie 1 — Le Backend (MedusaJS 2.0)

> **C'est quoi MedusaJS ?**  
> MedusaJS est un moteur e-commerce open-source. Imaginez-le comme le « système nerveux » de la boutique : il gère les produits, les commandes, les paiements, les stocks, les clients, les livraisons... et tout ça via une API REST (une interface de communication standardisée).

### 📁 Structure du backend

```
backend/
├── medusa-config.js      ← Configuration centrale (modules, plugins, secrets)
├── src/
│   ├── api/              ← Routes API personnalisées (SendCloud, store, admin)
│   │   ├── sendcloud/    ← Endpoint webhook pour SendCloud (transporteur)
│   │   ├── store/        ← Routes publiques (accès storefront)
│   │   └── admin/        ← Routes protégées (accès back office)
│   ├── modules/          ← Modules métier custom
│   │   ├── blog/         ← Module articles de blog
│   │   ├── banner/       ← Module bannières promotionnelles
│   │   ├── email-notifications/ ← Templates emails transactionnels (Resend)
│   │   └── minio-file/   ← Stockage fichiers/images (MinIO)
│   ├── subscribers/      ← Écouteurs d'événements (déclencheurs automatiques)
│   │   ├── order-placed.ts    ← Email envoyé quand une commande est passée
│   │   ├── order-shipped.ts   ← Email envoyé quand un colis est expédié
│   │   ├── order-delivered.ts ← Email envoyé quand un colis est livré
│   │   └── invite-created.ts  ← Email d'invitation administrateur
│   ├── admin/            ← Pages custom dans le Back Office
│   │   └── routes/
│   │       ├── banners/  ← Gestion des bannières depuis l'admin
│   │       └── posts/    ← Gestion des articles de blog depuis l'admin
│   └── workflows/        ← Flux métier complexes (sagas)
```

### ⚙️ Modules activés

Le fichier `medusa-config.js` est le chef d'orchestre : il déclare tous les modules et services utilisés.

| Module | Rôle |
|---|---|
| **PostgreSQL** | Base de données principale (produits, commandes, clients…) |
| **Redis** *(optionnel)* | File de messages pour les workflows asynchrones |
| **Stripe** | Paiement par carte bancaire |
| **PayPal** | Paiement via compte PayPal |
| **Resend** | Service d'envoi d'emails transactionnels |
| **SendGrid** *(alternatif)* | Autre service d'envoi d'emails |
| **MinIO** | Stockage des images produits (compatible S3) |
| **MeiliSearch** | Moteur de recherche ultra-rapide |

### 📬 Système de notifications automatiques (Subscribers)

> **C'est quoi un Subscriber ?**  
> C'est un écouteur d'événement. Quand quelque chose se passe dans la boutique (commande passée, colis envoyé…), Medusa "publie" un événement, et les subscribers réagissent automatiquement.

Le projet intègre **4 déclencheurs automatiques** :

```
Événement Medusa               →   Action déclenchée
─────────────────────────────────────────────────────
order.placed                   →   Email de confirmation de commande
shipment.created               →   Email d'expédition + numéro de suivi
delivery.created               →   Email de livraison confirmée
invite.created                 →   Email d'invitation administrateur
```

Tous les emails sont bilingues 🇫🇷 🇬🇧 (détection automatique via le pays de livraison).

---

## 🚚 Intégration SendCloud (Gestion des expéditions)

> **C'est quoi SendCloud ?**  
> SendCloud est une plateforme de gestion des expéditions. Elle permet de comparer les transporteurs (Colissimo, DHL, UPS…), générer des étiquettes et suivre les colis. Ici, elle est connectée au backend Medusa.

### Comment ça marche ?

```
1. Admin crée un envoi dans le Back Office Medusa
         ↓
2. Medusa marque le fulfillment comme "expédié"
         ↓
3. L'événement "shipment.created" est publié
         ↓
4. Le subscriber order-shipped.ts est déclenché
         ↓
5. Un email de suivi est envoyé au client avec :
   • Le numéro de tracking
   • L'URL de suivi
   • Le nom du transporteur
```

### Webhook SendCloud

Un endpoint est exposé à l'URL `/sendcloud/webhook` pour que SendCloud puisse notifier le backend en cas de changement de statut d'un colis :

```
POST /sendcloud/webhook  ← SendCloud notifie le backend
GET  /sendcloud/webhook  ← Vérification de santé de l'endpoint
```

---

## 🖥️ Partie 2 — Le Back Office (Medusa Admin)

> **C'est quoi le Back Office ?**  
> C'est l'interface d'administration réservée aux vendeurs/gestionnaires. Elle est intégrée directement dans le backend Medusa et accessible via le navigateur.

**URL locale :** `http://localhost:9000/app`

### Fonctionnalités natives (incluses dans Medusa)

| Section | Ce qu'on peut faire |
|---|---|
| **Produits** | Créer, modifier, archiver des produits, gérer les variantes (taille, couleur…) |
| **Commandes** | Voir toutes les commandes, les traiter, créer des expéditions, rembourser |
| **Clients** | Gérer les comptes clients, voir l'historique d'achat |
| **Collections** | Regrouper des produits par thème (ex: "Impression A4", "Affiches") |
| **Catégories** | Organiser le catalogue en arborescence |
| **Promotions** | Créer des codes promo, remises automatiques |
| **Canaux de vente** | Gérer plusieurs boutiques depuis un seul backend |
| **Régions** | Configurer les prix, devises et taxes par région géographique |
| **Prix** | Listes de prix personnalisées par segment de client |
| **Stocks** | Gérer les niveaux de stock, les entrepôts |
| **Livraisons** | Configurer les méthodes et profils d'expédition |
| **Utilisateurs** | Inviter des collaborateurs avec des rôles définis |
| **Clés API** | Générer les clés publishable pour le storefront |

### Extensions custom du Back Office

Le projet ajoute des **pages supplémentaires** dans l'admin via le dossier `src/admin/routes/` :

| Page custom | Accès | Description |
|---|---|---|
| `/banners` | Admin | Gérer les bannières affichées sur le storefront |
| `/posts` | Admin | Gérer les articles du blog intégré |

---

## 🛍️ Partie 3 — Le Storefront (Next.js 15)

> **C'est quoi le Storefront ?**  
> C'est la boutique que voient vos clients. Elle est construite avec Next.js 15, un framework React moderne qui génère des pages ultra-rapides.

**URL locale :** `http://localhost:8000`

### Stack technique du storefront

| Catégorie | Technologie |
|---|---|
| **Framework** | [Next.js 15](https://nextjs.org/) (App Router) |
| **Langage** | [TypeScript](https://www.typescriptlang.org/) |
| **Styling** | [Tailwind CSS v3](https://tailwindcss.com/) + [Medusa UI](https://docs.medusajs.com/ui) |
| **Paiements** | [Stripe](https://stripe.com/) · [PayPal](https://www.paypal.com/) |
| **Recherche** | [MeiliSearch](https://www.meilisearch.com/) |
| **Stockage** | [MinIO](https://min.io/) (images produits) |
| **Carousel** | [Embla Carousel](https://www.embla-carousel.com/) |
| **Icons** | [Lucide React](https://lucide.dev/) |

### Fonctionnalités du storefront

#### 🛒 Parcours d'achat
- Page d'accueil avec bannières dynamiques (gérées depuis l'admin)
- Catalogue produits avec filtres par collection et catégorie
- Page produit avec galerie d'images et sélection de variantes
- Panier persistant (se souvient des articles entre les visites)
- **Checkout complet** : saisie adresse → choix livraison → paiement
- Paiement par **carte bancaire** (Stripe) et **PayPal**
- Page de confirmation après commande

#### 👤 Espace client
- Création de compte et connexion
- Historique des commandes
- Gestion des adresses de livraison
- Suivi de commande

#### 🔍 Recherche
- Intégration **MeiliSearch** : recherche instantanée et pertinente
- Index `products` synchronisé automatiquement depuis Medusa
- Compatible Algolia (remplacement possible du client de recherche)

#### 🌍 Multi-région
- Routing dynamique par pays (`/fr/`, `/en/`, `/de/`…)
- Prix et devises adaptés selon la région (configuré dans Medusa Admin)
- Détection automatique du pays du visiteur

### Architecture Next.js (App Router)

```
storefront/src/
├── app/
│   └── [countryCode]/
│       ├── (checkout)/        ← Tunnel de commande (layout dédié)
│       └── (main)/            ← Site principal
│           ├── account/       ← Espace client
│           ├── cart/          ← Panier
│           ├── collections/   ← Pages de collections
│           ├── products/      ← Pages produits
│           ├── search/        ← Page de recherche
│           └── store/         ← Catalogue général
├── lib/
│   └── data/index.ts          ← Toutes les requêtes vers l'API Medusa
├── modules/                   ← Composants UI réutilisables
├── styles/                    ← Styles globaux (Tailwind)
└── middleware.ts              ← Redirection automatique par pays
```

---

## ⚙️ Installation locale — Guide pas à pas

### Prérequis

Avant de commencer, assurez-vous d'avoir installé :
- **Node.js 18+** — [télécharger ici](https://nodejs.org/)
- **PostgreSQL** — base de données locale
- **Git** — pour cloner le projet

### 1. Cloner le dépôt

```bash
git clone <url-du-repo>
cd medusajs-2.0-for-railway-boilerplate-yh4Z
```

### 2. Démarrer le Backend

```bash
cd backend
npm install

# Copier le fichier de variables d'environnement
cp .env.template .env   # ou créer manuellement .env

# Lancer les migrations (création des tables en base)
npx medusa db:migrate

# Créer un compte administrateur
npx medusa user -e admin@example.com -p votre_mot_de_passe

# Démarrer le backend
npm run dev
```

Le backend tourne sur **http://localhost:9000**  
Le back office est accessible sur **http://localhost:9000/app**

### 3. Variables d'environnement du Backend (`.env`)

```env
# Base de données (obligatoire)
DATABASE_URL=postgres://user:password@localhost:5432/teraprintstudio

# Sécurité (obligatoire - chaînes aléatoires longues)
JWT_SECRET=votre_jwt_secret_tres_long
COOKIE_SECRET=votre_cookie_secret_tres_long

# URL du backend
BACKEND_URL=http://localhost:9000

# CORS — URLs autorisées à appeler l'API
STORE_CORS=http://localhost:8000
ADMIN_CORS=http://localhost:9000
AUTH_CORS=http://localhost:9000,http://localhost:8000

# Stripe (paiement par carte)
STRIPE_API_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# PayPal
PAYPAL_CLIENT_ID=...
PAYPAL_CLIENT_SECRET=...
PAYPAL_SANDBOX=true

# Emails transactionnels via Resend
RESEND_API_KEY=re_...
RESEND_FROM_EMAIL=noreply@votredomaine.com

# Stockage images (MinIO)
MINIO_ENDPOINT=localhost
MINIO_ACCESS_KEY=...
MINIO_SECRET_KEY=...
MINIO_BUCKET=medusa-media

# Recherche (MeiliSearch)
MEILISEARCH_HOST=http://localhost:7700
MEILISEARCH_ADMIN_KEY=...
```

### 4. Démarrer le Storefront

```bash
cd storefront
npm install

# Copier le fichier de variables d'environnement
cp .env.local.template .env.local
```

Édite `.env.local` :

```env
NEXT_PUBLIC_MEDUSA_BACKEND_URL=http://localhost:9000
NEXT_PUBLIC_BASE_URL=http://localhost:8000
NEXT_PUBLIC_DEFAULT_REGION=fr

# Clé publishable Medusa (Admin → Paramètres → API Keys)
NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=pk_...

# Stripe
NEXT_PUBLIC_STRIPE_KEY=pk_test_...

# PayPal
NEXT_PUBLIC_PAYPAL_CLIENT_ID=...

# Recherche (optionnel)
NEXT_PUBLIC_SEARCH_ENDPOINT=http://localhost:7700
NEXT_PUBLIC_SEARCH_API_KEY=...
NEXT_PUBLIC_INDEX_NAME=products
```

```bash
npm run dev
```

Le storefront est accessible sur **http://localhost:8000**

---

## 🌐 Déploiement sur Railway

[Railway](https://railway.app/) est la plateforme cloud utilisée pour héberger le projet en production. Chaque partie du projet est déployée comme un **service séparé**.

### Services Railway à créer

| Service | Description |
|---|---|
| `medusa-backend` | Le backend MedusaJS |
| `storefront` | La boutique Next.js |
| `postgres` | Base de données PostgreSQL |
| `redis` | Cache & file de messages (optionnel) |
| `meilisearch` | Moteur de recherche (optionnel) |
| `minio` | Stockage fichiers/images (optionnel) |

### Variables d'environnement en production (Backend)

| Variable | Description |
|---|---|
| `DATABASE_URL` | URL Railway de la base PostgreSQL |
| `REDIS_URL` | URL Railway du service Redis |
| `BACKEND_URL` | URL publique du backend (`https://...railway.app`) |
| `STORE_CORS` | URL publique du storefront |
| `ADMIN_CORS` | URL publique du back office |
| `JWT_SECRET` | Chaîne secrète aléatoire longue |
| `COOKIE_SECRET` | Chaîne secrète aléatoire longue |
| `STRIPE_API_KEY` | Clé secrète Stripe Live (`sk_live_...`) |
| `STRIPE_WEBHOOK_SECRET` | Secret webhook Stripe |
| `RESEND_API_KEY` | Clé API Resend |
| `RESEND_FROM_EMAIL` | Email d'envoi vérifié sur Resend |
| `MINIO_ENDPOINT` | Endpoint MinIO |
| `MEILISEARCH_HOST` | URL MeiliSearch |

### Variables d'environnement en production (Storefront)

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_MEDUSA_BACKEND_URL` | URL publique du backend Railway |
| `NEXT_PUBLIC_BASE_URL` | URL publique du storefront Railway |
| `NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY` | Clé publiable Medusa (Admin → API Keys) |
| `NEXT_PUBLIC_STRIPE_KEY` | Clé publique Stripe Live (`pk_live_...`) |
| `NEXT_PUBLIC_DEFAULT_REGION` | Région par défaut (`fr`) |

---

## 🔄 Flux complet d'une commande (de bout en bout)

Voici comment se déroule une commande complète dans le système :

```
1. 🛍️ Le client navigue sur le Storefront
         ↓
2. 🛒 Il ajoute des produits au panier
         ↓
3. 📦 Il saisit son adresse et choisit la livraison
         ↓
4. 💳 Il paie (Stripe ou PayPal)
         ↓
5. ✅ Medusa confirme la commande en base de données
         ↓
6. 📧 Email automatique de confirmation envoyé au client (Resend)
         ↓
7. 🖥️ L'admin voit la commande dans le Back Office
         ↓
8. 🚀 L'admin crée un envoi (via SendCloud connecté au Back Office)
         ↓
9. 📧 Email automatique d'expédition envoyé avec le numéro de suivi
         ↓
10. 📬 Livraison confirmée → Email automatique au client
```

---

## 💳 Intégrations de paiement

### Stripe
Paiement par carte bancaire sécurisé via les `Card Fields` Stripe (PCI DSS compliant).  
Les webhooks Stripe notifient Medusa du statut des paiements en temps réel.

### PayPal
Paiement via compte PayPal ou directement par carte via PayPal Card Fields (`@paypal/react-paypal-js`).  
Compatible mode sandbox (test) et mode live (production).

---

## 🔍 Recherche MeiliSearch

MeiliSearch est un moteur de recherche open-source ultra-rapide. Il est synchronisé avec Medusa via le plugin `@rokmohar/medusa-plugin-meilisearch`.

**Attributs indexés :** `title`, `description`, `variant_sku`, `thumbnail`  
**Attributs filtrables :** `id`, `handle`

Pour basculer sur **Algolia**, remplacer le `searchClient` dans `src/lib/search-client.ts` par `algoliasearch`.

---

## 📧 Emails transactionnels (Resend)

Les templates d'emails sont des **composants React** stockés dans `src/modules/email-notifications/templates/`.

| Template | Événement déclencheur |
|---|---|
| `ORDER_PLACED` | Commande passée |
| `ORDER_SHIPPED` | Colis expédié (avec tracking) |
| `ORDER_DELIVERED` | Colis livré |
| `INVITE` | Invitation d'un nouvel administrateur |

Tous les emails sont **bilingues** (FR/EN) selon le pays de livraison du client.

---

## 📄 Licence

MIT © 2026 Theo D.
