# 🖨️ TeraPrintStudio — Storefront

> Boutique e-commerce spécialisée dans l'impression professionnelle et personnalisée.  
> Construite sur **Next.js 15** + **MedusaJS 2.0**, déployée sur **Railway**.

---

## 🚀 Stack Technique

| Catégorie | Technologie |
|---|---|
| **Framework** | [Next.js 15](https://nextjs.org/) (App Router) |
| **Backend / Commerce** | [MedusaJS 2.0](https://medusajs.com/) |
| **Langage** | [TypeScript](https://www.typescriptlang.org/) |
| **Styling** | [Tailwind CSS v3](https://tailwindcss.com/) + [Medusa UI](https://docs.medusajs.com/ui) |
| **Paiements** | [Stripe](https://stripe.com/) · [PayPal](https://www.paypal.com/) |
| **Recherche** | [MeiliSearch](https://www.meilisearch.com/) |
| **Stockage fichiers** | [MinIO](https://min.io/) (fallback: local) |
| **Déploiement** | [Railway](https://railway.app/) |
| **Carousel** | [Embla Carousel](https://www.embla-carousel.com/) |
| **Icons** | [Lucide React](https://lucide.dev/) |

---

## ✨ Fonctionnalités

### 🛒 E-commerce

- Page produit avec galerie et options
- Catalogue avec filtres par collection et catégorie
- Panier persistant
- Checkout complet (adresse, livraison, paiement)
- Paiement par **carte bancaire** (Stripe) et **PayPal**
- Espace client (compte, historique commandes, adresses)
- Détail de commande confirmée

### ⚡ Next.js 15 + App Router

- **Server Components** — rendu côté serveur par défaut
- **Server Actions** — mutations sans API route
- **Streaming** — chargement progressif des pages
- **Static Pre-Rendering** — pages produits générées à la build
- **Next fetching/caching** — mise en cache automatique des données

### 🔍 Recherche

- Intégration native **MeiliSearch** via `@meilisearch/instant-meilisearch`
- Compatible **Algolia** (changement de client de recherche possible)
- Index `products` synchronisé depuis le backend Medusa

### 🌍 Internationalisation

- Routing dynamique par `[countryCode]`
- Prix et langue adaptés par région (configuré dans Medusa Admin)
- Détection automatique du pays via IP (Vercel) ou variable `NEXT_PUBLIC_DEFAULT_REGION`

---

## 🗂️ Structure du projet

```
storefront/
└── src/
    ├── app/                    # Pages & layouts (App Router)
    │   └── [countryCode]/
    │       ├── (checkout)/     # Tunnel de commande (layout séparé)
    │       └── (main)/         # Reste du site
    │           ├── account/    # Espace client
    │           ├── cart/       # Panier
    │           ├── collections/
    │           ├── products/
    │           ├── search/
    │           └── store/
    ├── lib/                    # SDK Medusa, utils, config, constantes
    │   └── data/index.ts       # Toutes les fonctions d'appel API Medusa
    ├── modules/                # Composants UI organisés par section
    ├── styles/                 # global.css (Tailwind)
    ├── types/                  # Types TypeScript globaux
    └── middleware.ts           # Redirection countryCode (Edge Function)
```

---

## ⚙️ Installation locale

### Prérequis

- Node.js 18+
- Un backend **MedusaJS** tournant sur `http://localhost:9000`

### 1. Variables d'environnement

```bash
cp .env.local.template .env.local
```

Édite `.env.local` :

```env
NEXT_PUBLIC_MEDUSA_BACKEND_URL=http://localhost:9000
NEXT_PUBLIC_BASE_URL=http://localhost:8000
NEXT_PUBLIC_DEFAULT_REGION=fr
NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=<ta_clé_publiable_medusa>

# Paiements
NEXT_PUBLIC_STRIPE_KEY=<ta_clé_publique_stripe>
NEXT_PUBLIC_PAYPAL_CLIENT_ID=<ton_client_id_paypal>

# Recherche (optionnel)
NEXT_PUBLIC_SEARCH_ENDPOINT=http://localhost:7700
NEXT_PUBLIC_SEARCH_API_KEY=<ta_clé_meilisearch>
NEXT_PUBLIC_INDEX_NAME=products
```

### 2. Installer les dépendances

```bash
npm install
# ou
pnpm install
```

### 3. Démarrer en développement

```bash
npm run dev
```

Le storefront est accessible sur **http://localhost:8000**

---

## 🌐 Déploiement (Railway)

Les variables d'environnement à configurer sur Railway :

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_MEDUSA_BACKEND_URL` | URL du backend Railway |
| `NEXT_PUBLIC_BASE_URL` | URL du storefront Railway |
| `NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY` | Clé publiable Medusa (Admin → API Keys) |
| `NEXT_PUBLIC_STRIPE_KEY` | Clé publique Stripe (`pk_live_...`) |
| `NEXT_PUBLIC_PAYPAL_CLIENT_ID` | Client ID PayPal Live |
| `NEXT_PUBLIC_DEFAULT_REGION` | Région par défaut (ex: `fr`) |

---

## 💳 Intégrations Paiement

### Stripe
Cartes bancaires classiques via les Card Fields sécurisés Stripe.

### PayPal
Paiement via compte PayPal ou carte bancaire via PayPal Card Fields (`@paypal/react-paypal-js`).

---

## 🔍 Recherche MeiliSearch

La recherche est intégrée via `@meilisearch/instant-meilisearch` et configurée via les variables :

```env
NEXT_PUBLIC_SEARCH_ENDPOINT=https://ton-meilisearch.railway.app
NEXT_PUBLIC_SEARCH_API_KEY=<search_key>
NEXT_PUBLIC_INDEX_NAME=products
```

> Pour basculer sur **Algolia**, remplace le `searchClient` dans `@lib/search-client` par `algoliasearch`.

---

## 📄 Licence

MIT © 2026 Theo D.
