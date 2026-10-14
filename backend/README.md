# JCI contact email API

The contact form posts to `/api/contact`. This Node.js API sends the message to
`CONTACT_TO` through the configured SMTP account. The submitted address is set
as the reply-to address, so JCI can reply directly to the sender.

## Local setup

1. Copy `.env.example` to `.env`.
2. Set `SMTP_USER` and `SMTP_PASS` to an SMTP account and password. For Gmail,
   use a Google App Password rather than the account password.
3. Install and run the API:

   ```sh
   npm install
   npm start
   ```

4. In a separate terminal, run the frontend with `npm run dev` from `frontend`.
   Vite proxies `/api` requests to `http://localhost:3001`.

Never commit `.env` or expose SMTP credentials in frontend environment variables.
In production, run this API on a Node.js host and route `/api/contact` to it.
If the frontend and API use different origins, set `VITE_CONTACT_API_URL` to
the API's full `/api/contact` URL and set `FRONTEND_ORIGIN` on the API to the
frontend's exact origin.
