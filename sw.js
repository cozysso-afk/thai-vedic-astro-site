// 배포용 서비스워커 (0.6.0). 새 버전이 오면 바로 교체하고 옛 캐시를 지운다.
const CACHE='tva-58680fcd8d';
const FILES=["/thai-vedic-astro-site/", "/thai-vedic-astro-site/index.html", "/thai-vedic-astro-site/assets/index-G2XTZSXC.js", "/thai-vedic-astro-site/assets/index-OY4CGKYI.css", "/thai-vedic-astro-site/manifest.webmanifest", "/thai-vedic-astro-site/icons/icon-192.png", "/thai-vedic-astro-site/icons/icon-512.png", "/thai-vedic-astro-site/icons/apple-touch-icon.png", "/thai-vedic-astro-site/icons/maskable-512.png"];
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
  const r=e.request;
  if(r.method!=='GET'||new URL(r.url).origin!==location.origin)return;
  if(r.mode==='navigate'){
    e.respondWith(fetch(r).then(res=>{const c=res.clone();caches.open(CACHE).then(x=>x.put('/thai-vedic-astro-site/index.html',c));return res}).catch(()=>caches.match('/thai-vedic-astro-site/index.html')));
    return;
  }
  e.respondWith(caches.match(r).then(hit=>hit||fetch(r)));
});
