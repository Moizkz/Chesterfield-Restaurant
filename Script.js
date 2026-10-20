const menuData=[
{id:1,name:"Dry-Aged Ribeye",price:32,cat:"Mains",img:"Images/menu1.jpg"},
{id:2,name:"Pan-Seared Sea Bass",price:26,cat:"Mains",img:"Images/menu2.jpg"},
{id:3,name:"Classic Fish & Chips",price:18,cat:"Mains",img:"Images/menu3.jpg"},
{id:4,name:"Buratta & Heritage Tomato",price:12,cat:"Starters",img:"Images/menu4.jpg"},
{id:5,name:"Chocolate Fondant",price:9,cat:"Desserts",img:"Images/menu5.jpg"},
{id:6,name:"Chesterfield Wine Selection",price:45,cat:"Wine",img:"Images/menu6.jpg"},
];
const galleryData=[
"Images/dinning.jpg",
"Images/gal2.jpg",
"Images/gal3.jpg",
"Images/gal4.jpg",
"Images/gal5.jpg",
"Images/gal6.jpg"
];
let bookings=JSON.parse(localStorage.getItem('chester_bookings'))||[];

function showPage(id,el){
document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
document.getElementById('page-'+id).classList.add('active');
document.querySelectorAll('nav a').forEach(a=>a.classList.remove('active'));
if(el) el.classList.add('active');
window.scrollTo({top:0,behavior:'smooth'});
document.getElementById('mainNav').classList.remove('open');
}
function renderMenu(list, gridId){
const grid = document.getElementById(gridId);
grid.innerHTML=list.map(m=>`
<div class="prod"><img src="${m.img}" onclick="openLight('${m.img}')"><h4>${m.name}</h4><small style="opacity:.6">${m.cat}</small><div class="price">£${m.price}</div><button class="btn-gold" style="width:100%;margin-top:8px" onclick="toast('${m.name} added')">Add to Order</button></div>
`).join('');
}
function filterMenu(cat,el,gridId,tabsId){
document.querySelectorAll('#'+tabsId+' .tab').forEach(t=>t.classList.remove('active'));el.classList.add('active');
if(cat==='all') renderMenu(menuData, gridId); else renderMenu(menuData.filter(m=>m.cat===cat), gridId);
}
function renderGallery(gridId){
document.getElementById(gridId).innerHTML=galleryData.map(g=>`<img src="${g}" loading="lazy" onclick="openLight('${g}')">`).join('');
}
document.addEventListener('DOMContentLoaded',function(){
    renderGallery('galleryGrid');
    renderGallery('homeGalleryGrid');
});

function openLight(src){document.getElementById('lightImg').src=src;document.getElementById('imgModal').classList.add('active')}
function toast(msg){let t=document.getElementById('toast');t.innerText=msg;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),3000)}
function submitReservation(type){
let prefix = type==='home' ? 'home' : '';
let d=document.getElementById(prefix+'ResDate').value || document.getElementById('resDate').value;
let ti=document.getElementById(prefix+'ResTime') ? document.getElementById(prefix+'ResTime').value : document.getElementById('resTime').value;
let na=document.getElementById(prefix+'ResName').value || document.getElementById('resName').value;
let em=document.getElementById(prefix+'ResEmail').value || document.getElementById('resEmail').value;
if(!d||!na||!em) return toast('Fill date, name, email');
let obj={id:Date.now(),date:d,time:ti,name:na,email:em,guests:document.getElementById(prefix+'ResGuests') ? document.getElementById(prefix+'ResGuests').value : document.getElementById('resGuests').value};
bookings.push(obj);localStorage.setItem('chester_bookings',JSON.stringify(bookings));
renderBookings();toast('Reservation confirmed! #'+obj.id);
}
function renderBookings(){
let html = bookings.slice(-3).map(b=>`<div style="border:1px solid rgba(212,183,143,.15);padding:8px;margin:6px 0">✅ ${b.name} - ${b.date} ${b.time||''} - ${b.guests||''}</div>`).join('');
if(document.getElementById('resList')) document.getElementById('resList').innerHTML=html;
if(document.getElementById('homeResList')) document.getElementById('homeResList').innerHTML=html;
document.getElementById('totalBooks').innerHTML='Bookings: '+bookings.length+' | Visitors: <span id="visCount">1,248</span>';
}
document.getElementById('hamburger').onclick=()=>document.getElementById('mainNav').classList.toggle('open');

// INITIAL RENDER - SAME FOR HOME AND OTHER PAGES
renderMenu(menuData,'menuGrid');
renderMenu(menuData,'homeMenuGrid');
renderGallery('galleryGrid');
renderGallery('homeGalleryGrid');
renderBookings();
let vc=1248;setInterval(()=>{vc+=Math.floor(Math.random()*2); let el=document.getElementById('visCount'); if(el) el.innerText=vc.toLocaleString()},4000);
