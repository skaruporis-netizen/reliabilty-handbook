(function(global){
'use strict';
const supported=['de','en','zh'];let lang='de';
try{const q=new URL(global.location?.href||'https://local.invalid').searchParams.get('lang');const stored=global.localStorage?.getItem('reliability-language');if(supported.includes(q))lang=q;else if(supported.includes(stored))lang=stored;}catch{}
const extra={
 'Deutsch':{en:'Deutsch',zh:'Deutsch'},'English':{en:'English',zh:'English'},'简体中文':{en:'简体中文',zh:'简体中文'},
 'Kapitel':{en:'Chapter',zh:'章节'},'Zu Kapitel':{en:'For chapter',zh:'对应章节'},'Musterantwort ansehen':{en:'Show model answer',zh:'查看参考答案'},
 'KAPITEL':{en:'CHAPTER',zh:'章节'},'von 20 Kapiteln gelesen':{en:'of 20 chapters read',zh:'/ 20 章已读'},
 'Gelesene Kapitel':{en:'Chapters read',zh:'已读章节'},'Handbuch':{en:'Handbook',zh:'手册'},'Inhalt':{en:'Contents',zh:'目录'},
 'Quelle öffnen':{en:'Open source',zh:'打开来源'},'Schritt':{en:'Step',zh:'步骤'},'Zu deiner Frage finde ich diese Handbuchstelle. Sie ist ein Auszug und keine speziell auf dein Produkt geprüfte Antwort.':{en:'I found this handbook passage for your question. It is an excerpt, not an answer specifically verified for your product.',zh:'针对你的问题，我找到了以下手册内容。这是原文摘录，并非经过针对你产品的验证的具体回答。'},
 'Schaubild':{en:'Figure',zh:'图'},'Grafiken sind Originalabbildungen. Die übersetzten Beschriftungen findest du darunter.':{en:'These are the original figures. Translated labels are provided below.',zh:'此处显示原始图。翻译后的标签列在下方。'},
 'Zum Vergrößern anklicken':{en:'Click to enlarge',zh:'点击放大'},'vergrößern':{en:'enlarge',zh:'放大'},'Beschriftungen':{en:'Figure labels',zh:'图中标签'},'Sprachwahl':{en:'Language',zh:'语言'},
 'Die deutsche Word-Fassung herunterladen':{en:'Download the German Word edition',zh:'下载德语 Word 版本'},
 'bei null Ausfällen':{en:'with zero failures',zh:'零失效时'},'bei Nullausfallregel':{en:'under the zero-failure rule',zh:'采用零失效判据时'},'für Ereigniszeiten bis t':{en:'for event times up to t',zh:'对于截至 t 的事件时刻'},
};
function dictionary(){return {...(global.UI_TRANSLATIONS||{}),...extra};}
function tr(value){const s=String(value??'');if(lang==='de')return s;const d=dictionary();if(d[s])return d[s][lang]||s;const trimmed=s.trim();if(d[trimmed])return s.replace(trimmed,d[trimmed][lang]||trimmed);
 // Dynamic UI labels keep counts and symbols while replacing the fixed words.
 let out=s;const keys=Object.keys(d).filter(k=>k.length>=3).sort((a,b)=>b.length-a.length);for(const key of keys){if(!out.includes(key))continue;const start=out.indexOf(key),before=out[start-1],after=out[start+key.length];if(before&&/[\p{L}]/u.test(before)||after&&/[\p{L}]/u.test(after))continue;out=out.split(key).join(d[key][lang]||key);}return out;
}
function html(value){if(lang==='de')return value;const saved=[];let text=String(value).replace(/<(textarea|math)\b[^>]*>[\s\S]*?<\/\1>|<section\b[^>]*class="[^"]*reader-section[^\"]*"[^>]*>[\s\S]*?<\/section>|<[^>]+data-user-text[^>]*>[\s\S]*?<\/[^>]+>/g,m=>{saved.push(m);return'<!--LOCALE_KEEP_'+(saved.length-1)+'-->';});
 const decode=s=>s.replace(/&amp;/g,'&').replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/&lt;/g,'<').replace(/&gt;/g,'>');
 const encode=s=>s.replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
 text=text.replace(/(^|>)([^<>]*)(?=<|$)/g,(_,lead,s)=>lead+encode(tr(decode(s))));
 text=text.replace(/\b(placeholder|aria-label|title|data-question)="([^"]*)"/g,(_,attr,s)=>attr+'="'+encode(tr(decode(s)))+'"');
 return text.replace(/<!--LOCALE_KEEP_(\d+)-->/g,(_,i)=>saved[Number(i)]);
}
function set(next){if(!supported.includes(next))return false;lang=next;try{global.localStorage?.setItem('reliability-language',next);}catch{}return true;}
const queryAliases=[
 [['失效模式与影响分析','故障模式与影响分析'],'FMEA'],[['基于模型的系统工程','模型化系统工程'],'MBSE'],[['平均累计事件数','平均累积函数'],'MCF'],[['系统理论过程分析'],'STPA'],
 [['quality','质量'],'Qualität'],[['reliability','可靠性'],'Zuverlässigkeit'],[['confidence level','confidence','置信水平','置信度','置信'],'Konfidenzniveau'],[['supplier','供应商','供方'],'Zulieferer Nachweise'],[['qualification','鉴定','资格确认'],'Qualifikation'],[['lifetime','life time','寿命'],'Lebensdauer'],[['sample size','samples','样本量','样本数','试样数量'],'Stichprobe Musterzahl'],[['zero failure','零失效','无失效'],'Nullausfall'],[['failure','故障','失效'],'Ausfall'],[['integration','集成','协同'],'Integration'],[['field monitoring','field failures','现场监测','现场故障'],'Feldmonitoring Feldausfälle'],[['system boundary','系统边界'],'Systemgrenze'],[['input','输入'],'Input'],[['output','输出'],'Output'],[['system of systems','系统之系统','系统体系'],'System of Systems'],[['temperature','温度'],'Temperatur'],[['humidity','moisture','湿度','潮湿'],'Feuchte'],[['radiation','辐射'],'Strahlenfestigkeit'],[['storage','储存','贮存'],'Lagerung'],[['fatigue','疲劳'],'Ermüdung'],[['mechanical','机械'],'mechanische Festigkeit'],[['software','软件'],'Software'],[['firmware','固件'],'Firmware'],[['update','version','更新','版本'],'Update Version'],[['censoring','删失'],'Zensierung'],[['common cause','共同原因','共因'],'gemeinsame Ursache'],[['fault tree','故障树'],'Fehlerbaum'],[['availability','可用性'],'Verfügbarkeit'],[['resilience','韧性','恢复能力'],'Resilienz'],[['verification','验证'],'Verifikation'],[['validation','确认'],'Validierung'],[['repeat','retest','重复','重新测试'],'wiederholen Prüfungen'],[['worst case','最不利','最坏'],'ungünstig Stress'],[['evidence','证据'],'Nachweis'],[['and what does that mean','what does that mean','这是什么意思'],'was bedeutet das']
];
function canonical(q){let s=String(q).toLowerCase();for(const [terms,target]of queryAliases)for(const term of terms)s=s.split(term).join(target);return s;}
const API={get lang(){return lang;},get locale(){return lang==='zh'?'zh-CN':lang==='en'?'en-US':'de-DE';},tr,html,set,canonical};global.L=API;
})(typeof window!=='undefined'?window:globalThis);
