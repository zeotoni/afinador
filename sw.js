const CACHE = 'afination-v4';

const ARQUIVOS = [
  '/',
  '/index.html',
  '/manifest.json',

  // CSS
  '/app/css/reset.css',
  '/app/css/style.css',

  // JS
  '/app/js/app.js',
  '/app/js/audio.js',
  '/app/js/display.js',
  '/app/js/indicator.js',
  '/app/js/note.js',
  '/app/js/pitch.js',
  '/app/js/vendor/pitchy.js',

  // Imagens
  '/app/images/logo.webp',

  // Ícones
  '/app/icons/icon-192.png',
  '/app/icons/icon-512.png',
  '/app/icons/apple-touch-icon.png',
  '/app/icons/favicon.svg',
  '/app/icons/favicon.ico',
  '/app/icons/favicon-96x96.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ARQUIVOS)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET' || !req.url.startsWith('http')) return;

  e.respondWith(
    fetch(req)
      .then(res => {
        const copia = res.clone();
        caches.open(CACHE).then(c => c.put(req, copia));
        return res;
      })
      .catch(() => caches.match(req))
  );
});