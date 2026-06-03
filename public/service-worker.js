const CACHE_VERSION = "yaqadati-v1-pwa-2026-06-03";
const APP_CACHE = `${CACHE_VERSION}-app`;
const APP_SHELL = [
  "/",
  "/index.html",
  "/manifest.webmanifest",
  "/assets/icons/icon-192.png",
  "/assets/icons/icon-512.png",
  "/assets/icons/icon-maskable-512.png",
];

const OPTIONAL_HEAVY_ASSET_PREFIXES = ["/assets/visuals/", "/assets/audio/"];

function isSameOrigin(url) {
  return url.origin === self.location.origin;
}

function isOptionalHeavyAsset(pathname) {
  return OPTIONAL_HEAVY_ASSET_PREFIXES.some((prefix) => pathname.startsWith(prefix));
}

async function cacheAppShell() {
  const cache = await caches.open(APP_CACHE);

  await Promise.all(
    APP_SHELL.map(async (url) => {
      try {
        const response = await fetch(url, { cache: "reload" });
        if (response.ok) {
          await cache.put(url, response);
        }
      } catch {
        // Cache installation is best-effort so local development never blocks the app.
      }
    }),
  );
}

async function cacheRuntimeUrls(urls) {
  const cache = await caches.open(APP_CACHE);

  await Promise.all(
    urls.map(async (url) => {
      try {
        const runtimeUrl = new URL(url, self.location.origin);
        if (!isSameOrigin(runtimeUrl) || isOptionalHeavyAsset(runtimeUrl.pathname)) {
          return;
        }

        const response = await fetch(runtimeUrl.href);
        if (response.ok) {
          await cache.put(runtimeUrl.href, response);
        }
      } catch {
        // Runtime caching should never interrupt the validated classroom flow.
      }
    }),
  );
}

async function navigationResponse(request) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(APP_CACHE);
      await cache.put("/index.html", response.clone());
    }
    return response;
  } catch {
    return (await caches.match("/index.html")) || (await caches.match("/"));
  }
}

async function cacheFirstResponse(request) {
  const cachedResponse = await caches.match(request);
  if (cachedResponse) {
    return cachedResponse;
  }

  const response = await fetch(request);
  if (response.ok) {
    const cache = await caches.open(APP_CACHE);
    await cache.put(request, response.clone());
  }
  return response;
}

self.addEventListener("install", (event) => {
  event.waitUntil(cacheAppShell());
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) =>
        Promise.all(
          cacheNames
            .filter((cacheName) => cacheName !== APP_CACHE)
            .map((cacheName) => caches.delete(cacheName)),
        ),
      )
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("message", (event) => {
  if (event.data?.type === "CACHE_RUNTIME_URLS" && Array.isArray(event.data.urls)) {
    event.waitUntil(cacheRuntimeUrls(event.data.urls));
  }
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") {
    return;
  }

  const requestUrl = new URL(request.url);
  if (!isSameOrigin(requestUrl)) {
    return;
  }

  if (isOptionalHeavyAsset(requestUrl.pathname)) {
    event.respondWith(fetch(request));
    return;
  }

  if (request.mode === "navigate") {
    event.respondWith(navigationResponse(request));
    return;
  }

  event.respondWith(cacheFirstResponse(request));
});
