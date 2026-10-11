import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import path from 'node:path';

const context={window:{},console};vm.createContext(context);
for(const file of ['book-data','book-en','book-zh','ui-locales','figure-labels','i18n','engine'])vm.runInContext(fs.readFileSync(`dist/${file}.js`,'utf8'),context);
context.L=context.window.L;const book=context.window.BOOK,engine=context.window.ReliabilityEngine.create(book);
assert.equal(book.chapters.length,26);assert.equal(book.figures.length,10);assert.equal(book.chapters.filter(c=>/^chapter_/.test(c.id)).length,20);
assert.equal(book.chapters.flatMap(c=>c.sections.flatMap(s=>s.blocks)).filter(b=>b.type==='math').length,19);
const ids=new Set(book.chapters.map(c=>c.id));let paragraphs=0;
for(const c of book.chapters)for(const s of c.sections)for(const b of s.blocks){
 if(b.type==='paragraph')paragraphs++;
 if(b.type==='image')assert.ok(fs.existsSync(path.join('dist',b.src)));
 for(const [,href]of (b.html||'').matchAll(/href="(#.*?)"/g)){
  const [id,anchor]=href.slice(1).split('/');assert.ok(ids.has(id)||['home','figures'].includes(id),'Missing route '+href);
  if(anchor?.startsWith('source_'))assert.ok(book.chapters.flatMap(c=>c.sections.flatMap(s=>s.blocks)).some(b=>b.anchor===anchor),'Missing source '+anchor);
 }
}
for(const f of book.figures){assert.ok(fs.existsSync(path.join('dist',f.src)));assert.ok(ids.has(f.chapter));}
const cases=[
 ['Muss ich Zulieferprüfungen wiederholen?',11],['Was bedeutet Konfidenzniveau?',14],['Wie bereite ich eine FMEA vor?',8],['Was bedeutet MBSE?',6],['Was ist die MCF?',18],['Ist ein mobiler Detektor ein System of Systems?',3],['Wie funktioniert STPA?',9],['Wie bewertet man Firmware Updates?',6],['Was unterscheidet Qualität und Zuverlässigkeit?',1],['Was ist die Strahlenfestigkeit?',12]
];
for(const[q,ref]of cases){const answer=engine.answer(q);assert.equal(answer.kind,'answer');assert.ok(answer.refs.includes(ref),q);assert.ok(engine.search(q).length,q);}
for(const q of ['Wie wird das Wetter morgen?','qzqzqzqzqz'])assert.equal(engine.answer(q).kind,'unknown');
assert.equal(engine.search('qzqzqzqzqz').length,0);
assert.equal(engine.search('Temperaturwechsel',1)[0].chapter,'chapter_12');
assert.ok(engine.search('Input Output FMEA',6).some(r=>r.chapter==='chapter_8'));
assert.ok(engine.answer('Was bedeutet das?','Was ist die MCF?').refs.includes(18));

// Test the actual app handlers with a small DOM adapter, without launching a browser.
class Element{
 constructor(id){this.id=id;this.value='';this.hidden=true;this.style={};this.dataset={};this.children=[];this.attrs={};this.textContent='';this.listeners={};this._html='';this.className='';this.classList={toggle:()=>true,remove:()=>{},contains:()=>false};}
 set innerHTML(value){this._html=value;for(const match of value.matchAll(/id="([^"]+)"[^>]*>/g)){const el=elements[match[1]]||new Element(match[1]);const v=match[0].match(/value="([^"]*)"/);if(v)el.value=v[1];elements[match[1]]=el;}}
 get innerHTML(){return this._html;}
 append(el){this.children.push(el);}focus(){this.focused=true;}click(){}setAttribute(k,v){this.attrs[k]=v;}getAttribute(k){return this.attrs[k];}hasAttribute(k){return k in this.attrs;}scrollIntoView(){this.scrolled=true;}showModal(){this.open=true;}close(){this.open=false;}closest(){return this;}
}
const elements={};for(const id of ['main','chapters','progress-label','progress-bar','toast','sidebar','menu-toggle','search-input','chat-panel','chat-input','chat-messages','modal-image','modal-caption','figure-modal'])elements[id]=new Element(id);
const events={},mem={};const languageButtons=['de','en','zh'].map(language=>Object.assign(new Element(''),{dataset:{language}}));const document={documentElement:{lang:'de'},querySelector:s=>elements[s.slice(1)]||new Element(s),querySelectorAll:s=>s==='[data-language]'?languageButtons:[],getElementById:id=>elements[id],createElement:()=>new Element(''),addEventListener:(k,fn)=>events[k]=fn};
let hashValue='#home';const location={get hash(){return hashValue;},set hash(v){hashValue=v.startsWith('#')?v:'#'+v;}};const winEvents={};let timers=[];
Object.assign(context,{document,location,localStorage:{getItem:k=>mem[k]||null,setItem:(k,v)=>mem[k]=v},requestAnimationFrame:fn=>fn(),setTimeout:fn=>{timers.push(fn);return timers.length;},clearTimeout:()=>{},URL:{createObjectURL:()=>'',revokeObjectURL:()=>{}},Blob:class{},ReliabilityEngine:context.window.ReliabilityEngine});
Object.assign(context.window,{localStorage:context.localStorage,addEventListener:(k,fn)=>winEvents[k]=fn,scrollTo:()=>{},scrollY:0});
vm.runInContext(fs.readFileSync('dist/app.js','utf8'),context);
const route=hash=>{location.hash=hash;winEvents.hashchange();};
assert.ok(elements.main.innerHTML.includes('Von der Frage'));
for(const c of book.chapters){route('#'+c.id);assert.ok(elements.main.innerHTML.includes(c.title.replace(/^\d+ /,'')),c.id);}
route('#sources/source_Q01');assert.ok(elements.source_Q01.scrolled);
route('#figures/diagram_A');assert.ok(elements.diagram_A.scrolled);assert.equal((elements.main.innerHTML.match(/class="figure-card"/g)||[]).length,10);
route('#chapter_15');assert.ok(elements.main.innerHTML.includes('<math '));assert.ok(elements.main.innerHTML.includes('Musterantwort ansehen'));
events.click({target:Object.assign(new Element('mark-read'),{dataset:{number:'15'}})});assert.deepEqual(JSON.parse(mem['reliability-workbook-v1']).read,[15]);
route('#navigator/supplier/0');assert.ok(elements.main.innerHTML.includes('Einsatz beschreiben'));
events.input({target:{id:'case-name',value:'Detektor – Prüfung'}});assert.equal(JSON.parse(mem['reliability-workbook-v1']).caseName,'Detektor – Prüfung');
events.input({target:{id:'step-notes',value:'<script>alert(1)</script>',dataset:{key:'supplier-0'}}});route('#navigator/supplier/0');assert.ok(elements.main.innerHTML.includes('&lt;script&gt;'));
events.change({target:{dataset:{check:'supplier-0-0'},checked:true}});assert.equal(JSON.parse(mem['reliability-workbook-v1']).checks['supplier-0-0'],true);
route('#tools');assert.ok(elements['calc-result'].innerHTML.includes('29 '));
elements['target-r'].value='95';elements['target-c'].value='95';events.submit({preventDefault(){},target:{id:'calc-form'}});assert.ok(elements['calc-result'].innerHTML.includes('59 '));
elements['target-r'].value='99';events.submit({preventDefault(){},target:{id:'calc-form'}});assert.ok(elements['calc-result'].innerHTML.includes('299 '));
elements['target-r'].value='100';events.submit({preventDefault(){},target:{id:'calc-form'}});assert.ok(elements['calc-result'].innerHTML.includes('strikt zwischen'));
elements['search-input'].value='FMEA';events.submit({preventDefault(){},target:{id:'search-form'}});assert.equal(location.hash,'#search/FMEA');winEvents.hashchange();assert.ok(elements.main.innerHTML.includes('FMEA'));
events.click({target:Object.assign(new Element(''),{dataset:{question:'Was ist die MCF?'}})});assert.equal(elements['chat-panel'].hidden,false);assert.ok(elements['chat-messages'].children.some(e=>e.innerHTML.includes('Kapitel 18')));
events.click({target:Object.assign(new Element(''),{dataset:{image:book.figures[0].src,caption:'Schaubild A'}})});assert.equal(elements['figure-modal'].open,true);
route('#does-not-exist');assert.ok(elements.main.innerHTML.includes('nicht gültig'));
// A language change must translate the actual routes while keeping user work intact.
const savedWork=mem['reliability-workbook-v1'];
const multilingualCases={
 en:[['What is the difference between quality and reliability?',1],['Must I repeat supplier tests?',11],['What is a confidence level?',14],['How do I prepare an input output FMEA?',8],['What is MBSE?',6],['What is MCF?',18],['What is radiation resistance?',12]],
 zh:[['质量与可靠性有何区别？',1],['需要重复供应商测试吗？',11],['什么是置信水平？',14],['如何准备输入输出失效模式与影响分析？',8],['什么是基于模型的系统工程？',6],['什么是平均累积函数？',18],['如何评估辐射耐受性？',12]]
};
let languageSearches=0;
for(const lang of ['en','zh','de']){
 const translated=context.window.BOOKS[lang];assert.equal(translated.chapters.length,26);assert.equal(translated.figures.length,10);
 assert.equal(translated.chapters.reduce((n,c)=>n+c.sections.length,0),235);
 assert.equal(translated.chapters.flatMap(c=>c.sections.flatMap(s=>s.blocks)).filter(b=>b.type==='math').length,19);
 route('#chapter_15/section-0');
 events.click({target:languageButtons.find(b=>b.dataset.language===lang)});
 assert.equal(location.hash,'#chapter_15/section-0');assert.equal(mem['reliability-language'],lang);assert.equal(document.documentElement.lang,context.L.locale);
 assert.equal(mem['reliability-workbook-v1'],savedWork,'Language switch changed user work');
 for(const b of languageButtons)assert.equal(b.getAttribute('aria-pressed'),String(b.dataset.language===lang));
 assert.ok(elements.main.innerHTML.includes(context.L.tr('Musterantwort ansehen')),'Translated model answer missing');
 assert.ok(elements.main.innerHTML.includes('<math '),'Formula lost during language switch');
 for(const c of translated.chapters){route('#'+c.id);assert.ok(elements.main.innerHTML.includes(c.title.replace(/^\d+ /,'')),lang+':'+c.id);}
 route('#navigator/supplier/0');assert.ok(elements.main.innerHTML.includes('&lt;script&gt;alert(1)&lt;/script&gt;'),'User notes changed');
 assert.ok(elements.main.innerHTML.includes(context.L.tr('Einsatz beschreiben')),'Workflow missing translation');
 route('#tools');assert.ok(elements.main.innerHTML.includes('Detektor – Prüfung'),'User input was translated');assert.ok(elements['calc-result'].innerHTML.includes('29 '));
 route('#figures/diagram_A');assert.ok(elements.diagram_A.scrolled);
 if(lang!=='de')assert.ok(elements.main.innerHTML.includes(context.L.tr('Beschriftungen')),'Figure legend missing');
 const localizedEngine=context.window.ReliabilityEngine.create(translated,{canonicalQuery:context.L.canonical});
 for(const[q,ref]of multilingualCases[lang]||[]){
  const answer=localizedEngine.answer(q);assert.equal(answer.kind,'answer',lang+':'+q);assert.ok(answer.refs.includes(ref),q);
  assert.notEqual(context.L.tr(answer.text),answer.text,'FAQ was not translated: '+q);
  assert.ok(localizedEngine.search(q).length,'No search result: '+q);languageSearches++;
 }
 if(lang!=='de'){
  const follow=localizedEngine.answer(lang==='en'?'What does that mean?':'这是什么意思？',lang==='en'?'What is a confidence level?':'什么是置信水平？');assert.ok(follow.refs.includes(14),'Translated follow-up failed');
  const q=lang==='en'?'confidence level':'置信水平';elements['search-input'].value=q;events.submit({preventDefault(){},target:{id:'search-form'}});winEvents.hashchange();assert.ok(elements.main.innerHTML.includes(q),'Localized search route failed');
  events.click({target:Object.assign(new Element(''),{dataset:{question:q}})});assert.ok(elements['chat-messages'].children.some(e=>e.innerHTML.includes(context.L.tr('Kapitel')+' 14')),'Translated assistant chapter link missing');
 }
}
// Direct links override a saved preference on first load; invalid preferences fall back.
for(const[query,stored,expected]of [['en','zh','en'],['zh','de','zh'],['unknown','en','en'],['unknown','unknown','de']]){
 const init={window:{location:{href:'https://example.test/?lang='+query},localStorage:{getItem:()=>stored}},URL};vm.createContext(init);vm.runInContext(fs.readFileSync('dist/i18n.js','utf8'),init);assert.equal(init.window.L.lang,expected);
}
console.log(JSON.stringify({status:'passed',languages:['de','en','zh'],chapters_per_language:26,sections_per_language:235,figures_per_language:10,math_per_language:19,paragraphs,search_cases:cases.length+languageSearches,ui_handlers:'navigation, source anchors, figure anchors, reading, checklist, notes, calculator, search, chat, zoom, language switch, language persistence, translated model answers',browser_visual_qa:'not available'}));
