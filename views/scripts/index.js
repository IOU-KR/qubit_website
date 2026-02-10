const more=document.getElementById('more');
const tabs=document.getElementById('tabs');
more.addEventListener('click',()=>{
    if(more.classList.contains('more_opened')){//do close
    more.classList.remove('more_opened');
    tabs.classList.add('tab_closed');
    }else{//do open
    more.classList.add('more_opened');
    tabs.classList.remove('tab_closed');
    }
});

const main=document.getElementById('main');
if(main.className!='selected') main.addEventListener('click',()=>location.href='/');

const branding=document.getElementById('branding');
if(branding.className!='selected') branding.addEventListener('click',()=>location.href='/branding');

const apply2=document.getElementById('apply2');
if(apply2.className!='selected') apply2.addEventListener('click',()=>location.href='/apply');

const apply=document.getElementById('apply');
if(apply) apply.addEventListener('click',()=>location.href='/apply');

const intro=document.getElementById('intro');
if(intro.className!='selected') intro.addEventListener('click',()=>location.href='/intro');

const logo=document.getElementById('logo');
if(logo.className!='selected') logo.addEventListener('click',()=>location.href='/');

const results=document.getElementById('results');
if(results.className!='selected') results.addEventListener('click',()=>location.href='/results');


