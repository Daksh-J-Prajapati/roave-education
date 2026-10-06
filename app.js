const navItems=[...document.querySelectorAll('.nav-item')];
const panels=[...document.querySelectorAll('.view-panel')];
const roleViews=[...document.querySelectorAll('.role-view')];
const toast=document.querySelector('.toast');
function showToast(message){toast.textContent=message;toast.classList.add('show');setTimeout(()=>toast.classList.remove('show'),2600)}
function showPanel(name){panels.forEach(p=>p.classList.toggle('active',p.dataset.panel===name));navItems.forEach(n=>n.classList.toggle('active',n.dataset.view===name));window.scrollTo({top:0,behavior:'smooth'});document.querySelector('.sidebar').classList.remove('open')}
navItems.forEach(item=>item.addEventListener('click',()=>showPanel(item.dataset.view)));
document.querySelectorAll('[data-go]').forEach(btn=>btn.addEventListener('click',()=>showPanel(btn.dataset.go)));
document.querySelectorAll('.role').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('.role').forEach(b=>b.classList.toggle('active',b===btn));roleViews.forEach(v=>v.classList.toggle('active',v.id===`${btn.dataset.role}View`));document.querySelector('.sidebar').style.display=btn.dataset.role==='family'?'flex':'none';document.querySelector('main').style.gridColumn=btn.dataset.role==='family'?'2':'1 / -1';document.querySelector('.trial-trigger').style.display=btn.dataset.role==='family'?'inline-block':'none';window.scrollTo({top:0,behavior:'smooth'})}));
document.querySelector('.mobile-menu').addEventListener('click',()=>document.querySelector('.sidebar').classList.toggle('open'));
const dialog=document.querySelector('#trialDialog');
document.querySelectorAll('.trial-trigger').forEach(btn=>btn.addEventListener('click',()=>dialog.showModal()));
document.querySelector('.dialog-close').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close()});
document.querySelector('#trialForm').addEventListener('submit',e=>{e.preventDefault();dialog.close();e.target.reset();showToast('Your free trial request is on its way!')});
document.querySelector('.copy-referral').addEventListener('click',async()=>{try{await navigator.clipboard.writeText('https://roave.education/refer/maya25')}catch(e){}showToast('Referral link copied')});
document.querySelectorAll('.save-note').forEach(btn=>btn.addEventListener('click',()=>showToast('Client note saved and shared')));
document.querySelectorAll('.file-input').forEach(input=>input.addEventListener('change',()=>{if(input.files.length)showToast(`${input.files.length} file${input.files.length>1?'s':''} uploaded successfully`)}));
document.querySelector('.interest-btn').addEventListener('click',()=>showToast('Interest sent — we’ll follow up with details'));
