/* Cinematic chapter-to-chapter navigation */
(function(){
 const overlay=document.createElement('div');
 overlay.className='page-transition';
 overlay.innerHTML='<div class="transition-wordmark"><div><strong>Yash × Akanksha</strong><span>ONE STORY · MANY MEMORIES</span></div></div>';
 document.body.appendChild(overlay);
 const pageEl=document.querySelector('.page');
 requestAnimationFrame(()=>pageEl&&pageEl.classList.add('page-enter'));
 function go(url){
   if(!url || url[0]==='#' || /^https?:/i.test(url) || /^mailto:/i.test(url)) return;
   document.body.classList.add('leaving');
   overlay.classList.add('active');
   setTimeout(()=>{location.href=url},820);
 }
 document.addEventListener('click',e=>{
   const a=e.target.closest('a[href]');
   if(!a)return;
   const href=a.getAttribute('href');
   if(href && href.endsWith('.html')){e.preventDefault();go(href)}
 });
 window.cinematicGo=go;
})();

const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)],page=document.body.dataset.page,fx=$('#fx');
if(fx){let c=fx,x=c.getContext('2d'),w,h,d=[];function rs(){w=c.width=innerWidth;h=c.height=innerHeight}rs();addEventListener('resize',rs);for(let i=0;i<75;i++)d.push({x:Math.random()*innerWidth,y:Math.random()*innerHeight,s:Math.random()*.4+.1,r:Math.random()*1.3});(function loop(){x.clearRect(0,0,w,h);d.forEach(p=>{p.y-=p.s;if(p.y<0)p.y=h;x.globalAlpha=.15;x.fillStyle='#fff';x.beginPath();x.arc(p.x,p.y,p.r,0,7);x.fill()});requestAnimationFrame(loop)})()}
const audio=$('#bgm')||document.createElement('audio');audio.loop=true;if(!audio.src)audio.src='assets/music.mp3';function sound(){audio.volume=.3;audio.play().catch(()=>{})}$$('[data-sound]').forEach(b=>b.onclick=()=>audio.paused?sound():audio.pause());$('#begin')?.addEventListener('click',()=>{sound();location.href='story.html'});
function burst(){if(!fx)return;let c=fx,x=c.getContext('2d'),a=[];for(let i=0;i<60;i++){let t=Math.random()*7,s=Math.random()*7+2;a.push({x:innerWidth/2,y:innerHeight/2,vx:Math.cos(t)*s,vy:Math.sin(t)*s,l:1})}function f(){x.clearRect(0,0,innerWidth,innerHeight);a.forEach(p=>{p.x+=p.vx;p.y+=p.vy;p.vy+=.1;p.l-=.02;x.globalAlpha=p.l;x.fillStyle=Math.random()>.5?'#ff6f91':'#fff';x.fillRect(p.x,p.y,3,3)});if(a.some(p=>p.l>0))requestAnimationFrame(f)}f()}
if(page==='memories'){
 const stage=$('#memoryStage');
 const baseGroups=window.MEMORY_GROUPS||[];
 let saved={};
 try{saved=JSON.parse(localStorage.getItem('ak_photo_map')||'{}')}catch(e){}
 let active=0, dragging=false,startX=0,startActive=0;
 const allFiles=Array.from({length:12},(_,i)=>String(i+1).padStart(2,'0')+'.jpg');
 const groupList=baseGroups.map(g=>({...g,photos:[]}));
 const byId=Object.fromEntries(groupList.map(g=>[g.id,g]));
 const hasSaved=Object.keys(saved).length>0;
 if(hasSaved){
   allFiles.forEach(f=>{const gid=saved[f]; if(byId[gid]) byId[gid].photos.push(f)});
 } else {
   baseGroups.forEach((g,i)=>groupList[i].photos=[...g.photos]);
 }
 const groups=groupList.filter(g=>g.photos.length);
 const fallbackGroups=groupList;
 const visibleGroups=groups.length?groups:fallbackGroups;

 function imgHTML(file,title){
   return `<img src="assets/photos/${file}" alt="${title}" loading="lazy" onerror="this.classList.add('broken');this.nextElementSibling?.classList.add('show')"><div class="photo-fallback">${file}</div>`;
 }
 function cardHTML(g,index){
   const card=document.createElement('button');
   card.className='memory-card-v2';
   card.type='button';
   const cover=g.photos[0];
   card.innerHTML=`<div class="memory-image">${imgHTML(cover||'01.jpg',g.title)}</div><div class="memory-overlay"></div><div class="memory-meta"><span>${String(index+1).padStart(2,'0')}</span><small>${g.tag}</small><strong>${g.title}</strong><em>${g.photos.length} ${g.photos.length===1?'PHOTO':'PHOTOS'}</em></div>`;
   card.onclick=()=>{active=index;render();openGroup(g)};
   return card;
 }
 function render(){
   stage.innerHTML='';
   if(!visibleGroups.length){stage.innerHTML='<div class="empty-memory"><h2>No memories yet.</h2><p>Open Photo Setup and assign your photos.</p><a class="primary" href="photo-mapping.html">OPEN PHOTO SETUP →</a></div>';return;}
   const count=visibleGroups.length;
   visibleGroups.forEach((g,i)=>{
     const e=cardHTML(g,i);
     let d=i-active;
     if(d>count/2)d-=count;
     if(d<-count/2)d+=count;
     const abs=Math.abs(d);
     const x=d*220;
     const z=-abs*90;
     const scale=d===0?1.08:Math.max(.72,1-abs*.12);
     const opacity=d===0?1:Math.max(.52,1-abs*.12);
     const rotate=d* -7;
     e.style.transform=`translate(-50%,-50%) translate3d(${x}px,0,${z}px) rotateY(${rotate}deg) scale(${scale})`;
     e.style.opacity=opacity;
     e.style.zIndex=100-abs;
     e.setAttribute('aria-label',g.title);
     stage.appendChild(e);
   });
   const current=visibleGroups[active];
   const counter=$('#photoCount');
   if(counter)counter.textContent=`${allFiles.length} PHOTOS · ${visibleGroups.length} MEMORY CHAPTERS · ${current.title}`;
 }
 function openGroup(g){
   const q=$('#detail');
   q.classList.add('open');document.body.classList.add('memory-modal-open');
   q.querySelector('.photo').innerHTML=g.photos.map(f=>`<div class="detail-photo">${imgHTML(f,g.title)}</div>`).join('');
   q.querySelector('small').textContent=g.tag+' · '+g.photos.length+' '+(g.photos.length===1?'PHOTO':'PHOTOS');
   q.querySelector('h2').textContent=g.title;
   q.querySelector('p').textContent=g.desc;
 }
 function move(dir){active=(active+dir+visibleGroups.length)%visibleGroups.length;render();burst()}
 render();
 $('#shuffle').onclick=()=>{active=Math.floor(Math.random()*visibleGroups.length);render();burst()};
 $('#close').onclick=()=>{$('#detail').classList.remove('open');document.body.classList.remove('memory-modal-open')};
 stage.addEventListener('pointerdown',e=>{dragging=true;startX=e.clientX;startActive=active;stage.setPointerCapture?.(e.pointerId)});
 stage.addEventListener('pointerup',e=>{if(!dragging)return;dragging=false;const dx=e.clientX-startX;if(Math.abs(dx)>45){move(dx<0?1:-1)}else{active=startActive;render()}});
 stage.addEventListener('pointercancel',()=>dragging=false);
 document.addEventListener('keydown',e=>{if(page==='memories'){if(e.key==='ArrowRight')move(1);if(e.key==='ArrowLeft')move(-1);if(e.key==='Escape')$('#close')?.click()}});
}
if(page==='machine')$('#generate').onclick=()=>{let m=window.MEMORIES[Math.floor(Math.random()*window.MEMORIES.length)];$('#slot').innerHTML=`<img src="assets/photos/${m[0]}" alt="${m[1]}">`;let cap=$('#caption');if(cap)cap.textContent=m[2];burst()};
if(page==='quiz'){let qs=[['Where was our first date?','Seawoods Mall','Marine Drive','Byculla Zoo','Kala Ghoda',0],['What did Yash make Akanksha do?','Dance in the mall','Sing','Draw','Run',0],['Where did we watch a sunset?','Marine Drive','Ekvira','CST','Ambernath',0],['What did we draw at Ambernath?','Each other’s faces','Hearts','Temples','Cars',0],['Which family event did Yash attend?','Her sister’s Haldi','Diwali','Holi','Navratri',0],['What did we get at Maple?','Free chocolates & snacks','Flowers','Books','Toys',0]];let n=0,score=0,q=$('#quiz');function draw(){if(n===qs.length){q.innerHTML=`<div><small>YOUR RESULT</small><div class="result">${score} / ${qs.length}</div><h1>${score===qs.length?'Okay… you really know us. ♡':'Not bad. We need another long drive.'}</h1><a class="primary" href="birthday.html">CONTINUE →</a></div>`;burst();return}let a=qs[n];q.innerHTML=`<div><small>${n+1} / ${qs.length}</small><h1>${a[0]}</h1><div class="options">${a.slice(1,5).map((v,i)=>`<button class="option" data-i="${i}">${v}</button>`).join('')}</div></div>`;$$('.option').forEach(b=>b.onclick=()=>{if(+b.dataset.i===a[5])score++;n++;draw()})}draw()}
if(page==='birthday'){let n=0;$('#cake').onclick=()=>{n++;if(n>=3){$$('.candle').forEach(e=>e.style.display='none');$('#cakeHint').textContent='Wish made. ♡';$('#bdayMsg').classList.add('show');burst()}}}
if(page==='reasons'){let a=['Your smile can change the mood of an entire room.','You make ordinary days worth remembering.','I love how easily we laugh together.','You are one of the first people I want to tell good news to.','I love our random conversations.','You make long drives feel short.','You make adventures out of simple plans.','I love seeing you happy.','You care deeply about the people close to you.','You make me want to create more memories.','You are beautiful even when you don’t realise it.','I love our silly little traditions.','You turn normal photos into favourite memories.','You make spontaneous decisions memorable.','I can be myself around you.','I love simply having you beside me.','We have places that now mean “us”.','I love every sunset we share.','I love how many stories we already have.','I love that two years still feels like the beginning.','I am proud of the person you are becoming.','Most of all, I love that it’s you.'];let g=$('#reasons');a.forEach((t,i)=>{let e=document.createElement('div');e.className='reason';e.innerHTML=`<i>${String(i+1).padStart(2,'0')}</i><p>${t}</p>`;e.onclick=()=>{e.classList.toggle('open');burst()};g.append(e)})}
if(page==='letter')$('#open').onclick=()=>{$('#envelope').classList.add('hidden');$('#letter').classList.add('open');setTimeout(()=>{$('#letterNext').classList.remove('hidden')},700);burst()};
if(page==='final'){let s=$('#stars');for(let i=0;i<180;i++){let e=document.createElement('i');e.className='star';e.style.left=Math.random()*100+'%';e.style.top=Math.random()*100+'%';e.style.animationDelay=Math.random()*2+'s';s.append(e)}let n=0;$('#secret').onclick=()=>{n++;if(n>=5){let d=document.createElement('div');d.style='position:fixed;inset:0;z-index:40;background:#050507f7;display:grid;place-items:center;text-align:center;padding:30px';d.innerHTML='<div><small>YOU FOUND IT</small><h1 style="font:55px Playfair Display">One more little promise.</h1><p style="color:#999;line-height:1.8">I will keep choosing the road that leads back to you.<br>Even when we don’t know where it goes.</p><button class="primary" onclick="this.parentElement.parentElement.remove()">KEEP THIS SECRET ♡</button></div>';document.body.append(d)}}}
