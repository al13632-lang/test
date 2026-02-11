# Guía de Despliegue - RestoraOS

Para que tu cliente pueda probar la aplicación en la web (fuera de tu computadora), sigue estos pasos para desplegarla en **Vercel**.

## 1. Preparar el Repositorio
Sube el código a GitHub:
1. Crea un repositorio nuevo en GitHub (privado o público).
2. En tu terminal:
```bash
git init
git add .
git commit -m "Initial commit RestoraOS"
git remote add origin https://github.com/TU_USUARIO/restora-os.git
git push -u origin main
```

## 2. Configurar Supabase (Base de Datos)
1. Crea un proyecto en [Supabase](https://supabase.com).
2. Ve al **SQL Editor** y pega el contenido del archivo `supabase/migrations/initial_schema.sql` (esto crea todas las tablas y el RLS).
3. En **Project Settings > API**, obtén tu `URL` y `Anon Key`.

## 3. Configurar Stripe (Pagos)
1. Crea una cuenta en [Stripe](https://stripe.com) y activa el **Test Mode**.
2. Crea tus productos/precios para los 3 planes (Básico, Pro, Premium).
3. Obtén tu `Secret Key` (sk_test_...).
4. (Opcional) Configura un Webhook en Stripe apuntando a `https://TU_DOMINIO_VERCEL.com/api/webhooks/stripe`.

## 4. Desplegar en Vercel
1. Conecta tu cuenta de GitHub a [Vercel](https://vercel.com).
2. Selecciona el repositorio `restora-os`.
3. **CRÍTICO**: Agrega las Variables de Entorno (Environment Variables):
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `STRIPE_SECRET_KEY`
   - `STRIPE_WEBHOOK_SECRET`
   - `NEXT_PUBLIC_APP_URL` (la URL que te asigne Vercel)
4. Haz clic en **Deploy**.

## 5. Enviárselo a tu Cliente
Una vez que Vercel termine, te dará una URL tipo `https://restora-os.vercel.app`. 🎉

**¡Ese es el link que le enviarás a tu cliente!**
