const removeLegacyWelcome=()=>{
  let removed=false;
  document.querySelectorAll('.curtain,#welcome,.welcome,.welcome-screen,.welcome-overlay,.welcome-curtain').forEach(node=>{node.remove();removed=true;});
  const oldGreeting=[...document.querySelectorAll('body *')].find(node=>node.children.length===0&&node.textContent.includes('This is your go-to place for everything you need to know'));
  if(oldGreeting){
    let target=oldGreeting;
    for(let parent=oldGreeting.parentElement;parent&&parent!==document.body&&parent.id!=='root';parent=parent.parentElement){
      const style=getComputedStyle(parent);
      const rect=parent.getBoundingClientRect();
      if(parent.matches('[role="dialog"],[aria-modal="true"]')||/welcome|curtain|intro/i.test(`${parent.id} ${parent.className}`)||((style.position==='fixed'||Number(style.zIndex)>0)&&rect.width>=innerWidth*.8&&rect.height>=innerHeight*.8)) target=parent;
      if(target!==oldGreeting&&target.matches('[role="dialog"],[aria-modal="true"]')) break;
      if(parent.id==='root')break;
    }
    (target===oldGreeting?oldGreeting.parentElement:target)?.remove();
    removed=true;
  }
  return removed;
};
removeLegacyWelcome();
if(document.body){
  const legacyWelcomeObserver=new MutationObserver(()=>{if(removeLegacyWelcome())legacyWelcomeObserver.disconnect();});
  legacyWelcomeObserver.observe(document.body,{childList:true,subtree:true,characterData:true});
}
document.addEventListener('DOMContentLoaded', () => {
  removeLegacyWelcome();
  const capturedStaticHeart=[...document.querySelectorAll('#root div[style]')].find(node=>node.style.position==='fixed'&&node.style.zIndex==='999'&&node.style.pointerEvents==='none'&&node.querySelector('svg path[d^="M12 21s"]'));
  capturedStaticHeart?.remove();
  const welcomeMarkup='<div class="am-welcome-screen" role="dialog" aria-modal="true" aria-labelledby="am-welcome-title"><div class="am-welcome-content"><h1 id="am-welcome-title">A.M AFFAIRS \'26</h1><p class="am-welcome-subtitle">Walīmatu - n - Nikāh</p><p class="am-welcome-arabic" lang="ar" dir="rtl">بسم اللّه الرّحمن الرّحيم</p><p class="am-welcome-invitation">Following the solemnization of our marriage, out of immense love and joy, we humbly invite you to our Walīmatu - n - Nikāh.</p><p class="am-welcome-names">ADEKANMBI ABDULHAMEED <span>&amp;</span> OMOTOSHO MUTMAINNAH</p><p class="am-welcome-date">20/12/2026</p><button type="button" class="am-welcome-enter" aria-label="Enter the wedding website"><span class="am-welcome-arrow" aria-hidden="true">↓</span><small>TAP TO ENTER</small></button></div></div>';
  if(!document.querySelector('.am-welcome-screen')) document.body.insertAdjacentHTML('afterbegin',welcomeMarkup);
  const welcomeStyle=document.createElement('style');
  welcomeStyle.textContent='.am-welcome-screen{position:fixed;inset:0;z-index:100000;display:grid;place-items:center;overflow:auto;padding:32px 24px;background-color:#141078;background-image:radial-gradient(circle,transparent 0 35px,rgba(209,172,80,.075) 36px 37px,transparent 38px 48px,rgba(209,172,80,.045) 49px 50px,transparent 51px 62px),linear-gradient(90deg,rgba(17,17,17,.38),transparent 24%,rgba(209,172,80,.07) 49.8%,rgba(255,255,255,.16) 50%,rgba(209,172,80,.07) 50.2%,transparent 76%,rgba(17,17,17,.38));background-size:180px 180px,100% 100%;transition:opacity .7s ease,visibility .7s ease}.am-welcome-screen:before{content:"";position:absolute;top:0;bottom:0;left:50%;width:2px;transform:translateX(-50%);background:linear-gradient(transparent,rgba(209,172,80,.38) 20%,rgba(255,255,255,.5) 50%,rgba(209,172,80,.38) 80%,transparent);box-shadow:0 0 18px rgba(209,172,80,.2);pointer-events:none}.am-welcome-screen.is-hidden{opacity:0;visibility:hidden;pointer-events:none}.am-welcome-content{position:relative;z-index:1;width:min(660px,100%);padding:12px 12px 4px;text-align:center;color:#FFFFFF}.am-welcome-content h1{margin:0;color:#FFFFFF;font:400 clamp(38px,7vw,72px)/1.12 NaughtyMonster,Fraunces,Georgia,serif;letter-spacing:.015em;text-shadow:0 3px 22px rgba(17,17,17,.3)}.am-welcome-subtitle{margin:4px 0 22px;color:#D1AC50;font:italic 500 clamp(20px,3vw,28px)/1.35 Caveat,cursive}.am-welcome-arabic{margin:0 auto 18px;color:#FFFFFF;font:400 clamp(26px,4vw,34px)/1.9 Amiri,serif}.am-welcome-invitation{max-width:590px;margin:0 auto;color:#FFFFFF;font:400 clamp(15px,1.8vw,18px)/1.85 Manrope,Arial,sans-serif;text-shadow:0 1px 8px rgba(17,17,17,.32)}.am-welcome-names{margin:21px 0 7px;color:#FFFFFF;font:600 clamp(12px,2vw,16px)/1.7 Manrope,Arial,sans-serif;letter-spacing:.055em}.am-welcome-names span{display:inline-block;margin:0 7px;color:#D1AC50;font:italic 24px Fraunces,Georgia,serif}.am-welcome-date{margin:5px 0 0;color:#D1AC50;font:700 11px Manrope,Arial,sans-serif;letter-spacing:.24em}.am-welcome-enter{display:flex;flex-direction:column;align-items:center;gap:8px;margin:32px auto 0;border:0;background:transparent;color:#D1AC50;cursor:pointer}.am-welcome-arrow{display:grid;place-items:center;width:62px;height:62px;border:1px solid rgba(209,172,80,.9);border-radius:50%;font:300 30px/1 Manrope,Arial,sans-serif;animation:am-welcome-bob 1.8s ease-in-out infinite}.am-welcome-enter small{color:#D1AC50;font:600 9px Manrope,Arial,sans-serif;letter-spacing:.22em}.am-welcome-enter:hover .am-welcome-arrow{background:rgba(209,172,80,.12);transform:translateY(3px)}@keyframes am-welcome-bob{0%,100%{transform:translateY(0)}50%{transform:translateY(5px)}}@media(max-height:650px){.am-welcome-content{padding:0}.am-welcome-subtitle{margin-bottom:12px}.am-welcome-arabic{margin-bottom:10px}.am-welcome-names{margin-top:12px}.am-welcome-enter{margin-top:18px}}@media(max-width:520px){.am-welcome-screen{padding:22px 18px}.am-welcome-content h1{font-size:clamp(35px,10vw,54px)}.am-welcome-invitation{font-size:14px}.am-welcome-names{font-size:11px;letter-spacing:.02em}.am-welcome-names span{margin:0 3px}}@media(prefers-reduced-motion:reduce){.am-welcome-screen,.am-welcome-arrow{transition:none;animation:none}}';
  welcomeStyle.textContent += '.am-opening-curtain{position:fixed;inset:0;z-index:100002;pointer-events:none;overflow:hidden}.am-curtain-panel{position:absolute;inset:0 auto 0 0;width:50.2%;background-color:#141078;background-image:radial-gradient(circle,transparent 0 35px,rgba(209,172,80,.075) 36px 37px,transparent 38px 48px,rgba(209,172,80,.045) 49px 50px,transparent 51px 62px),linear-gradient(90deg,rgba(17,17,17,.3),transparent 70%);background-size:180px 180px,100% 100%;transition:transform 1.15s cubic-bezier(.76,0,.24,1);will-change:transform}.am-curtain-right{left:auto;right:0;transform-origin:right center;background-position:90px 0,100% 0}.am-curtain-left{transform-origin:left center}.am-curtain-seam{position:absolute;top:0;bottom:0;left:50%;width:2px;transform:translateX(-50%);background:linear-gradient(transparent,rgba(209,172,80,.55) 20%,rgba(255,255,255,.7) 50%,rgba(209,172,80,.55) 80%,transparent);box-shadow:0 0 18px rgba(209,172,80,.4);transition:opacity .35s ease .2s}.am-opening-curtain.is-opening .am-curtain-left{transform:translateX(-101%)}.am-opening-curtain.is-opening .am-curtain-right{transform:translateX(101%)}.am-opening-curtain.is-opening .am-curtain-seam{opacity:0}@media(prefers-reduced-motion:reduce){.am-curtain-panel{transition-duration:.3s}.am-curtain-seam{transition-duration:.15s}}';
  document.head.append(welcomeStyle);
  const welcomeScreen=document.querySelector('.am-welcome-screen');
  const weddingAudio=new Audio('assets/am-affairs-2026.mp3');
  weddingAudio.loop=true;
  weddingAudio.preload='auto';
  const cta=document.querySelector('.header-cta');
  const pledgeButton=[...(cta?.querySelectorAll('button')||[])].find(button=>button.textContent.includes('Pledge Gift'));
  let audioButton=null;
  if(pledgeButton){
    audioButton=document.createElement('button');
    audioButton.type='button';
    audioButton.className='wedding-audio-toggle';
    audioButton.setAttribute('aria-pressed','false');
    audioButton.innerHTML='<span class="audio-control-icon" aria-hidden="true">▶</span>';
    audioButton.setAttribute('aria-label','Play wedding music');
    pledgeButton.insertAdjacentElement('beforebegin',audioButton);
    audioButton.addEventListener('click',()=>{
      if(weddingAudio.paused) weddingAudio.play().catch(()=>{});
      else weddingAudio.pause();
    });
    const placeAudioButton=()=>{
      if(window.matchMedia('(max-width: 980px)').matches) document.body.append(audioButton);
      else pledgeButton.insertAdjacentElement('beforebegin',audioButton);
    };
    placeAudioButton();
    window.addEventListener('resize',placeAudioButton,{passive:true});
  }
  const updateAudioButton=playing=>{
    if(!audioButton)return;
    audioButton.setAttribute('aria-pressed',String(playing));
    audioButton.querySelector('.audio-control-icon').textContent=playing?'Ⅱ':'▶';
    audioButton.setAttribute('aria-label',playing?'Pause wedding music':'Play wedding music');
  };
  weddingAudio.addEventListener('play',()=>updateAudioButton(true));
  weddingAudio.addEventListener('pause',()=>updateAudioButton(false));
  const startWeddingAudio=()=>{if(!weddingAudio.paused)return Promise.resolve();try{return weddingAudio.play().then(()=>updateAudioButton(true)).catch(()=>updateAudioButton(false));}catch(error){updateAudioButton(false);return Promise.reject(error);}};
  let enteringWelcome=false;
  const enterWelcome=()=>{
    if(enteringWelcome)return;
    enteringWelcome=true;
    startWeddingAudio();
    if(window.location.hash) history.replaceState(null,'',window.location.pathname+window.location.search);
    window.scrollTo(0,0);
    document.documentElement.scrollTop=0;
    document.body.scrollTop=0;
    const curtain=document.createElement('div');
    curtain.className='am-opening-curtain';
    curtain.setAttribute('aria-hidden','true');
    curtain.innerHTML='<span class="am-curtain-panel am-curtain-left"></span><span class="am-curtain-panel am-curtain-right"></span><span class="am-curtain-seam"></span>';
    document.body.append(curtain);
    requestAnimationFrame(()=>{
      welcomeScreen?.classList.add('is-hidden');
      requestAnimationFrame(()=>curtain.classList.add('is-opening'));
    });
    window.setTimeout(()=>{
      curtain.remove();
      try{sessionStorage.setItem('am-affairs-welcome-dismissed','true');}catch{}
      enteringWelcome=false;
    },1250);
  };
  try{if(sessionStorage.getItem('am-affairs-welcome-dismissed')==='true'){welcomeScreen?.classList.add('is-hidden');startWeddingAudio();}}catch{}
  const welcomeEnterButton=welcomeScreen?.querySelector('.am-welcome-enter');
  welcomeEnterButton?.addEventListener('pointerdown',()=>{if(weddingAudio.paused)startWeddingAudio();},{capture:true});
  welcomeEnterButton?.addEventListener('click',enterWelcome);

  const programmeLabel=document.querySelector('#hero-band');
  if(programmeLabel) programmeLabel.textContent="A.M AFFAIRS '26";

  const countdownDigits=document.querySelectorAll('.hero-count .display');
  if(countdownDigits.length>=4){
    const weddingTime=new Date('2026-12-20T09:30:00+01:00').getTime();
    const updateWeddingCountdown=()=>{
      let remaining=Math.max(0,weddingTime-Date.now());
      const days=Math.floor(remaining/86400000);remaining%=86400000;
      const hours=Math.floor(remaining/3600000);remaining%=3600000;
      const minutes=Math.floor(remaining/60000);
      const seconds=Math.floor((remaining%60000)/1000);
      countdownDigits[0].textContent=String(days);
      countdownDigits[1].textContent=String(hours).padStart(2,'0');
      countdownDigits[2].textContent=String(minutes).padStart(2,'0');
      countdownDigits[3].textContent=String(seconds).padStart(2,'0');
    };
    updateWeddingCountdown();
    window.setInterval(updateWeddingCountdown,1000);
  }

  // Replace captured reference content without leaving the previous couple's event details.
  document.querySelectorAll('body *').forEach((node) => {
    if (node.children.length) return;
    const text = node.textContent.trim();
    const replacements = [
      ['Fatimah', 'MUTMAINNAH'], ['FATIMAH', 'MUTMAINNAH'],
      ['AbdulHafeez', 'ABDULHAMEED'], ['ABDULHAFEEZ', 'ABDULHAMEED'],
      ['#Tọlaoluwa’26', "A.M AFFAIRS '26"], ["#T'ọlaoluwa'26", "A.M AFFAIRS '26"],
      ['05.12.2026', '20/12/2026'], ['Saturday, 5 December 2026', '20/12/2026'],
      ['Mikkson Onas Hall', 'Ayetoro'], ['64, Bola Ahmad Tinubu Way, Agbele Road, Igbogbo Stadium, Ikorodu, Lagos State', 'Ayetoro'],
      ['From anywhere, get to Ikorodu Garage, enter a tricycle or bus going to Igbogbo, and alight at NEPA Bus Stop. The venue is a 5-minute walk to your right, or you can take a bike (okada) straight to the venue.', 'From (Lagos) Iyana Iba / Iyanapaja → Ayobo → Ayetoro, drop at Abestos. Cross the road, drive, ride/walk forward and you are there.'],
      ['#FLOURISHEDHYACINTH', '#GrammaticalManagement'], ['#LEGALLYCHARTERED', "#Abū/Umm'AbdilLāh"], ['#HEARTYFREESIAS', '#DinhoD-Simah'],
      ['Nude', 'Navy blue'], ['Burnt orange', 'Navy blue'], ['Wine', 'Navy blue'],
      ['30 November 2026', '20/12/2026'], ['7 November 2026', '20/12/2026']
    ];
    let updated = text;
    for (const [from, to] of replacements) updated = updated.replaceAll(from, to);
    if (updated !== text) node.textContent = updated;
  });
  const ceremonyLabel=[...document.querySelectorAll('body *')].find(n=>n.children.length===0&&/Aqd Nikaah Ceremony\s*·\s*Reception/i.test(n.textContent));
  if(ceremonyLabel) ceremonyLabel.textContent="A.M AFFAIRS '26";
  const heroNames=document.querySelectorAll('.hero-names .name-face');
  if(heroNames[0]) heroNames[0].textContent='ABDULHAMEED';
  if(heroNames[1]) heroNames[1].textContent='MUTMAINNAH';
  const heroTags=document.querySelectorAll('.hero-names .tagname');
  if(heroTags[0]) heroTags[0].textContent='(The Coordinating Coordinator)';
  if(heroTags[1]) heroTags[1].textContent='(The Smiling One)';
  document.title = "A.M AFFAIRS '26 — 20/12/2026";
  const head = document.querySelector('head');
  if (head && !document.querySelector('meta[name="description"]')) {
    const meta = document.createElement('meta'); meta.name = 'description'; meta.content = "A.M AFFAIRS '26 — 20/12/2026"; head.append(meta);
  }

  const location = document.querySelector('#when');
  if (location) {
    const maps = 'https://maps.app.goo.gl/HB5dJUwPfJyJzUMi7';
    const venueImage=location.querySelector('.venue-bg');
    if(venueImage){venueImage.style.backgroundImage="url('venue-location.png')";venueImage.style.backgroundPosition='center 52%';}
    location.replaceChildren(venueImage);
    location.insertAdjacentHTML('beforeend',`<div class="venue-custom"><p class="eyebrow">WHEN & WHERE</p><h2>GIMS Event Centre</h2><p class="venue-subtitle">Ogun State</p><div class="venue-info-grid"><article class="venue-info-card"><span class="venue-info-icon" aria-hidden="true">▣</span><span class="venue-info-label">DATE</span><strong>20/12/2026</strong></article><article class="venue-info-card"><span class="venue-info-icon" aria-hidden="true">◷</span><span class="venue-info-label">TIME</span><strong>9:30 AM PROMPT</strong></article><article class="venue-info-card"><span class="venue-info-icon" aria-hidden="true">⌖</span><span class="venue-info-label">VENUE</span><strong>GIMS Event Centre, Ogun State</strong></article></div><div class="venue-route-card"><p class="eyebrow">ROUTE</p><p>From (Lagos) Iyana Iba / Iyanapaja → Ayobo → Ayetoro, drop at Abestos. Cross the road, drive, ride/walk forward and you are there.</p></div><a class="venue-map-link" href="${maps}" target="_blank" rel="noopener noreferrer">Open in Google Maps ↗</a></div>`);
    const programmeItems=[
      "Opening",
      "Recitation of the Qur’an with different riwayah",
      "Welcome Address",
      "Introduction of the Groom and Bride",
      "Introduction of the Groom and Bride's family",
      "Lecture - Sheikh Tajudeen Uthmān (Mudeer Ma'had Uthmān bn Affan) حفظه اللّه",
      "Ewi",
      "Advice to the Couple 1 - Sheikh Bidmasii Abdulwāsii' (Cheif Imām Baruwa Central Mosque, Lagos) حفظه اللّه",
      "Advice to the Couple 2 - Sheikh Jubril Adeyemi Aluko (Grand Cheif Imām Edu Land) حفظه اللّه",
      "Qasīdah - Ustādh Sãdiq Opeyemi Isah Abū Nabīlah (As-Saoty) حفظه اللّه",
      "Presentation of Gifts",
      "Appreciation by the Groom - Adekanmbi Abdulhameed Alao (Abū Abdillāh); The Coordinating Coordinator",
      "Vote of thanks"
    ];
    if(!document.querySelector('#programme')) location.insertAdjacentHTML('afterend',`<section id="programme" class="programme-section" aria-labelledby="programme-title"><div class="programme-inner"><p class="eyebrow">ORDER OF THE DAY</p><h2 id="programme-title">Order of the Day</h2><ol class="programme-list">${programmeItems.map((item,index)=>`<li class="programme-item"><span class="programme-number">${String(index+1).padStart(2,'0')}</span><span class="programme-label">${item}</span></li>`).join('')}</ol></div></section>`);
  }

  const contacts = document.querySelector('#contacts');
  if (contacts) contacts.innerHTML = `<div class="section-head"><p class="eyebrow">ENQUIRIES</p><h2>Someone to ask.</h2></div><div class="enquiry-grid"><article class="enquiry-card"><p class="eyebrow">BRIDE'S SIDE</p><a class="enquiry-row" href="https://wa.me/2349134691384" target="_blank" rel="noopener noreferrer" aria-label="Contact Zee on WhatsApp"><span class="enquiry-icon" aria-hidden="true">◉</span><span class="enquiry-person"><strong>Zee</strong><small>0913 469 1384</small></span><span class="enquiry-arrow" aria-hidden="true">›</span></a><a class="enquiry-row" href="https://wa.me/2349042841395" target="_blank" rel="noopener noreferrer" aria-label="Contact Qwin Zee on WhatsApp"><span class="enquiry-icon" aria-hidden="true">◉</span><span class="enquiry-person"><strong>Qwin Zee</strong><small>0904 284 1395</small></span><span class="enquiry-arrow" aria-hidden="true">›</span></a></article><article class="enquiry-card"><p class="eyebrow">GROOM'S SIDE</p><a class="enquiry-row" href="https://wa.me/2348025843206" target="_blank" rel="noopener noreferrer" aria-label="Contact Abū Mujāhid on WhatsApp"><span class="enquiry-icon" aria-hidden="true">◉</span><span class="enquiry-person"><strong>Abū Mujāhid</strong><small>+234 802 584 3206</small></span><span class="enquiry-arrow" aria-hidden="true">›</span></a><a class="enquiry-row" href="https://wa.me/2349041135731" target="_blank" rel="noopener noreferrer" aria-label="Contact An-Nūr on WhatsApp"><span class="enquiry-icon" aria-hidden="true">◉</span><span class="enquiry-person"><strong>An-Nūr</strong><small>+234 904 113 5731</small></span><span class="enquiry-arrow" aria-hidden="true">›</span></a></article></div>`;

  const attire=document.querySelector('#attire');
  if(attire) attire.innerHTML=`<div class="section-head"><p class="eyebrow" style="color:#D1AC50">COLOUR CODE</p><h2>Wear our colours, if you like.</h2><p class="attire-intro" style="max-width:560px;margin:16px auto 0;color:#111;font:400 15px/1.8 var(--body)">It is <strong style="color:#141078;font-weight:700">not mandatory</strong>, buy the colour yourself, wear something you already own, or simply come as you are.</p></div><div class="dress-card"><div class="navy-swatch" role="img" aria-label="Navy blue #141078"></div><div class="dress-copy"><p class="eyebrow" style="color:#D1AC50">DRESSING CODE</p><h3>Navy blue</h3><p class="hex-code">#141078</p></div></div>`;

  const footerNames=document.querySelector('.footer-names');
  if(footerNames) footerNames.innerHTML=`<span class="footer-couple-name">ABDULHAMEED</span><span class="footer-wedding-ring" role="img" aria-label="Wedding ring"><svg viewBox="0 0 38 42" width="28" height="31" aria-hidden="true"><circle cx="19" cy="27" r="9" fill="none" stroke="#D1AC50" stroke-width="3.2"/><path d="M12.7 20.7a9 9 0 0 1 4.8-2.6" fill="none" stroke="#FFFFFF" stroke-width="1.2" stroke-linecap="round"/><path d="M14 17l2.5-5M24 17l-2.5-5" fill="none" stroke="#D1AC50" stroke-width="1.8" stroke-linecap="round"/><polygon points="14,8 24,8 28,13 10,13" fill="#FFFFFF" stroke="#D1AC50" stroke-width="1.5" stroke-linejoin="round"/><path d="M10 13l9 8 9-8" fill="none" stroke="#D1AC50" stroke-width="1.2" stroke-linejoin="round"/></svg></span><span class="footer-couple-name">MUTMAINNAH</span>`;
  document.querySelectorAll('.developer-credit').forEach(node=>node.remove());
  const siteCredit=document.querySelector('.credit-line');
  if(siteCredit) siteCredit.innerHTML='Developed by <strong><em>Khalid Mogaji</em></strong> · <strong><em>09167850300</em></strong> · © 2026';
  const allLeaves=[...document.querySelectorAll('body *')].filter(n=>n.children.length===0);
  const footerHashtags=allLeaves.filter(n=>/FLOURISHEDHYACINTH|LEGALLYCHARTERED|HEARTYFREESIAS/i.test(n.textContent));
  footerHashtags.forEach((el,i)=>el.textContent=["#GrammaticalManagement","#Abū/Umm'AbdilLāh",'#DinhoD-Simah'][i%3]);
  const oldVerse=[...document.querySelectorAll('body *')].find(n=>n.children.length===0&&n.textContent.includes('And of His signs is that He created'));
  const verseSection=oldVerse?.closest('section');
  if(verseSection){
    verseSection.classList.add('verse-contrast-fixed');
    verseSection.style.setProperty('background','#141078','important');
    verseSection.style.setProperty('color','#FFFFFF','important');
    verseSection.querySelectorAll('*').forEach(el=>{
      if(el.matches('.eyebrow')) el.style.setProperty('color','#D1AC50','important');
      else el.style.setProperty('color','#FFFFFF','important');
      el.style.setProperty('opacity','1','important');
    });
  }

  const recitationCounter=document.querySelector('#dua button[aria-label^="Recite"]');
  recitationCounter?.closest('.reveal')?.remove();
  [...document.querySelectorAll('#dua *')].find(node=>node.children.length===0&&node.textContent.includes('Tap the counter each time you recite'))?.remove();

  const cardImages=document.querySelectorAll('#access-card img');
  if(cardImages[0]){cardImages[0].src='assets/am-affairs-wedding-flyer.jpeg';cardImages[0].alt='A.M AFFAIRS 26 access card';}
  if(cardImages[1]) cardImages[1].closest('.outline-card')?.remove();
  const cardDownloads=document.querySelectorAll('#access-card a[download]');
  if(cardDownloads[0]){
    cardDownloads[0].href='assets/am-affairs-wedding-flyer.jpeg';
    cardDownloads[0].download='A.M-Affairs-26-access-card.jpeg';
    cardDownloads[0].setAttribute('aria-label','Download A.M AFFAIRS 26 access card');
    cardDownloads[0].childNodes.forEach(node=>{if(node.nodeType===Node.TEXT_NODE)node.textContent=' Download access card';});
    const cardGrid=cardDownloads[0].closest('.outline-card')?.parentElement;
    if(cardGrid){cardGrid.style.maxWidth='380px';cardGrid.style.gridTemplateColumns='minmax(0,1fr)';}
  }

  const giftGrid=document.querySelector('#gifts .gift-grid');
  const giftCards=giftGrid?[...giftGrid.querySelectorAll('.gift-card')]:[];
  const giftToggle=[...document.querySelectorAll('#gifts button')].find(button=>/show (?:more|fewer)/i.test(button.textContent));
  if(giftGrid&&giftToggle&&giftCards.length>6){
    giftGrid.id='am-gift-grid';
    let giftsExpanded=false;
    giftGrid.classList.add('is-collapsed');
    giftToggle.setAttribute('aria-controls','am-gift-grid');
    giftCards.forEach(card=>{card.hidden=false;});
    giftToggle.textContent='Show more';
    giftToggle.setAttribute('aria-expanded','false');
    giftToggle.addEventListener('click',()=>{
      giftsExpanded=!giftsExpanded;
      giftGrid.classList.toggle('is-collapsed',!giftsExpanded);
      giftToggle.textContent=giftsExpanded?'Show fewer':'Show more';
      giftToggle.setAttribute('aria-expanded',String(giftsExpanded));
    });
  }

  const rsvpButton=[...document.querySelectorAll('#rsvp button')].find(button=>button.textContent.includes("Yes, I'll be there"));
  rsvpButton?.addEventListener('click',()=>{
    if(document.querySelector('#rsvp-confirmation')) return;
    const title="A.M AFFAIRS '26 — Walīmatu-n-Nikāh";
    const venue='GIMS EVENT CENTRE, OGUN STATE';
    const eventDetails='Sunday, 20 December 2026 at 9:30 AM prompt.\nVenue: GIMS EVENT CENTRE, OGUN STATE.\nGoogle Maps: https://maps.app.goo.gl/HB5dJUwPfJyJzUMi7';
    const googleUrl='https://calendar.google.com/calendar/render?action=TEMPLATE&text='+encodeURIComponent(title)+'&dates=20261220/20261221&details='+encodeURIComponent(eventDetails)+'&location='+encodeURIComponent(venue);
    const outlookUrl='https://outlook.live.com/calendar/0/deeplink/compose?subject='+encodeURIComponent(title)+'&startdt=2026-12-20T00%3A00%3A00&enddt=2026-12-21T00%3A00%3A00&allday=true&body='+encodeURIComponent(eventDetails)+'&location='+encodeURIComponent(venue);
    const stamp=new Date().toISOString().replace(/[-:]/g,'').replace(/\.\d{3}/,'');
    const ics=['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//A.M AFFAIRS 26//Wedding//EN','CALSCALE:GREGORIAN','BEGIN:VEVENT','UID:am-affairs-26-walimatun-nikah@am-affairs','DTSTAMP:'+stamp,'DTSTART;VALUE=DATE:20261220','DTEND;VALUE=DATE:20261221','SUMMARY:'+title.replaceAll(',','\\,').replaceAll(';','\\;'),'LOCATION:'+venue.replaceAll(',','\\,').replaceAll(';','\\;'),'DESCRIPTION:'+eventDetails.replaceAll(',','\\,').replaceAll(';','\\;').replaceAll('\n','\\n'),'END:VEVENT','END:VCALENDAR'].join('\r\n');
    const icsUrl=URL.createObjectURL(new Blob([ics],{type:'text/calendar;charset=utf-8'}));
    const confirmation=document.createElement('div');
    confirmation.id='rsvp-confirmation';confirmation.className='rsvp-confirmation';confirmation.setAttribute('role','status');
    confirmation.innerHTML='<span class="rsvp-check" aria-hidden="true">✓</span><h3>Wonderful — we\'ll see you there.</h3><p>Sunday, 20 December 2026 at 9:30 AM prompt at GIMS EVENT CENTRE, Ogun State.</p><p class="rsvp-save-label">SAVE THE DATE</p><div class="rsvp-calendar-links"><a href="'+googleUrl+'" target="_blank" rel="noopener noreferrer">Google Calendar</a><a href="'+outlookUrl+'" target="_blank" rel="noopener noreferrer">Outlook</a><a class="rsvp-ics-link" href="'+icsUrl+'" download="A.M-Affairs-26.ics">Download .ics</a></div>';
    rsvpButton.replaceWith(confirmation);
  });

  // Cash gifts use direct bank transfer to the couple's OPay account.
  const cashPanel=document.querySelector('aside[role="dialog"][aria-label="Cash gift"]');
  if(cashPanel){
    const panelBody=cashPanel.querySelector('.panel-body');
    if(panelBody){
      panelBody.innerHTML='<p class="bank-transfer-intro">Send your cash gift by bank transfer directly to the account below. Enter your name as the transfer narration so we can identify your gift.</p><div class="bank-gift-selected" hidden><p><span>Selected gift</span><strong class="bank-gift-name"></strong></p><p><span>Transfer amount</span><strong class="bank-gift-amount"></strong></p></div><div class="bank-transfer-card"><p><span>Bank</span><strong>OPay</strong></p><p><span>Account name</span><strong>ADEKANMBI ABDULHAMEED ALAO</strong></p><p class="bank-account-row"><span>Account number</span><strong>9128808318</strong></p><button type="button" class="copy-account">Copy account number</button></div><p class="bank-transfer-note">After transferring, please keep your bank confirmation. The couple will confirm the gift when it appears in their account.</p><p class="bank-copy-status" role="status" aria-live="polite"></p>';
      const copyButton=panelBody.querySelector('.copy-account');
      copyButton.addEventListener('click',async()=>{
        try{
          if(navigator.clipboard&&window.isSecureContext) await navigator.clipboard.writeText('9128808318');
          else {const field=document.createElement('textarea');field.value='9128808318';field.style.position='fixed';field.style.opacity='0';document.body.append(field);field.select();document.execCommand('copy');field.remove();}
          panelBody.querySelector('.bank-copy-status').textContent='Account number copied.';
          copyButton.textContent='Copied';
        }catch{panelBody.querySelector('.bank-copy-status').textContent='Please copy the account number: 9128808318';}
      });
    }
    const scrim=document.createElement('button');
    scrim.className='panel-scrim am-cash-scrim';scrim.type='button';scrim.setAttribute('aria-label','Close cash gift panel');scrim.style.display='none';document.body.append(scrim);
    const panelTitle=cashPanel.querySelector('.panel-head h3');
    const intro=panelBody?.querySelector('.bank-transfer-intro');
    const selectedGift=panelBody?.querySelector('.bank-gift-selected');
    const openCash=(gift=null)=>{
      if(gift&&selectedGift){
        panelTitle.textContent='Pledge this gift';
        selectedGift.hidden=false;
        selectedGift.querySelector('.bank-gift-name').textContent=gift.name;
        selectedGift.querySelector('.bank-gift-amount').textContent=gift.amount;
        intro.textContent=`Transfer ${gift.amount} for ${gift.name} to the OPay account below. Enter your name as the transfer narration so we can identify your gift.`;
      }else{
        panelTitle.textContent='A cash gift';
        if(selectedGift)selectedGift.hidden=true;
        if(intro)intro.textContent='Send your cash gift by bank transfer directly to the account below. Enter your name as the transfer narration so we can identify your gift.';
      }
      cashPanel.dataset.open='true';cashPanel.setAttribute('aria-hidden','false');scrim.style.display='block';document.body.style.overflow='hidden';
    };
    const closeCash=()=>{cashPanel.dataset.open='false';cashPanel.setAttribute('aria-hidden','true');scrim.style.display='none';document.body.style.overflow='';};
    const openButton=[...document.querySelectorAll('#cash button')].find(button=>button.textContent.includes('Open the Cash gifts'));
    openButton?.addEventListener('click',openCash);
    giftGrid?.addEventListener('click',event=>{
      const button=event.target.closest('button');
      if(!button||!button.textContent.includes('Pledge this gift'))return;
      const card=button.closest('.gift-card');
      if(!card)return;
      const name=card.querySelector('.gift-body .display')?.textContent.trim()||card.querySelector('img')?.alt||'Selected gift';
      const price=card.querySelector('.gift-body .muted')?.textContent.trim().replace(/^Est\.\s*/i,'')||'Ask us';
      openCash({name,amount:price});
    });
    scrim.addEventListener('click',closeCash);
    cashPanel.querySelector('[aria-label="Go back"]')?.addEventListener('click',closeCash);
    document.addEventListener('keydown',event=>{if(event.key==='Escape'&&cashPanel.dataset.open==='true')closeCash();});
  }

  const nav = document.querySelector('.nav-desktop');
  const navTargets=[];
  // The captured reference includes a separate active-pill positioned over Gifts.
  // Remove it; the active nav button itself is now the scroll indicator.
  nav?.querySelector(':scope > span[aria-hidden="true"]')?.remove();
  nav?.querySelectorAll('button').forEach(button => {
    const label=button.textContent.trim();
    const target=({When:'#when',Programme:'#programme',Invitation:'#programme',"Du'a":'#dua',Gifts:'#gifts',Attire:'#attire',Contacts:'#contacts'})[label];
    const section=target&&document.querySelector(target);
    if(section){
      navTargets.push({button,section});
      button.addEventListener('click',()=>section.scrollIntoView({behavior:'smooth',block:'start'}));
    }
  });
  navTargets.sort((a,b)=>a.section.compareDocumentPosition(b.section)&Node.DOCUMENT_POSITION_FOLLOWING?-1:1);
  const setActiveNav=active=>navTargets.forEach(item=>{
    const isActive=item===active;
    item.button.classList.toggle('active',isActive);
    if(isActive)item.button.setAttribute('aria-current','location');
    else item.button.removeAttribute('aria-current');
    document.querySelectorAll('.mobile-link').forEach(link=>{
      const label=link.querySelector('span')?.textContent.trim();
      if(label&&label===item.button.textContent.trim()){
        link.dataset.active=String(isActive);
        link.style.setProperty('color',isActive?'#141078':'#FFFFFF','important');
        link.style.setProperty('background-color',isActive?'#D1AC50':'transparent','important');
      }
    });
  });
  let scrollSpyQueued=false;
  const updateActiveNav=()=>{
    scrollSpyQueued=false;
    if(!navTargets.length)return;
    if(window.scrollY+window.innerHeight>=document.documentElement.scrollHeight-4){setActiveNav(navTargets[navTargets.length-1]);return;}
    const activationLine=window.scrollY+Math.min(window.innerHeight*.34,260);
    let active=navTargets[0];
    navTargets.forEach(item=>{if(item.section.getBoundingClientRect().top+window.scrollY<=activationLine)active=item;});
    setActiveNav(active);
  };
  const queueActiveNav=()=>{if(!scrollSpyQueued){scrollSpyQueued=true;window.requestAnimationFrame(updateActiveNav);}};
  window.addEventListener('scroll',queueActiveNav,{passive:true});
  window.addEventListener('resize',queueActiveNav,{passive:true});
  updateActiveNav();

  const mobileNavButton=document.querySelector('.burger');
  const mobileMenu=document.querySelector('.mobile-sheet[role="menu"]');
  if(mobileNavButton&&mobileMenu){
    const mobileLinks=[...mobileMenu.querySelectorAll('.mobile-link')];
    mobileNavButton.querySelectorAll('.burger-line').forEach(line=>line.style.setProperty('background-color','#D1AC50','important'));
    const setMobileMenuOpen=isOpen=>{
      mobileMenu.dataset.open=String(isOpen);
      mobileMenu.setAttribute('aria-hidden',String(!isOpen));
      mobileMenu.style.setProperty('opacity',isOpen?'1':'0');
      mobileMenu.style.setProperty('visibility',isOpen?'visible':'hidden');
      mobileMenu.style.setProperty('transform',isOpen?'none':'translateY(-8px) scale(.97)');
      mobileMenu.style.setProperty('pointer-events',isOpen?'auto':'none');
      mobileNavButton.setAttribute('aria-expanded',String(isOpen));
      mobileNavButton.setAttribute('aria-label',isOpen?'Close menu':'Open menu');
      mobileLinks.forEach(link=>{
        link.tabIndex=isOpen?0:-1;
        link.style.setProperty('visibility',isOpen?'visible':'hidden');
        link.querySelectorAll('span').forEach(span=>span.style.setProperty('visibility',isOpen?'visible':'hidden'));
      });
    };
    mobileMenu.style.setProperty('background-color','#141078','important');
    mobileMenu.style.setProperty('border-color','#D1AC50','important');
    setMobileMenuOpen(false);
    mobileNavButton.addEventListener('click',()=>setMobileMenuOpen(mobileMenu.dataset.open!=='true'));
    mobileLinks.forEach(link=>link.addEventListener('click',()=>{
      const label=link.querySelector('span')?.textContent.trim();
      const item=navTargets.find(target=>target.button.textContent.trim()===label);
      item?.section.scrollIntoView({behavior:'smooth',block:'start'});
      setMobileMenuOpen(false);
    }));
    document.addEventListener('pointerdown',event=>{
      if(mobileMenu.dataset.open==='true'&&!mobileMenu.contains(event.target)&&!mobileNavButton.contains(event.target))setMobileMenuOpen(false);
    });
    document.addEventListener('keydown',event=>{if(event.key==='Escape'&&mobileMenu.dataset.open==='true')setMobileMenuOpen(false);});
  }
  const brand=document.querySelector('.hashtag');
  if(brand) brand.textContent="A.M AFFAIRS '26";
  const style=document.createElement('style');
  style.textContent=':root{--navy:#141078;--gold:#D1AC50;--body:Manrope,sans-serif;--display:Fraunces,Georgia,serif;--script:Caveat,cursive;--arabic:Amiri,serif}.nav-desktop button{color:#fff!important}.nav-desktop button[aria-current],.nav-desktop button.active{background:#D1AC50!important;color:#141078!important}.couple-full{font:500 clamp(15px,2vw,20px)/1.7 var(--body);color:#111;margin:0 auto 26px}.couple-full em{font:500 1em var(--script);color:#D1AC50;display:inline-block;margin-left:5px}.invitation-card .arabic{font-family:var(--arabic);font-size:clamp(25px,4vw,38px);direction:rtl;color:#141078;margin:18px auto}.invitation-card p{line-height:1.8}.invitation-section .section-head{text-align:center!important;margin-inline:auto!important}.invitation-section .section-head .eyebrow,.invitation-section .section-head h2{text-align:center!important}.invitation-section .section-head h2{font-family:var(--display);color:#141078}#gifts{background:#fff!important;color:#111!important}#gifts h2,#gifts h3,#gifts p,#gifts label{color:#111!important}#gifts .gift-card{background:#fff!important;color:#111!important;border-color:#D1AC50!important}#gifts .btn,#gifts button{background:#D1AC50!important;color:#141078!important;border-color:#D1AC50!important}#attire{background:#fff!important;color:#111!important;text-align:center!important}#attire .narrow{margin:auto!important;text-align:center!important}#attire .dress-card{margin:32px auto!important;display:flex!important;justify-content:center!important;align-items:center!important;max-width:850px!important;background:#fff!important;border:1px solid #D1AC50!important}#attire .navy-swatch{background:#141078!important;border-color:#fff!important}#when .venue-bg{background-image:linear-gradient(rgba(20,16,120,.14),rgba(20,16,120,.3)),url("venue-location.png")!important;background-position:center!important;background-size:cover!important}#when .card,#when .venue-card{background:rgba(17,17,17,.78)!important;color:#fff!important}#when .card *{color:#fff!important}#rsvp{background:#141078!important;color:#fff!important}#rsvp h2,#rsvp p{color:#fff!important}#contacts{background:#fff!important;color:#111!important}#contacts .section-head{margin:auto!important;text-align:center!important}';
  style.textContent += '.venue-custom{position:relative;z-index:2;max-width:820px;margin:0 auto;text-align:center;padding:40px 24px;color:#fff}.venue-custom h2{font:600 clamp(40px,7vw,68px)/1.1 var(--display);color:#fff;margin:10px}.venue-custom-card{max-width:680px;margin:24px auto 0;padding:28px 32px;background:rgba(17,17,17,.78);border:1px solid rgba(209,172,80,.65);color:#fff}.venue-custom-card p{color:#fff;line-height:1.8}.venue-custom-card .eyebrow{color:#D1AC50}.venue-custom-card a{display:inline-flex;margin-top:12px;padding:11px 18px;background:#D1AC50;color:#141078;border-radius:30px}.hero-hashtags span,.footer-hashtags span{color:#D1AC50!important}.name-face{color:#fff!important}.footer-names{font-family:var(--name-face)!important}.section-head h2{color:#141078!important}section.tone-a,section.tone-b,section.field-light{background:#fff!important;color:#111!important}section.field{background:#141078!important;color:#fff!important}#hero{background:#141078!important}#gifts .gift-card .price,#gifts .gift-card .muted{color:#111!important}#gifts .gift-card img{object-fit:cover}#dua,#cash{background:#141078!important;color:#fff!important}#dua h2,#dua p,#cash h2,#cash p{color:#fff!important}.nav-desktop>span[aria-hidden]{background:#D1AC50!important}.footer-names{color:#fff!important}#attire .section-head{margin:0 auto 30px!important;text-align:center!important}';
  style.textContent += '@media (hover:hover) and (pointer:fine){.am-heart-cursor{position:fixed;left:0;top:0;z-index:100001;width:24px;height:24px;display:grid;place-items:center;color:#D1AC50;font:22px/1 Arial,sans-serif;text-shadow:0 1px 5px rgba(17,17,17,.65);pointer-events:none;opacity:0;transform:translate(-50%,-50%) scale(.75);transition:opacity .15s,transform .18s ease;will-change:left,top;}.am-heart-cursor.is-visible{opacity:1;transform:translate(-50%,-50%) scale(1)}.am-heart-cursor.is-hovering{transform:translate(-50%,-50%) scale(1.35)}}';
  style.textContent += '.verse-contrast-fixed .reveal,.verse-contrast-fixed .reveal *{color:#FFFFFF!important;opacity:1!important;text-shadow:0 1px 2px rgba(17,17,17,.25)!important}';
  style.textContent += '.panel[aria-label="Cash gift"]{background:#141078!important;color:#FFFFFF!important;border-left-color:#D1AC50!important}.panel[aria-label="Cash gift"] .panel-head{background:#141078!important;border-bottom:1px solid rgba(209,172,80,.55)!important}.panel[aria-label="Cash gift"] .panel-head h3{color:#FFFFFF!important}.panel[aria-label="Cash gift"] .panel-head .icon-btn{color:#D1AC50!important;border-color:rgba(209,172,80,.55)!important}.panel[aria-label="Cash gift"] .panel-body{background:#141078!important}.bank-transfer-intro,.bank-transfer-note{color:#FFFFFF!important;font:400 13px/1.75 var(--body);margin:0 0 18px}.bank-transfer-card{padding:18px;border:1px solid #D1AC50;border-radius:12px;background:#FFFFFF!important}.bank-transfer-card p{display:flex;flex-direction:column;gap:4px;margin:0 0 14px}.bank-transfer-card p span{color:#141078!important;font-size:11px;letter-spacing:.08em;text-transform:uppercase}.bank-transfer-card p strong{color:#111111!important;font-size:15px;font-weight:600;overflow-wrap:anywhere}.copy-account{width:100%;margin-top:4px;padding:12px;border:1px solid #D1AC50;border-radius:28px;background:#D1AC50;color:#141078;font:600 13px var(--body);cursor:pointer}.bank-transfer-note{margin:18px 0 0}.bank-copy-status{min-height:1.5em;color:#D1AC50;font-size:12px}';
  style.textContent += '.bank-gift-selected{margin:0 0 16px;padding:14px 16px;border:1px solid rgba(209,172,80,.65);border-radius:10px;background:rgba(209,172,80,.12)}.bank-gift-selected[hidden]{display:none}.bank-gift-selected p{display:flex;flex-direction:column;gap:4px;margin:0 0 10px}.bank-gift-selected p:last-child{margin-bottom:0}.bank-gift-selected span{color:#D1AC50;font-size:10px;letter-spacing:.1em;text-transform:uppercase}.bank-gift-selected strong{color:#FFFFFF;font-size:15px;overflow-wrap:anywhere}';
  style.textContent += '#gifts .gift-grid.is-collapsed>.gift-card:nth-child(n+7){display:none!important}';
  style.textContent += '.rsvp-confirmation{max-width:700px;margin:30px auto 0;padding:30px 24px;border:1px solid rgba(209,172,80,.55);border-radius:20px;background:rgba(255,255,255,.07);color:#FFFFFF;text-align:center}.rsvp-check{display:grid;place-items:center;width:48px;height:48px;margin:0 auto 14px;border-radius:50%;background:#D1AC50;color:#141078;font-size:30px;font-weight:700}.rsvp-confirmation h3{margin:0 0 10px;color:#FFFFFF;font:600 clamp(21px,3vw,28px)/1.3 var(--display)}.rsvp-confirmation>p{margin:7px 0;color:#FFFFFF!important;line-height:1.7}.rsvp-confirmation .rsvp-save-label{margin-top:24px;color:#D1AC50!important;font-size:10px;letter-spacing:.18em;font-weight:700}.rsvp-calendar-links{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:10px}.rsvp-calendar-links a{display:block;padding:12px 14px;border:1px solid rgba(209,172,80,.5);border-radius:24px;color:#D1AC50;background:transparent;font:600 12px var(--body);text-align:center}.rsvp-calendar-links .rsvp-ics-link{grid-column:1/-1}@media(max-width:480px){.rsvp-confirmation{padding:24px 16px}.rsvp-calendar-links{grid-template-columns:1fr}.rsvp-calendar-links .rsvp-ics-link{grid-column:auto}}';

  style.textContent += '#programme{display:block!important;visibility:visible!important;opacity:1!important;padding:clamp(76px,10vw,112px) 22px;background:#fff!important;color:#111!important}#programme .programme-inner{width:min(850px,100%);margin:0 auto}#programme .eyebrow{margin:0 0 12px;color:#D1AC50!important;text-align:center;font:700 10px var(--body);letter-spacing:.22em}#programme h2{margin:0 0 34px;color:#141078!important;text-align:center;font:600 clamp(30px,5vw,48px)/1.12 var(--display)}#programme .programme-list{margin:0;padding:0;list-style:none;border-top:1px solid rgba(209,172,80,.45)}#programme .programme-item{display:grid;grid-template-columns:48px 1fr;gap:14px;align-items:start;padding:17px 14px;border-bottom:1px solid rgba(209,172,80,.4);animation:programme-in .5s ease both;animation-delay:calc(var(--row)*45ms)}#programme .programme-item:nth-child(1){--row:0}#programme .programme-item:nth-child(2){--row:1}#programme .programme-item:nth-child(3){--row:2}#programme .programme-item:nth-child(4){--row:3}#programme .programme-item:nth-child(5){--row:4}#programme .programme-item:nth-child(6){--row:5}#programme .programme-item:nth-child(7){--row:6}#programme .programme-item:nth-child(8){--row:7}#programme .programme-item:nth-child(9){--row:8}#programme .programme-item:nth-child(10){--row:9}#programme .programme-item:nth-child(11){--row:10}#programme .programme-item:nth-child(12){--row:11}#programme .programme-item:nth-child(13){--row:12}#programme .programme-number{color:#D1AC50;font:700 12px var(--display);letter-spacing:.08em}#programme .programme-label{color:#111;font:500 15px/1.65 var(--body);overflow-wrap:anywhere}@keyframes programme-in{from{opacity:0;transform:translateY(9px)}to{opacity:1;transform:none}}@media(max-width:600px){#programme .programme-item{grid-template-columns:34px 1fr;gap:10px;padding:15px 6px}#programme .programme-label{font-size:14px}}@media(prefers-reduced-motion:reduce){#programme .programme-item{animation:none}}';

  style.textContent += `#when{position:relative;isolation:isolate}#when .venue-bg{filter:none}#when .venue-custom{position:relative;z-index:2;width:min(900px,100%);max-width:900px;margin:0 auto;padding:clamp(68px,9vw,104px) 24px 72px;text-align:center;color:#fff}#when .venue-custom>.eyebrow{margin:0 0 8px;color:#D1AC50!important;font:700 10px var(--body);letter-spacing:.22em}#when .venue-custom h2{margin:0;color:#fff!important;font:600 clamp(34px,5vw,54px)/1.12 var(--display)}#when .venue-subtitle{margin:7px 0 26px;color:rgba(255,255,255,.88);font:400 14px/1.6 var(--body)}#when .venue-info-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px}#when .venue-info-card{min-height:126px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:9px;padding:18px 14px;border:1px solid rgba(209,172,80,.6);border-radius:14px;background:rgba(17,17,17,.84);box-shadow:0 12px 30px rgba(17,17,17,.18)}#when .venue-info-icon{display:grid;place-items:center;width:30px;height:30px;border:1px solid rgba(209,172,80,.7);border-radius:50%;color:#D1AC50;font:18px/1 var(--body)}#when .venue-info-label{color:#D1AC50;font:700 9px var(--body);letter-spacing:.2em}#when .venue-info-card strong{color:#fff;font:600 14px/1.5 var(--display)}#when .venue-route-card{margin-top:12px;padding:19px 22px;border:1px solid rgba(209,172,80,.6);border-radius:14px;background:rgba(17,17,17,.84)}#when .venue-route-card .eyebrow{margin:0 0 10px;color:#D1AC50!important;font:700 9px var(--body);letter-spacing:.2em}#when .venue-route-card>p:last-child{max-width:720px;margin:0 auto;color:#fff; font:400 13px/1.8 var(--body)}#when .venue-map-link{display:inline-flex;align-items:center;justify-content:center;margin-top:16px;padding:11px 19px;border:1px solid #D1AC50;border-radius:24px;background:#D1AC50;color:#141078;font:600 12px var(--body);text-decoration:none;transition:transform .2s,box-shadow .2s}#when .venue-map-link:hover{transform:translateY(-2px);box-shadow:0 7px 18px rgba(17,17,17,.25)}@media(max-width:640px){#when .venue-custom{padding:56px 18px}#when .venue-info-grid{grid-template-columns:1fr;gap:9px}#when .venue-info-card{min-height:98px}#when .venue-route-card{padding:17px 15px}}`;
  style.textContent += `#contacts{padding:clamp(70px,9vw,104px) 22px;background:#fff!important;color:#111!important}#contacts .section-head{margin:0 auto 30px!important;text-align:center!important}#contacts .section-head h2{margin:10px 0 0;color:#141078!important;font:600 clamp(30px,4.8vw,46px)/1.15 var(--display)}#contacts .enquiry-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;width:min(780px,100%);margin:0 auto}#contacts .enquiry-card{padding:16px 14px 8px;border:1px solid rgba(209,172,80,.48);border-radius:15px;background:#fff}#contacts .enquiry-card>.eyebrow{margin:0 0 5px;color:#D1AC50!important;font:700 9px var(--body);letter-spacing:.18em}#contacts .enquiry-row{display:grid;grid-template-columns:32px 1fr 24px;gap:10px;align-items:center;min-height:56px;padding:7px 0;border-bottom:1px solid rgba(209,172,80,.3);color:#111;text-decoration:none}#contacts .enquiry-row:last-child{border-bottom:0}#contacts .enquiry-icon,#contacts .enquiry-arrow{display:grid;place-items:center;width:26px;height:26px;border:1px solid rgba(209,172,80,.65);border-radius:50%;color:#D1AC50;font:15px/1 var(--body)}#contacts .enquiry-person{display:flex;flex-direction:column;gap:3px;text-align:left}#contacts .enquiry-person strong{color:#141078;font:600 13px/1.3 var(--display)}#contacts .enquiry-person small{color:#111;font:400 11px/1.4 var(--body)}#contacts .enquiry-row:hover .enquiry-arrow{background:#D1AC50;color:#141078}#contacts .enquiry-row:focus-visible{outline:2px solid #D1AC50;outline-offset:3px;border-radius:5px}@media(max-width:600px){#contacts .enquiry-grid{grid-template-columns:1fr;max-width:410px}#contacts .section-head{margin-bottom:23px!important}}`;
  style.textContent += `.wedding-audio-toggle{display:inline-flex!important;align-items:center;justify-content:center;gap:7px;min-height:36px;margin:0 6px;padding:8px 12px;border:1px solid #D1AC50!important;border-radius:999px;background:rgba(20,16,120,.92)!important;color:#D1AC50!important;font:600 11px/1 var(--body);cursor:pointer;white-space:nowrap;transition:background .2s,color .2s,transform .2s}.wedding-audio-toggle:hover{background:#D1AC50!important;color:#141078!important;transform:translateY(-1px)}.audio-control-icon{font:700 11px/1 var(--body)}@media(max-width:640px){.wedding-audio-toggle{width:36px;min-width:36px;height:36px;margin:0 3px;padding:0}}`;
  style.textContent += '.credit-tape{background:#FFFFFF!important;border-top:1px solid rgba(209,172,80,.55)!important}.credit-line{color:#111111!important;opacity:1!important;font:500 12px/1.8 var(--body)!important;letter-spacing:.04em}.credit-line strong{color:#141078!important;font-weight:700!important}.credit-line em{font-style:italic}';
  style.textContent += `@media(max-width:980px){.wedding-audio-toggle{position:fixed!important;top:19px;right:72px;z-index:90;width:36px;min-width:36px;height:36px;margin:0;padding:0}}`;
  style.textContent += `.credit-line strong:first-of-type em{font-family:var(--script),Caveat,"Segoe Script",cursive!important;font-size:1.2em;font-weight:600!important;font-style:italic;letter-spacing:.02em}`;
  style.textContent += `.footer-names{display:flex!important;align-items:center!important;justify-content:center!important;gap:clamp(6px,1.4vw,14px);flex-wrap:wrap}.footer-names .footer-couple-name{display:inline-block}.footer-wedding-ring{display:inline-flex;align-items:center;justify-content:center;flex:0 0 auto;animation:ringFloat 3.2s ease-in-out infinite;filter:drop-shadow(0 3px 7px rgba(20,16,120,.35))}.footer-wedding-ring svg{display:block;overflow:visible}.footer-names .footer-ring-mark{display:none}@media(max-width:520px){.footer-names{gap:4px}.footer-wedding-ring svg{width:24px;height:27px}}@media(prefers-reduced-motion:reduce){.footer-wedding-ring{animation:none}}`;
  style.textContent += `footer>.field{background-color:#141078!important;background-image:radial-gradient(circle at 15% 27%,transparent 0 46px,rgba(209,172,80,.1) 47px 48px,transparent 49px 58px,rgba(209,172,80,.055) 59px 60px,transparent 61px),radial-gradient(circle at 84% 71%,transparent 0 59px,rgba(209,172,80,.085) 60px 61px,transparent 62px 72px,rgba(209,172,80,.05) 73px 74px,transparent 75px),radial-gradient(ellipse at 50% 48%,rgba(39,34,127,.82),transparent 68%),linear-gradient(105deg,#141078 0%,#211B7D 48%,#141078 100%)!important;color:#FFFFFF!important}footer>.field>.field-vignette{display:none!important}footer>.field .display{color:#D1AC50!important}footer>.field .footer-names,footer>.field .footer-names .footer-couple-name{color:#FFFFFF!important}footer>.field .footer-names+.footer-date{color:#FFFFFF!important}footer>.field .footer-names+.footer-date,footer>.field .footer-names+p{color:#FFFFFF!important}footer>.field .footer-names .footer-wedding-ring svg circle,footer>.field .footer-names .footer-wedding-ring svg path,footer>.field .footer-names .footer-wedding-ring svg polygon{stroke:#D1AC50!important}footer>.field .footer-names .footer-wedding-ring svg polygon{fill:#FFFFFF!important}footer>.field .footer-date,footer>.field .tag-pill,footer>.field .arabic{color:#D1AC50!important}footer>.field .tag-pill{border-color:rgba(209,172,80,.7)!important}footer>.field .field-vignette~*{color:#FFFFFF}`;
  style.textContent += `#access-card{position:relative;background-color:#141078!important;background-image:radial-gradient(circle at 12% 28%,transparent 0 54px,rgba(209,172,80,.09) 55px 56px,transparent 57px 68px,rgba(209,172,80,.045) 69px 70px,transparent 71px),radial-gradient(circle at 88% 72%,transparent 0 60px,rgba(209,172,80,.08) 61px 62px,transparent 63px 75px),radial-gradient(ellipse at 50% 45%,rgba(39,34,127,.85),transparent 68%),linear-gradient(110deg,#141078 0%,#211B7D 50%,#141078 100%)!important;color:#FFFFFF!important}#access-card .eyebrow{color:#D1AC50!important}#access-card h2{color:#FFFFFF!important}#access-card .muted{color:rgba(255,255,255,.86)!important}#access-card .outline-card{background:rgba(255,255,255,.97)!important;border:1px solid rgba(209,172,80,.78)!important;border-radius:18px;box-shadow:0 12px 32px rgba(7,6,50,.3)}#access-card .outline-card .btn-cta{background:#D1AC50!important;color:#141078!important;box-shadow:0 6px 20px rgba(209,172,80,.28)}#access-card .outline-card .btn-outline{border-color:#D1AC50!important;color:#D1AC50!important;background:#141078!important}#access-card .outline-card .btn-outline:hover{background:#D1AC50!important;color:#141078!important}.credit-tape{background-color:#141078!important;background-image:radial-gradient(circle at 15% 27%,transparent 0 46px,rgba(209,172,80,.1) 47px 48px,transparent 49px 58px,rgba(209,172,80,.055) 59px 60px,transparent 61px),radial-gradient(circle at 84% 71%,transparent 0 59px,rgba(209,172,80,.085) 60px 61px,transparent 62px 72px,rgba(209,172,80,.05) 73px 74px,transparent 75px),radial-gradient(ellipse at 50% 48%,rgba(39,34,127,.82),transparent 68%),linear-gradient(105deg,#141078 0%,#211B7D 48%,#141078 100%)!important;border-top:1px solid rgba(209,172,80,.48)!important}.credit-line{color:#FFFFFF!important;opacity:1!important;font-size:10px!important}.credit-line strong,.credit-line strong em{color:#D1AC50!important;font-size:10px!important}.credit-line strong:first-of-type em{font-size:10px!important}@media(max-width:560px){.credit-line,.credit-line strong,.credit-line strong em{font-size:9px!important}}`;
  document.head.append(style);
  requestAnimationFrame(()=>document.documentElement.classList.add('am-page-ready'));

  // The reference hides the system cursor on desktop, so provide its heart cursor too.
  if(window.matchMedia('(hover:hover) and (pointer:fine)').matches){
    document.querySelectorAll('.am-heart-cursor').forEach(node=>node.remove());
    const heartCursor=document.createElement('span');
    heartCursor.className='am-heart-cursor';
    heartCursor.setAttribute('aria-hidden','true');
    heartCursor.textContent='♥';
    document.body.append(heartCursor);
    // Remove the captured page's stationary love glyph; keep this pointer-following heart.
    document.querySelectorAll('body *').forEach(node=>{
      if(node===heartCursor||node.children.length) return;
      if(['♥','❤','💛'].includes(node.textContent.trim())) node.remove();
    });
    window.addEventListener('pointermove',event=>{
      heartCursor.style.left=`${event.clientX}px`;
      heartCursor.style.top=`${event.clientY}px`;
      heartCursor.classList.add('is-visible');
    },{passive:true});
    document.addEventListener('pointerover',event=>heartCursor.classList.toggle('is-hovering',Boolean(event.target.closest('a,button,[role="button"]'))));
    document.addEventListener('pointerleave',()=>heartCursor.classList.remove('is-visible'));
  }
});
