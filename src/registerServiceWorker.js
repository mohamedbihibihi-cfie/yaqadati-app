const LOCAL_HOSTS = new Set(["localhost", "127.0.0.1"]);

function canRegisterServiceWorker() {
  return (
    "serviceWorker" in navigator &&
    (window.location.protocol === "https:" || LOCAL_HOSTS.has(window.location.hostname))
  );
}

function getRuntimeCacheUrls() {
  const urls = new Set(["/", "/index.html", "/manifest.webmanifest"]);

  for (const entry of performance.getEntriesByType("resource")) {
    try {
      const url = new URL(entry.name);
      const isOptionalHeavyAsset =
        url.pathname.startsWith("/assets/visuals/") || url.pathname.startsWith("/assets/audio/");

      if (url.origin === window.location.origin && !isOptionalHeavyAsset) {
        urls.add(url.pathname + url.search);
      }
    } catch {
      // Ignore browser-specific resource entries that are not valid URLs.
    }
  }

  return Array.from(urls);
}

if (canRegisterServiceWorker()) {
  window.addEventListener("load", async () => {
    try {
      const registration = await navigator.serviceWorker.register("/service-worker.js");
      const readyRegistration = await navigator.serviceWorker.ready;
      const activeWorker = readyRegistration.active ?? registration.active;

      activeWorker?.postMessage({
        type: "CACHE_RUNTIME_URLS",
        urls: getRuntimeCacheUrls(),
      });
    } catch (error) {
      console.warn("Yaqadati service worker registration failed.", error);
    }
  });
}
