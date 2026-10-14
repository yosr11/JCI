import "dotenv/config";
import { createServer } from "node:http";
import nodemailer from "nodemailer";

const port = Number(process.env.PORT || 3001);
const frontendOrigin = process.env.FRONTEND_ORIGIN || "http://localhost:5173";
const recipient = process.env.CONTACT_TO || "jcidarchaabaneelfehri@gmail.com";
const smtpHost = process.env.SMTP_HOST;
const smtpPort = Number(process.env.SMTP_PORT || 465);
const smtpUser = process.env.SMTP_USER;
const smtpPass = process.env.SMTP_PASS;
const smtpSecure = process.env.SMTP_SECURE
  ? process.env.SMTP_SECURE.toLowerCase() === "true"
  : smtpPort === 465;

if (!smtpHost || !smtpUser || !smtpPass) {
  throw new Error(
    "Email service is not configured. Set SMTP_HOST, SMTP_USER, and SMTP_PASS."
  );
}

const transporter = nodemailer.createTransport({
  host: smtpHost,
  port: smtpPort,
  secure: smtpSecure,
  auth: { user: smtpUser, pass: smtpPass },
});

const requestsByIp = new Map();
const rateLimitWindowMs = 15 * 60 * 1000;
const rateLimitMax = 5;

function sendJson(response, status, payload) {
  response.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
  });
  response.end(JSON.stringify(payload));
}

function checkRateLimit(ip) {
  const now = Date.now();
  const timestamps = (requestsByIp.get(ip) || []).filter(
    (timestamp) => now - timestamp < rateLimitWindowMs
  );

  if (timestamps.length >= rateLimitMax) {
    requestsByIp.set(ip, timestamps);
    return false;
  }

  timestamps.push(now);
  requestsByIp.set(ip, timestamps);
  return true;
}

async function readJson(request) {
  const chunks = [];
  let size = 0;

  for await (const chunk of request) {
    size += chunk.length;
    if (size > 10_000) {
      throw new Error("Request is too large.");
    }
    chunks.push(chunk);
  }

  try {
    return JSON.parse(Buffer.concat(chunks).toString("utf8"));
  } catch {
    throw new Error("Request must contain valid JSON.");
  }
}

const server = createServer(async (request, response) => {
  const origin = request.headers.origin;
  if (origin && origin !== frontendOrigin) {
    sendJson(response, 403, { error: "This website is not allowed to send messages." });
    return;
  }

  if (origin) {
    response.setHeader("Access-Control-Allow-Origin", frontendOrigin);
    response.setHeader("Vary", "Origin");
  }

  if (request.method === "OPTIONS") {
    response.writeHead(204, {
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    });
    response.end();
    return;
  }

  const url = new URL(request.url, `http://${request.headers.host || "localhost"}`);
  if (url.pathname !== "/api/contact") {
    sendJson(response, 404, { error: "Not found." });
    return;
  }

  if (request.method !== "POST") {
    sendJson(response, 405, { error: "Method not allowed." });
    return;
  }

  if (!checkRateLimit(request.socket.remoteAddress || "unknown")) {
    sendJson(response, 429, { error: "Too many messages. Please try again later." });
    return;
  }

  try {
    const data = await readJson(request);
    const name = typeof data.name === "string" ? data.name.trim() : "";
    const email = typeof data.email === "string" ? data.email.trim() : "";
    const message = typeof data.message === "string" ? data.message.trim() : "";

    if (data.website) {
      sendJson(response, 400, { error: "Invalid submission." });
      return;
    }

    if (name.length < 2 || name.length > 100) {
      sendJson(response, 400, { error: "Please enter a name between 2 and 100 characters." });
      return;
    }
    if (
      email.length > 254 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {
      sendJson(response, 400, { error: "Please enter a valid email address." });
      return;
    }
    if (message.length < 10 || message.length > 5000) {
      sendJson(response, 400, { error: "Your message must be between 10 and 5000 characters." });
      return;
    }

    await transporter.sendMail({
      from: smtpUser,
      to: recipient,
      replyTo: { name, address: email },
      subject: "New message from the JCI website",
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    });

    sendJson(response, 200, { message: "Message sent successfully." });
  } catch (error) {
    if (error instanceof Error && error.message.startsWith("Request ")) {
      sendJson(response, 400, { error: error.message });
      return;
    }

    console.error("Contact email delivery failed:", error);
    sendJson(response, 502, {
      error: "We could not send your message right now. Please try again later.",
    });
  }
});

server.listen(port, "0.0.0.0", () => {
  console.log(`JCI contact API listening on port ${port}`);
});
