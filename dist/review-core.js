(function(root){'use strict';
const repo='skaruporis-netizen/reliabilty-handbook';
function issueUrl(record){
 const title='[Handbook review] '+record.anchor+' · '+record.comment.slice(0,70).replace(/\s+/g,' ');
 const body=['## Original reviewer comment',record.comment,'','## Version and location',
 'Application: '+record.version,'Content: '+record.contentVersion,'Source commit: '+record.sourceCommit,
 'Language: '+record.language,'Stable anchor: '+record.anchor,'Chapter: '+record.chapter,
 'Section: '+(record.section||'(whole chapter)'),'Published location: '+record.url,
 'Versioned source: https://github.com/'+repo+'/tree/'+record.sourceCommit,'',
 '## Quoted passage',record.quote||'(No passage selected)','','## Editorial workflow',
 '- [ ] Triage: clarify meaning and check related passages',
 '- [ ] Decision recorded with responsible person, date and rationale',
 '- [ ] If accepted: assign to Copilot to prepare a linked pull request',
 '- [ ] Human technical review completed',
 '- [ ] Published version and commit linked; then close this issue','',
 'Keep the original comment unchanged. Append decisions and proposals as replies. Do not close as implemented until the published change is linked.'].join('\n');
 return 'https://github.com/'+repo+'/issues/new?'+new URLSearchParams({title,body});
}
const api={repo,issueUrl};if(typeof module!=='undefined')module.exports=api;root.HandbookReview=api;
})(typeof window!=='undefined'?window:globalThis);
