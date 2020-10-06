importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.0.0/workbox-sw.js');

const CACHE_NAME = 'workbox:cross-origin';

const REGEXP_ALL = /.*\.(?:html|js|css|png|jpg|jpeg|svg|gif)/;

workbox.routing.registerRoute(
  REGEXP_ALL,
  workbox.strategies.networkFirst({
    cacheName: `${CACHE_NAME}:network-first`,
  }),
);

self.addEventListener('install', function() {
  self.skipWaiting();
});