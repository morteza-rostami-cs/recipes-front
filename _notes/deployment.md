Absolutely! Let’s create a **comprehensive, production-ready deployment guide** for both your projects:

- **RecipesAPI (WordPress + Recipe Auth Plugin)**
- **Recipes React App (frontend)**

I’ve synthesized everything we’ve discussed, including environment variables, .env loading, Composer in plugin folders, Docker deployment, and common pitfalls.

---

# **Deployment Guide**

---

## **1️⃣ RecipesAPI WordPress + Recipe Auth Plugin**

### **Project Structure**

```
/var/www/html
├─ wp-content/
│  ├─ plugins/
│  │  ├─ recipe-auth-api/
│  │  │  ├─ composer.json
│  │  │  ├─ composer.lock
│  │  │  ├─ includes/
│  │  │  ├─ recipe-auth-api.php
│  │  │  └─ vendor/  <-- after composer install
│  ├─ themes/
│  └─ ...
├─ wp-config.php
├─ index.php
└─ .env
```

---

### **Step 1: Prepare .env**

Your root `.env` should have **all sensitive keys and environment-specific settings**, e.g.:

```dotenv
# Database
DB_NAME=wordpress
DB_USER=wordpress
DB_PASSWORD="98a4e701"
DB_HOST=db
WORDPRESS_TABLE_PREFIX=wp_

# WordPress URLs
WP_HOME="https://recipesapi.mortteza.site"
WP_SITEURL="https://recipesapi.mortteza.site"

# Security keys
AUTH_KEY="..."
SECURE_AUTH_KEY="..."
LOGGED_IN_KEY="..."
NONCE_KEY="..."
AUTH_SALT="..."
SECURE_AUTH_SALT="..."
LOGGED_IN_SALT="..."
NONCE_SALT="..."
WP_CACHE_KEY_SALT="..."

# Recipe plugin URLs
GOOGLE_REDIRECT_URI_PROD="https://recipesapi.mortteza.site/google-callback"
FRONTEND_URL_PROD="https://recipes.mortteza.site"
BACKEND_URL_PROD="https://recipesapi.mortteza.site"

# Environment
WP_ENV=production
```

⚠️ Make sure there are **no syntax errors**. Quotes are fine; **do not use parentheses or invalid characters** outside quotes.

---

### **Step 2: Plugin Composer Setup**

The plugin requires Composer dependencies.

**Inside plugin folder**:

```bash
cd wp-content/plugins/recipe-auth-api
php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
HASH=$(curl -s https://composer.github.io/installer.sig)
php -r "if (hash_file('sha384', 'composer-setup.php') === trim('$HASH')) { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); } echo PHP_EOL;"
php composer-setup.php --install-dir=. --filename=composer
php ./composer install
```

✅ This installs Composer **locally inside the plugin folder** and generates `vendor/`.

---

### **Step 3: WP-Config.php Adjustments**

- Load `.env` **from root only**, not plugin-level.
- Use the **plugin-local Composer autoloader**.

```php
// Load Composer autoload (plugin-local)
if (file_exists(__DIR__ . '/wp-content/plugins/recipe-auth-api/vendor/autoload.php')) {
    require_once __DIR__ . '/wp-content/plugins/recipe-auth-api/vendor/autoload.php';
}

// Load .env via vlucas/phpdotenv
if (file_exists(__DIR__ . '/.env')) {
    $dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
    $dotenv->load();
}
```

- Use environment variables for database, URLs, and RECIPE\_\* constants.
- Keep debugging flags enabled during initial deployment:

```php
define('WP_DEBUG', true);
define('WP_DEBUG_LOG', true);
define('WP_DEBUG_DISPLAY', true);
@ini_set('display_errors', 1);
```

- Make sure `ABSPATH` is defined and `require_once ABSPATH . 'wp-settings.php';` is at the end.

---

### **Step 4: Docker Deployment (Optional)**

- Ensure `.env` is mounted or copied into container.
- Expose ports properly (`8001` in your example).
- Ensure `db` service is available for WordPress.
- Use `docker-compose up -d` to start everything.
- After starting container, **install plugin Composer deps inside container**.

---

### **Step 5: Troubleshooting Common Issues**

| Problem                                         | Solution                                                                                      |
| ----------------------------------------------- | --------------------------------------------------------------------------------------------- |
| `Failed opening required 'vendor/autoload.php'` | Run Composer inside plugin folder.                                                            |
| `.env parse errors`                             | Make sure all quotes are balanced and no unexpected characters.                               |
| `Headers already sent`                          | Usually caused by PHP errors in wp-config.php before `require_once`. Fix syntax errors first. |
| MySQL multiple instances                        | Check local environment (e.g., Local by Flywheel) for port conflicts.                         |

---

## **2️⃣ Recipes React App Deployment**

### **Step 1: Configure Environment**

- Use `.env.production` (or `.env` in production) at root:

```env
REACT_APP_API_URL=https://recipesapi.mortteza.site
REACT_APP_OTHER_VAR=...
```

- Make sure all environment variables start with `REACT_APP_`.

---

### **Step 2: Build React App**

```bash
npm install
npm run build
```

- Output: `build/` folder.

---

### **Step 3: Serve React App**

#### Option A: Serve via Nginx

- Copy `build/` contents to `/var/www/html/react` (or similar).
- Nginx config example:

```nginx
server {
    listen 80;
    server_name recipes.mortteza.site;

    root /var/www/html/react;
    index index.html;

    location / {
        try_files $uri /index.html;
    }
}
```

#### Option B: Serve via Docker

- Use official `node:alpine` image with `serve`:

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY build/ .
RUN npm install -g serve
CMD ["serve", "-s", ".", "-l", "80"]
```

---

### **Step 4: Connect Frontend to API**

- Ensure `REACT_APP_API_URL` points to **production WP API URL**.
- CORS: Enable CORS in WordPress if React is on a separate domain:

```php
add_action('init', function() {
    header('Access-Control-Allow-Origin: https://recipes.mortteza.site');
    header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
});
```

---

### **Step 5: Troubleshooting**

| Problem           | Solution                                                          |
| ----------------- | ----------------------------------------------------------------- |
| API calls failing | Check CORS, HTTPS, correct REACT_APP_API_URL                      |
| Build errors      | Ensure node and npm versions match local dev environment          |
| Routing issues    | Use `BrowserRouter` with `basename="/"` or `HashRouter` if needed |

---

## ✅ **Final Notes / Best Practices**

1. **Plugin-local Composer**: keeps production clean, no global PHP composer needed.
2. **.env Management**: only load from root. Use `vlucas/phpdotenv`.
3. **HTTPS & Reverse Proxy**: set `$_SERVER['HTTPS'] = 'on'` if behind a proxy.
4. **Debugging**: enable `WP_DEBUG_LOG` first, then disable for production.
5. **React App**: always build for production and serve static files.
6. **Docker**: make sure ports don’t conflict, and services are reachable by hostname (`db` for MySQL).

---

If you want, I can make a **single one-page PDF-style checklist** with all commands and file paths for **both deployments**, so you can just follow it step by step during production deployment.

Do you want me to do that?
