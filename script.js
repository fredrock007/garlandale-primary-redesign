
(()=>{'use strict';
const $=(s,root=document)=>root.querySelector(s);
const $$=(s,root=document)=>Array.from(root.querySelectorAll(s));
const menu=$('.menu-toggle'),nav=$('#main-nav');
if(menu&&nav){
  menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')==='true';menu.setAttribute('aria-expanded',String(!open));nav.classList.toggle('open',!open)});
  nav.addEventListener('click',e=>{if(e.target.closest('a,button')){nav.classList.remove('open');menu.setAttribute('aria-expanded','false')}});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'){nav.classList.remove('open');menu.setAttribute('aria-expanded','false');document.querySelector('dialog[open]')?.close()}});
}
const dialog=$('#staff-dialog'),open=$('#open-staff'),close=$('#close-staff'),done=$('#staff-done');
if(dialog){open?.addEventListener('click',()=>dialog.showModal());close?.addEventListener('click',()=>dialog.close());done?.addEventListener('click',()=>dialog.close());dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close()});}
const observer=('IntersectionObserver' in window)&&!matchMedia('(prefers-reduced-motion: reduce)').matches?new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target);}})},{threshold:.12,rootMargin:'0px 0px 30px 0px'}):null;
$$('.reveal').forEach(el=>observer?observer.observe(el):el.classList.add('visible'));
$$('.page-hero,.hero').forEach(hero=>{hero.addEventListener('pointermove',e=>{const r=hero.getBoundingClientRect(); hero.style.setProperty('--mx', ((e.clientX-r.left)/r.width*100)+'%'); hero.style.setProperty('--my', ((e.clientY-r.top)/r.height*100)+'%');});});
const active=document.body.dataset.page; if(active){ $$('[data-nav]').forEach(el=>{if(el.dataset.nav===active) el.classList.add('is-active');}); }

const STORAGE='garlandale_demo_restored_20261118_v10';
const OLD_STORAGE='garlandale_demo_content_v1';
const defaults={
  announcements:[
    {title:'Welcome to the Garlandale concept website', summary:'This announcements area demonstrates how school notices can be published for parents and families.', date:'2026-11-18', audience:'Whole School'},
    {title:'Reading month spotlight', summary:'A future site could highlight literacy activities, reading drives and important school reminders.', date:'2026-11-12', audience:'Foundation & Intermediate Phase'}
  ],
  events:[
    {title:'Example parent information meeting (not scheduled)', date:'', time:'Time to be confirmed', location:'Venue to be confirmed', summary:'Sample calendar entry for demonstration only. This is not a confirmed Garlandale event.'},
    {title:'Example school celebration (not scheduled)', date:'', time:'Time to be confirmed', location:'Venue to be confirmed', summary:'Sample event demonstrating how school dates could appear once officially supplied.'}
  ],
  documents:[
    {title:'Admissions Information', type:'PDF', note:'A clear place for enrolment guidance, forms and requirements.', link:'#'},
    {title:'School Policies', type:'PDF', note:'Policies and circulars could be made easier to find and download.', link:'#'},
    {title:'Family Information Pack', type:'DOC', note:'An example of a downloadable resource for parents.', link:'#'}
  ],
  gallery:[
    {title:'Garlandale learners · June 2024', caption:'An actual Garlandale Primary School photograph, shared on the school’s Facebook page on 3 June 2024.', image:'garlandale-photo-wide.jpg', credit:'Garlandale Primary School · Public Facebook photo · Reuse requires permission.', source:'https://www.facebook.com/photo.php?fbid=778946174304823', sourceLabel:'View original Facebook photo'},
    {title:'Garlandale school banner', caption:'The banner from Garlandale Primary School’s published WordPress website; it loads when internet access and image-hosting permissions allow.', image:'https://garlandaleprimary.wordpress.com/wp-content/uploads/2016/02/garlandale_primary_banner-1.jpg?w=700', credit:'Garlandale Primary School · Current WordPress site · Online reference.', source:'https://garlandaleprimary.wordpress.com/', sourceLabel:'Visit original school website'},
    {title:'New library · October 2026', caption:'The school’s renovated library was featured in Athlone News. The source article contains photographs of the renovated library and computer laboratory. Open the story to see them.', image:'', story:true, motif:'library', credit:'Athlone News · 28 October 2026 · Genuine school photos available in the linked article.', source:'https://athlonenews.co.za/news/2026-10-28-garlandale-primary-school-unveils-renovated-library/', sourceLabel:'Read library renovation article'},
    {title:'Digital learning improvements · 2026', caption:'A welcoming computer and digital learning space. Athlone News reports that Garlandale received smartboards and 20 donated computers for its IT laboratory.', image:'garlandale-digital-learning.jpg', credit:'Facility photograph supplied for this concept preview; publication permission and attribution to be confirmed.', source:'https://athlonenews.co.za/news/2026-10-28-garlandale-primary-school-unveils-renovated-library/', sourceLabel:'Read technology improvements report'},
    {title:'Wisdom Builds · School crest', caption:'The school’s distinctive crest and motto, displayed as part of this independent redesign concept.', image:'garlandale-school-crest.png', credit:'Garlandale Primary School · Crest supplied for concept preview.'}
  ]};
const clone=o=>JSON.parse(JSON.stringify(o));
function getData(){
 try{
   const raw=localStorage.getItem(STORAGE);
   if(raw) return JSON.parse(raw);
   return clone(defaults);
 }catch(e){return clone(defaults);}
}
function saveData(data){ localStorage.setItem(STORAGE, JSON.stringify(data)); }
function resetData(){ localStorage.removeItem(STORAGE); return clone(defaults); }
window.GarlandaleDemo={getData,saveData,resetData,defaults};

function esc(s=''){return String(s).replace(/[&<>"']/g,m=>({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[m]));}
function fmtDate(d){ if(!d) return 'Date to be confirmed'; const dt=new Date(d+'T00:00:00'); return isNaN(dt)?d:dt.toLocaleDateString('en-ZA',{day:'numeric',month:'long',year:'numeric'}); }
function renderAnnouncements(){ const host=$('#announcements-list'); if(!host) return; const data=getData().announcements; host.innerHTML=data.map(item=>`<li><span class="chip">${esc(item.audience||'School Notice')}</span><h4 style="margin:12px 0 8px;font:400 28px/1.08 var(--serif)">${esc(item.title)}</h4><p class="muted" style="margin:0 0 10px">${esc(item.summary||'')}</p><small style="color:#6f8298;font-weight:700;letter-spacing:.09em;text-transform:uppercase">${fmtDate(item.date)}</small></li>`).join(''); }
function renderEvents(){ const host=$('#events-list'); if(!host) return; const data=getData().events; host.innerHTML=data.map(item=>`<article><div class="event-meta"><span>${fmtDate(item.date)}</span><span>${esc(item.time||'')}</span><span>${esc(item.location||'')}</span></div><h3>${esc(item.title)}</h3><p class="muted" style="margin:0">${esc(item.summary||'')}</p></article>`).join(''); }
function renderDocuments(){
 const host=$('#documents-list'); if(!host) return;
 const data=getData().documents;
 host.innerHTML=data.map((item,i)=>`<article class="document-card paper-document" tabindex="0"><div class="paper-visual" aria-hidden="true"><span class="paper-sheet paper-back"></span><span class="paper-sheet paper-middle"></span><span class="paper-sheet paper-front"><span class="paper-fold"></span><span class="paper-headline"></span><span class="paper-line"></span><span class="paper-line short"></span><span class="paper-line"></span><span class="paper-line medium"></span><span class="paper-stamp">${esc(item.type||'FILE')}</span></span><span class="paper-sparkle">✦</span></div><div class="document-content"><div class="document-meta"><span>${esc(item.type||'File')}</span><span>${item.link&&item.link!=='#'?'Resource link':'Sample entry'}</span></div><h3>${esc(item.title)}</h3><p>${esc(item.note||'')}</p>${item.link&&item.link!=='#'?`<a class="text-link" href="${esc(item.link)}" target="_blank" rel="noopener noreferrer">Open resource <span aria-hidden="true">↗</span></a>`:`<span class="muted">Document to be provided by the school</span>`}</div></article>`).join('');
}
function renderGallery(){ const host=$('#gallery-list'); if(!host)return; const data=getData().gallery;
 host.innerHTML=data.map(item=>{const story=!!item.story;
 const frame=story?`<a class="gallery-story-art story-${esc(item.motif||'library')}" href="${esc(item.source||'#')}" target="_blank" rel="noopener noreferrer" aria-label="${esc(item.sourceLabel||'Read published source')}"><span class="story-glyph" aria-hidden="true">${item.motif==='excursion'?'⌁':item.motif==='community'?'✦':'▤'}</span><span class="story-art-caption">${esc(item.sourceLabel||'Read published story')} ↗</span></a>`
 :`<div class="gallery-frame"><img src="${esc(item.image||'garlandale-school-crest.png')}" alt="${esc(item.title)}" loading="lazy" onerror="this.onerror=null;this.src='garlandale-school-crest.png'"></div>`;
 return `<article class="gallery-card">${frame}<div class="gallery-copy"><h3>${esc(item.title)}</h3><p>${esc(item.caption||'')}</p><small class="image-credit">${esc(item.credit||'')}</small>${item.source?`<a class="gallery-source" href="${esc(item.source)}" target="_blank" rel="noopener noreferrer">${esc(item.sourceLabel||'View source')} ↗</a>`:''}</div></article>`;}).join('');}

function renderStats(){ const data=getData(); $('#stat-ann')?.replaceChildren(); const pairs=[['Announcements',data.announcements.length],['Events',data.events.length],['Documents',data.documents.length],['Gallery Items',data.gallery.length]]; const host=$('#stat-grid'); if(host) host.innerHTML=pairs.map(([label,num])=>`<article class="stat-card"><span class="chip">${label}</span><b>${num}</b></article>`).join(''); }
function bindDashboard(){
  if(document.body.dataset.dashboard==='true' && sessionStorage.getItem('garlandale_demo_staff_session')!=='yes'){ location.replace('staff-login.html'); return; }
  $('#demo-logout')?.addEventListener('click',()=>{sessionStorage.removeItem('garlandale_demo_staff_session'); location.href='staff-login.html';});
  const login=$('#login-form'); if(login){
    login.addEventListener('submit',e=>{e.preventDefault(); const u=$('#demo-user').value.trim(); const p=$('#demo-pass').value.trim(); const msg=$('#login-message'); if(u.toLowerCase()==='staff' && p==='demo123'){ sessionStorage.setItem('garlandale_demo_staff_session','yes'); msg.className='notice success'; msg.textContent='Login successful. Opening the staff dashboard…'; setTimeout(()=>location.href='staff-demo.html',500);} else { msg.className='notice warning'; msg.textContent='Use the demo login: staff / demo123'; }});
  }
  const forms=[
    {id:'announcement-form', key:'announcements', fields:['title','summary','date','audience']},
    {id:'event-form', key:'events', fields:['title','date','time','location','summary']},
    {id:'document-form', key:'documents', fields:['title','type','note','link']},
    {id:'gallery-form', key:'gallery', fields:['title','caption','image','credit']}
  ];
  forms.forEach(cfg=>{ const form=$('#'+cfg.id); if(!form) return; form.addEventListener('submit',e=>{e.preventDefault(); const data=getData(); const item={}; cfg.fields.forEach(name=> item[name]=form.elements[name].value.trim()); data[cfg.key].unshift(item); saveData(data); form.reset(); refreshAll(); const flash=$('#dashboard-message'); if(flash){ flash.className='notice success'; flash.textContent='Saved to the concept website preview.'; } }); });
  $('#reset-demo')?.addEventListener('click',()=>{ if(confirm('Reset the concept website content to its default demo data?')){ saveData(resetData()); refreshAll(); const flash=$('#dashboard-message'); if(flash){ flash.className='notice warning'; flash.textContent='Demo content has been reset.'; } } });
}
function renderDashboardPreview(){
  const data=getData();
  const ann=$('#dashboard-announcements'); if(ann) ann.innerHTML=data.announcements.slice(0,4).map(item=>`<li><strong>${esc(item.title)}</strong><br><small>${fmtDate(item.date)}</small></li>`).join('');
  const ev=$('#dashboard-events'); if(ev) ev.innerHTML=data.events.slice(0,4).map(item=>`<li><strong>${esc(item.title)}</strong><br><small>${fmtDate(item.date)} · ${esc(item.time||'')}</small></li>`).join('');
}

function initMonthCalendar(){
 const host=$('#month-days'), heading=$('#month-calendar-heading'); if(!host||!heading)return;
 const today=new Date();let year=today.getFullYear(),month=today.getMonth(),selection=null;
 const labels=['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
 function ymd(y,m,d){return `${y}-${String(m+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;}
 function showDay(date){
   selection=date;
   const items=getData().events.filter(item=>item.date===date);
   const label=$('#month-selection-message'), panel=$('#month-day-events');
   const [yy,mm,dd]=date.split('-').map(Number);
   const readable=new Date(yy,mm-1,dd).toLocaleDateString('en-ZA',{weekday:'long',day:'numeric',month:'long',year:'numeric'});
   label.textContent=readable;
   if(items.length){panel.innerHTML=items.map(item=>`<article><strong>${esc(item.title)}</strong><p>${esc(item.time||'')} · ${esc(item.location||'')}</p><p>${esc(item.summary||'')}</p></article>`).join('');}
   else panel.innerHTML='<p>No events are listed for this date. Add a dated event using the Staff Dashboard to see it here.</p>';
   host.querySelectorAll('.month-day').forEach(btn=>btn.setAttribute('aria-pressed',String(btn.dataset.date===selection)));
 }
 function renderMonth(){
  const first=new Date(year,month,1),last=new Date(year,month+1,0),offset=(first.getDay()+6)%7;
  heading.textContent=first.toLocaleDateString('en-ZA',{month:'long',year:'numeric'});
  const dates=new Set(getData().events.filter(e=>/^\d{4}-\d{2}-\d{2}$/.test(e.date||'')).map(e=>e.date));
  host.replaceChildren();
  labels.forEach(label=>{const span=document.createElement('div');span.className='month-weekday';span.textContent=label;span.setAttribute('role','columnheader');host.append(span)});
  for(let i=0;i<offset;i++){const pad=document.createElement('span');pad.className='month-blank';host.append(pad)}
  for(let d=1;d<=last.getDate();d++){
   const date=ymd(year,month,d),day=new Date(year,month,d).getDay();
   const button=document.createElement('button');button.type='button';button.className='month-day';button.dataset.date=date;
   if(day===0||day===6)button.classList.add('weekend');
   if(d===today.getDate()&&month===today.getMonth()&&year===today.getFullYear())button.classList.add('is-today');
   if(dates.has(date))button.classList.add('has-event');
   button.setAttribute('aria-label',date+(dates.has(date)?', school event':''));
   button.setAttribute('aria-pressed',String(date===selection));
   button.innerHTML=`<span>${d}</span>${dates.has(date)?'<i class="date-dot" aria-hidden="true"></i>':''}`;
   button.addEventListener('click',()=>showDay(date));host.append(button);
  }
  if(selection&&selection.startsWith(`${year}-${String(month+1).padStart(2,'0')}-`))showDay(selection);
  else{selection=null;$('#month-selection-message').textContent='Select a date to see its events';$('#month-day-events').innerHTML='';}
 }
 $('#month-prev').addEventListener('click',()=>{month--;if(month<0){month=11;year--;}renderMonth()});
 $('#month-next').addEventListener('click',()=>{month++;if(month>11){month=0;year++;}renderMonth()});
 $('#month-today').addEventListener('click',()=>{month=today.getMonth();year=today.getFullYear();renderMonth();showDay(ymd(year,month,today.getDate()))});
 renderMonth();
 window.addEventListener('storage',e=>{if(e.key&&e.key.startsWith('garlandale_demo_content'))renderMonth()});
}
function refreshAll(){ renderAnnouncements(); renderEvents(); renderDocuments(); renderGallery(); renderStats(); renderDashboardPreview(); }
refreshAll(); bindDashboard(); initMonthCalendar();
})();
