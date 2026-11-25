const welcome = document.querySelector('#welcome');
document.querySelector('#enter-site').addEventListener('click', () => {
  welcome.classList.add('hidden');
  sessionStorage.setItem('am-affairs-entered', 'true');
});
if (sessionStorage.getItem('am-affairs-entered')) welcome.classList.add('hidden');

const menu = document.querySelector('#menu');
const menuToggle = document.querySelector('#menu-toggle');
menuToggle.addEventListener('click', () => {
  const isOpen = menu.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
});
menu.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  menu.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Open menu');
}));

function updateCountdown() {
  const target = new Date('2026-12-20T00:00:00+01:00').getTime();
  let remaining = Math.max(0, target - Date.now());
  const days = Math.floor(remaining / 86400000); remaining %= 86400000;
  const hours = Math.floor(remaining / 3600000); remaining %= 3600000;
  const minutes = Math.floor(remaining / 60000);
  const seconds = Math.floor((remaining % 60000) / 1000);
  document.querySelector('#days').textContent = String(days).padStart(2, '0');
  document.querySelector('#hours').textContent = String(hours).padStart(2, '0');
  document.querySelector('#minutes').textContent = String(minutes).padStart(2, '0');
  document.querySelector('#seconds').textContent = String(seconds).padStart(2, '0');
}
updateCountdown();
setInterval(updateCountdown, 1000);

let recitationCount = Number(localStorage.getItem('am-affairs-recitation-count') || 0);
const countLabel = document.querySelector('#recite-count');
if (countLabel) countLabel.textContent = String(recitationCount);
document.querySelector('#recite')?.addEventListener('click', () => { recitationCount += 1; countLabel.textContent = String(recitationCount); localStorage.setItem('am-affairs-recitation-count', String(recitationCount)); });
document.querySelector('#reset-count')?.addEventListener('click', () => { recitationCount = 0; countLabel.textContent = '0'; localStorage.removeItem('am-affairs-recitation-count'); });
const revealObserver = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); revealObserver.unobserve(entry.target); } }), {threshold: .12});
document.querySelectorAll('main .section').forEach(section => { section.classList.add('reveal'); revealObserver.observe(section); });

document.querySelector('#rsvp-button')?.addEventListener('click', () => {
  document.querySelector('#rsvp-state').textContent = "JazaakumuLlaahu khayran.";
  document.querySelector('#rsvp-button').textContent = "Counted — JazaakumuLlaahu khayran.";
  document.querySelector('#rsvp-button').disabled = true;
});

const giftOptions = [
 ['2-in-1 Chopping Board','₦18,000','data-ac2f9cc6dbd9195779e33499bc14f3bb947200709c47dfe321316049b29c27e2.jpg'],['22pcs Vegetable Chopper','₦22,000','data-df1f2a10164756e098ca3e1f2d6aaf27f88b4134a38d28edf23b7cd231ed67cf.jpg'],['Crown Star Grill & Sandwich Maker','₦60,000','data-acadf4757d35b86358022f5e29c062fbf789a4b434ff79f00a7d4d9b6ceb5b50.jpg'],['Elepaq 4.5KVA Generator','₦480,000','data-c112018e1f55075a6e0e48d2b6db01156cfdc7703356ce6a2bae7de70aa8fdbb.jpg'],['Fruit & Juice Extractor','₦55,000','data-fa3a4bf00bdc57a6f95725adb9bd134742f8ba4dc75bec1a7e023e141a750f9c.jpg'],['Hisense 250L Freezer','₦420,000','data-ecca6adafdb19da4d83f1c355bd974f17a87aed51acc7881bd5054c29f49e631.jpg'],['Hisense Air Fryer 8L','₦150,000','data-04a8fbcc38eac8c7ebebf35ce73e72de4ee92a931df4c19888fc7702d17b4361.jpg'],['Hisense Microwave & Grill 25L','₦160,000','data-c888d1488f81b8d6bec8da6e94bf15600ba98f3c3deae2138a9908ff4c59f7d5.jpg'],['Hisense Split AC 2.0HP (2pcs)','₦900,000','data-238dc73c34dae7767ce2ef3b89532a218fa9fd332cdc18aeef9352a343c012d2.jpg'],['Hisense Washing Machine 6KG','₦350,000','data-1e3217494195dda17581b1778d690edd4e48c647ebb8ee1f4aa49d7c300472b5.jpg'],['Home Office Desk & Chair','₦460,000','data-1f2e9943fce1cb0a89ea370039f97a2cbdc923c90321d857e21dc956cf4e2e44.jpg'],['Hoover Cordless Vacuum','₦220,000','data-9766e9f1edda262dcceaa3513348c632e6403aa9f4638b1df07bc791743eb99a.jpg'],['Instant Pot 8QT Multi Cooker','₦230,000','data-b2b36fdeec4c4f9babc3119629d849e6be2a97318ca984e8d69d93cfa8e1e195.jpg'],['Islamic Praying Imam Wall Frame','₦25,000','data-ef2db78a2ba981025a575cf111ff4b48ba63232bbfbebecd2b7b9d68870ede26.jpg'],['itel 3.6kW Hybrid Inverter','₦650,000','data-f4f33530f55513b1bcbc361b45f34efcc9a3b5c29ad58476ebfa733b469fb434.jpg'],['Kitchen Knife Set With Holder','₦55,000','data-f0ba84d380f93584171cb8593598a888f61017b9cd329c6f828c268e9b8d5c45.jpg'],['Ox Industrial Standing Fan 26”','₦120,000','data-9b5a2eab5df3f05b20e3e3a927f78c0c7c31e998a50d2042629e1f0569c845d4.jpg'],['Pressing Iron Board','₦35,000','data-aa8782fbd66c2e794048544eba4e1862135dbb85da1a51e9ed39bba84af85fa1.jpg'],['PROEFF All-in-One PC 23.8”','₦450,000','data-15a3b05cb884476eaf514507f3a35e9e9d7bbc029c5f2fccff6df022de674442.jpg'],['Oasa Rechargeable Standing Fan','₦95,000','data-7a91d8b889606c9afe42b748e0bcf861ff9365b7f23903d990dc31cc0c21a334.jpg'],['Samsung 50” 4K Smart TV','₦750,000','data-ad51411247c2698d4e88dd31e05416d520a80ebe69d5ea34206c18c804b5bbac.jpg'],['Toyota Corolla','₦15,000,000','data-770fe366477e956ace392c5748912a164c93e90311600f658aea2438952bf440.jpg'],['Wooden Kitchen Utensils Set','Ask us','data-fe2e3c7d88ab1ec16433409243056b44b999d41ee0901bfa17f6a46b41e04802.jpg']
].map(([name,price,file])=>({name,price,image:`assets/reference/${file}`}));
const giftGrid = document.querySelector('#gift-grid');
let moreGifts = false;
const renderGifts = () => {
  if (!giftGrid) return;
  const gifts = giftOptions;
  const selected = document.querySelector('#gift-sort')?.value || 'featured';
  const ordered = selected === 'az' ? [...gifts].sort((a,b)=>a.name.localeCompare(b.name)) : selected === 'za' ? [...gifts].sort((a,b)=>b.name.localeCompare(a.name)) : gifts;
  const shown = moreGifts ? ordered : ordered.slice(0, 6);
  giftGrid.innerHTML = shown.map(gift => `<article class="gift-card"><img src="${gift.image}" alt="${gift.name}" loading="lazy"><h3>${gift.name}</h3><p>Est. ${gift.price}</p><button type="button" aria-pressed="false" data-gift="${gift.name}">Pledge this gift</button></article>`).join('');
};
renderGifts();
document.querySelector('#gift-sort')?.addEventListener('change', renderGifts);
document.querySelector('#gift-more')?.addEventListener('click', event => { moreGifts = !moreGifts; event.currentTarget.textContent = moreGifts ? 'Show fewer gifts' : 'See more gifts'; renderGifts(); });
giftGrid?.addEventListener('click', event => { const button = event.target.closest('[data-gift]'); if (!button) return; button.setAttribute('aria-pressed', 'true'); button.textContent = 'Pledged'; document.querySelector('#gift-feedback').textContent = 'JazaakumuLlaahu khayran.'; });
document.querySelector('#cash-open')?.addEventListener('click', () => { document.querySelector('#cash-panel').hidden = false; });
document.querySelector('#cash-close')?.addEventListener('click', () => { document.querySelector('#cash-panel').hidden = true; });
