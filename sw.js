// 배포용 서비스워커 (0.14.0). 새 버전이 오면 바로 교체하고 옛 캐시를 지운다. 글꼴 캐시(tva-fonts)는 버전과 상관없이 남긴다.
const CACHE='tva-b50098dc10';
const FONTS='tva-fonts';
const FILES=["/thai-vedic-astro-site/", "/thai-vedic-astro-site/index.html", "/thai-vedic-astro-site/manifest.webmanifest", "/thai-vedic-astro-site/icons/icon-192.png", "/thai-vedic-astro-site/icons/icon-512.png", "/thai-vedic-astro-site/icons/apple-touch-icon.png", "/thai-vedic-astro-site/icons/maskable-512.png", "/thai-vedic-astro-site/assets/c-2IB2OFU5.js", "/thai-vedic-astro-site/assets/c-3D7RCY3I.js", "/thai-vedic-astro-site/assets/c-4K3ZWSSA.js", "/thai-vedic-astro-site/assets/c-5MEVANQK.js", "/thai-vedic-astro-site/assets/c-62WWI5HG.js", "/thai-vedic-astro-site/assets/c-6S6GDAWV.js", "/thai-vedic-astro-site/assets/c-HQJAUWKK.js", "/thai-vedic-astro-site/assets/c-HSX5Z5HC.js", "/thai-vedic-astro-site/assets/c-RDQ4DCTF.js", "/thai-vedic-astro-site/assets/index-G3CBKW3U.js", "/thai-vedic-astro-site/assets/index-YB35EVKO.css"];
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
