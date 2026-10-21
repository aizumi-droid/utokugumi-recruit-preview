const menu=document.querySelector('#mobile-menu');
const toggle=document.querySelector('.menu-toggle');
const closeMenu=()=>{menu.close();};
toggle.addEventListener('click',()=>{menu.showModal();toggle.setAttribute('aria-expanded','true');document.body.classList.add('menu-open');});
menu.querySelector('.menu-close').addEventListener('click',closeMenu);
menu.addEventListener('close',()=>{toggle.setAttribute('aria-expanded','false');document.body.classList.remove('menu-open');});
menu.addEventListener('click',e=>{if(e.target===menu){const r=menu.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right)closeMenu();}});
menu.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',()=>{const target=document.querySelector(a.hash);closeMenu();if(target){target.scrollIntoView();target.setAttribute('tabindex','-1');target.focus({preventScroll:true});}}));
window.matchMedia('(min-width:761px)').addEventListener('change',e=>{if(e.matches&&menu.open)closeMenu();});
document.querySelectorAll('[data-job]').forEach(a=>a.addEventListener('click',()=>{document.querySelector('#job').value=a.dataset.job;}));
const form=document.querySelector('#entry-form');
const contact=document.querySelector('#contact');
const error=document.querySelector('#contact-error');
const confirm=document.querySelector('#confirm-dialog');
function contactValid(){const v=contact.value.trim();return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)||(/^[+＋０-９0-9()（）\sー−-]{8,24}$/.test(v)&&(v.match(/[0-9０-９]/g)||[]).length>=8);}
contact.addEventListener('input',()=>{contact.setCustomValidity('');error.hidden=true;contact.removeAttribute('aria-invalid');});
form.addEventListener('submit',e=>{e.preventDefault();if(!contactValid()){contact.setCustomValidity('メールアドレスまたは電話番号をご入力ください。');contact.setAttribute('aria-invalid','true');error.hidden=false;contact.reportValidity();return;}if(!form.reportValidity())return;const values=new FormData(form);const output=document.querySelector('#confirm-values');output.replaceChildren();for(const [key,label] of [['purpose','ご用件'],['name','お名前'],['contact','連絡先'],['job','気になる職種'],['message','ご相談・ご質問']]){const row=document.createElement('div'),dt=document.createElement('dt'),dd=document.createElement('dd');dt.textContent=label;dd.textContent=values.get(key)||'未入力';row.append(dt,dd);output.append(row);}confirm.showModal();});
document.querySelector('#back-to-form').addEventListener('click',()=>confirm.close());

// Fit only the two long mobile background labels to their actual available width.
{
 const labels=[...document.querySelectorAll('.jobs .section-heading .section-en,.community .section-heading .section-en')];
 const fitLabels=()=>{
  for(const label of labels){
   label.style.removeProperty('font-size');
   if(!window.matchMedia('(max-width:760px)').matches)continue;
   const available=label.parentElement.clientWidth-8;
   const width=label.getBoundingClientRect().width;
   const size=parseFloat(getComputedStyle(label).fontSize);
   if(width>available&&available>0)label.style.fontSize=`${Math.floor(size*available/width*10)/10}px`;
  }
 };
 const headingObserver=new ResizeObserver(fitLabels);
 labels.forEach(label=>headingObserver.observe(label.parentElement));
 window.addEventListener('resize',fitLabels);
 document.fonts.ready.then(fitLabels);
 fitLabels();
}
