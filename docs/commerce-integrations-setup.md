# Commerce integrations setup

## Local environment

Copy `.env.example` to `.env.local` and fill in each value. Never expose `SUPABASE_SERVICE_ROLE_KEY` or `PAYSTACK_SECRET_KEY` to browser code or commit them.

## Create the order tables

Run the SQL in `supabase/migrations/202609270001_orders.sql` in the Supabase SQL Editor. The server uses the service role key for order writes; row-level security allows signed-in customers to read only their own orders.

## Supabase Auth dashboard

In **Authentication → URL Configuration**, set the site URL to your deployed storefront and add these redirect URLs:

- `http://localhost:3000/**`
- `https://your-domain.com/**`

In **Authentication → Email Templates**, set the **Confirm signup** and **Reset Password** email bodies to use the OTP variable `{{ .Token }}` (rather than only a confirmation link), since the storefront presents a code-entry step. The templates can use this simple content:

```html
<h2>Your FASCO verification code</h2>
<p>Enter this code on the FASCO website to continue:</p>
<p style="font-size:28px;font-weight:bold;letter-spacing:6px">{{ .Token }}</p>
<p>If you didn’t request this, you can ignore this email.</p>
```

To support Google sign-in, enable Google under **Authentication → Providers** and configure the OAuth client credentials and Supabase callback URL shown by the dashboard.

## Paystack dashboard

Configure the webhook URL for the same mode as the secret key in `.env.local`:

```text
https://your-domain.com/api/webhooks/paystack
```

Use the test secret key and Paystack test checkout credentials while validating the flow. The webhook handler checks Paystack’s HMAC SHA512 signature, then verifies the transaction and checks the amount, currency, reference, and customer email against the saved order.

## Order confirmation email

Transactional email delivery is not connected yet. Successful payments are verified and orders are saved, but customers do not receive an automatic email confirmation. Add a verified email provider and sender domain before enabling order emails in production.
