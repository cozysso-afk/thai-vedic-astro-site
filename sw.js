// 배포용 서비스워커 (0.13.0). 새 버전이 오면 바로 교체하고 옛 캐시를 지운다. 글꼴 캐시(tva-fonts)는 버전과 상관없이 남긴다.
const CACHE='tva-6c4bb4beef';
const FONTS='tva-fonts';
const FILES=["/thai-vedic-astro-site/", "/thai-vedic-astro-site/index.html", "/thai-vedic-astro-site/manifest.webmanifest", "/thai-vedic-astro-site/icons/icon-192.png", "/thai-vedic-astro-site/icons/icon-512.png", "/thai-vedic-astro-site/icons/apple-touch-icon.png", "/thai-vedic-astro-site/icons/maskable-512.png", "/thai-vedic-astro-site/assets/c-2ZEBKLZI.js", "/thai-vedic-astro-site/assets/c-3SVKPTSB.js", "/thai-vedic-astro-site/assets/c-4K3ZWSSA.js", "/thai-vedic-astro-site/assets/c-62IULGTW.js", "/thai-vedic-astro-site/assets/c-BMQ75AHR.js", "/thai-vedic-astro-site/assets/c-FADEZ2DX.js", "/thai-vedic-astro-site/assets/c-HSX5Z5HC.js", "/thai-vedic-astro-site/assets/c-RDQ4DCTF.js", "/thai-vedic-astro-site/assets/c-ZHKRY6XV.js", "/thai-vedic-astro-site/assets/index-ERD25BC7.js", "/thai-vedic-astro-site/assets/index-VIAFAFUU.css"];
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE&&k!==FONTS).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
  const r=e.request;
  if(r.method!=='GET')return;
  const u=new URL(r.url);
  if(u.origin==='https://cdn.jsdelivr.net'){
    e.respondWith(caches.open(FONTS).then(c=>c.match(r).then(hit=>hit||fetch(r).then(res=>{if(res.ok||res.type==='opaque')c.put(r,res.clone());return res}))));
    return;
  }
  if(u.origin!==location.origin)return;
  if(r.mode==='navigate'){
    e.respondWith(fetch(r).then(res=>{const c=res.clone();caches.open(CACHE).then(x=>x.put('/thai-vedic-astro-site/index.html',c));return res}).catch(()=>caches.match('/thai-vedic-astro-site/index.html')));
    return;
  }
  e.respondWith(caches.match(r).then(hit=>hit||fetch(r)));
});
