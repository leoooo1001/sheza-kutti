/* EDIT HERE: Set Sheza's birthday date/time and, if wanted, replace asset paths in index.html. */
const settings = {
  birthdayDate: '2026-04-18T00:00:00+05:30', // YYYY-MM-DDTHH:mm:ss+05:30
  name: 'Sheza Fathima',
};

const $ = (id) => document.getElementById(id);
function updateClock() {
  const target = new Date(settings.birthdayDate).getTime();
  let left = Math.max(0, target - Date.now());
  const values = [Math.floor(left / 86400000), Math.floor(left / 3600000) % 24, Math.floor(left / 60000) % 60, Math.floor(left / 1000) % 60];
  ['days', 'hours', 'minutes', 'seconds'].forEach((id, i) => $(id).textContent = String(values[i]).padStart(2, '0'));
}
updateClock(); setInterval(updateClock, 1000);

const audio = $('bgMusic'); const sound = document.querySelector('.sound-toggle');
sound.addEventListener('click', async () => {
  if (audio.paused) { try { await audio.play(); sound.querySelector('em').textContent = 'Pause'; sound.setAttribute('aria-label','Pause background music'); } catch(e) {} }
  else { audio.pause(); sound.querySelector('em').textContent = 'Sound'; sound.setAttribute('aria-label','Play background music'); }
});

const canvas = $('scratchCanvas'), wrap = $('scratchWrap'), ctx = canvas.getContext('2d'); let drawing = false, revealed = false;
function paintCover(){ const r=wrap.getBoundingClientRect(), d=devicePixelRatio||1; canvas.width=r.width*d;canvas.height=r.height*d;ctx.scale(d,d); const g=ctx.createLinearGradient(0,0,r.width,r.height);g.addColorStop(0,'#d99a71');g.addColorStop(.5,'#9a4860');g.addColorStop(1,'#613149');ctx.fillStyle=g;ctx.fillRect(0,0,r.width,r.height);ctx.fillStyle='rgba(255,255,255,.35)';for(let i=0;i<85;i++){ctx.beginPath();ctx.arc(Math.random()*r.width,Math.random()*r.height,Math.random()*1.8+.4,0,Math.PI*2);ctx.fill()} }
function point(e){const r=canvas.getBoundingClientRect(), p=e.touches?e.touches[0]:e;return{x:p.clientX-r.left,y:p.clientY-r.top}}
function scratch(e){if(!drawing||revealed)return;e.preventDefault();const p=point(e);ctx.globalCompositeOperation='destination-out';ctx.beginPath();ctx.arc(p.x,p.y,24,0,Math.PI*2);ctx.fill();checkReveal()}
function checkReveal(){const data=ctx.getImageData(0,0,canvas.width,canvas.height).data;let clear=0;for(let i=3;i<data.length;i+=32)if(data[i]<30)clear++;if(clear/(data.length/32)>.35){revealed=true;canvas.style.transition='opacity .7s';canvas.style.opacity='0';document.querySelector('.scratch-label').style.opacity='0';burst(26)}}
canvas.addEventListener('pointerdown',e=>{drawing=true;canvas.setPointerCapture(e.pointerId);scratch(e)});canvas.addEventListener('pointermove',scratch);canvas.addEventListener('pointerup',()=>drawing=false);canvas.addEventListener('pointercancel',()=>drawing=false);paintCover();addEventListener('resize',paintCover);

function burst(count=20){const layer=document.querySelector('.petal-layer');for(let i=0;i<count;i++){const p=document.createElement('i');p.className='petal';p.style.left=Math.random()*100+'vw';p.style.setProperty('--drift',(Math.random()*240-120)+'px');p.style.setProperty('--time',(2.6+Math.random()*2)+'s');p.style.background=['#e78a9d','#f0c582','#c35e7a','#fff0df'][i%4];layer.appendChild(p);setTimeout(()=>p.remove(),5000)}}
document.querySelector('.celebrate').addEventListener('click',()=>burst(42));
