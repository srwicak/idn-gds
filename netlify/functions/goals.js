// Netlify Function: shared Monthly + Weekly goals storage
// GET  -> returns the current goals config (public, read-only)
// POST -> saves goals config (requires admin password in body)
//
// Storage: Netlify Blobs (no setup needed, built into Netlify)

import { getStore } from "@netlify/blobs";

// ============================================================
//  GANTI PASSWORD INI sebelum/ sesudah deploy.
//  Cara lebih aman: set Environment Variable di Netlify
//  dengan nama ADMIN_PASSWORD, nanti otomatis kepakai.
// ============================================================
// const FALLBACK_PASSWORD = "ganti-password-ini";

const STORE_NAME = "glocal-scrum";
const KEY = "goals-config";

export default async (request) => {
  const store = getStore(STORE_NAME);
  const adminPassword = process.env.ADMIN_PASSWORD;

  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };

  if (request.method === "OPTIONS") {
    return new Response("", { status: 204, headers });
  }

  if (request.method === "GET") {
    let data = await store.get(KEY, { type: "json" });
    if (!data) {
      data = { monthly: [], weekly: [], projects: [], updatedAt: null };
    }
    return new Response(JSON.stringify(data), { status: 200, headers });
  }

  if (request.method === "POST") {
    let body;
    try {
      body = await request.json();
    } catch {
      return new Response(JSON.stringify({ error: "invalid json" }), { status: 400, headers });
    }

    if (!body || body.password !== adminPassword) {
      return new Response(JSON.stringify({ error: "unauthorized" }), { status: 401, headers });
    }

    const config = {
      monthly: Array.isArray(body.monthly) ? body.monthly : [],
      weekly: Array.isArray(body.weekly) ? body.weekly : [],
      projects: Array.isArray(body.projects) ? body.projects : [],
      updatedAt: new Date().toISOString(),
    };

    await store.setJSON(KEY, config);
    return new Response(JSON.stringify({ ok: true, config }), { status: 200, headers });
  }

  return new Response(JSON.stringify({ error: "method not allowed" }), { status: 405, headers });
};

export const config = {
  path: "/api/goals",
};
