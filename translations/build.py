"""Package reviewed translation assets; preserve routes, symbols, and citations."""
import copy, json, re
from pathlib import Path
from html import unescape
ROOT=Path(__file__).resolve().parent.parent
T=ROOT/'translations'
original=json.loads((T/'de-book.json').read_text())
refs=json.loads((T/'refs.json').read_text())
translations=json.loads((T/'fixed.json').read_text())
for i in range(1,6):
    inp=json.loads((T/f'input-{i}.json').read_text())
    out=json.loads((T/f'output-{i}.json').read_text())
    assert set(out)=={x['key']for x in inp},f'Shard {i} missing keys'
    for x in inp:
        for lang in ['en','zh']:
            text=out[x['key']][lang]
            assert isinstance(text,str)and text.strip(),x['key']
            assert re.findall(r'<[^>]+>',text)==re.findall(r'<[^>]+>',x['de']),('HTML changed',i,x['key'],lang)
            assert re.findall(r'\[[QN]\d+\]',text)==re.findall(r'\[[QN]\d+\]',x['de']),('Citation changed',x['key'])
    translations.update(out)
assert set(translations)=={r['key']for r in refs}
def plain(s):return unescape(re.sub(r'<[^>]+>',' ',s))
for lang in ['de','en','zh']:
    book=copy.deepcopy(original)
    if lang!='de':
        for r in refs:
            target=book
            for key in r['ref'][:-1]:target=target[key]
            target[r['ref'][-1]]=translations[r['key']][lang]
    for ci,c in enumerate(book['chapters']):
        for si,s in enumerate(c['sections']):
            for b in s['blocks']:
                if 'html'in b:b['text']=plain(b['html'])
                elif 'rows'in b:b['text']=' '.join(plain(t)for row in b['rows']for t in row)
            s['text']='\n'.join(b.get('text','')for b in s['blocks'])
        c['text']='\n'.join(s['text']for s in c['sections'])
    for i,f in enumerate(book['figures']):f['key']=re.search(r'Schaubild ([A-J])',original['figures'][i]['caption']).group(1)
    book['locale']=lang
    if lang=='de':
        (ROOT/'dist/book-data.js').write_text('window.BOOK='+json.dumps(book,ensure_ascii=False)+';\nwindow.BOOKS={de:window.BOOK};\n')
    else:(ROOT/f'dist/book-{lang}.js').write_text('window.BOOKS.'+lang+'='+json.dumps(book,ensure_ascii=False)+';\n')
ui=json.loads((T/'ui.json').read_text())
assert all(v.get('en')and v.get('zh')for v in ui.values())
(ROOT/'dist/ui-locales.js').write_text('window.UI_TRANSLATIONS='+json.dumps(ui,ensure_ascii=False)+';\n')
print(json.dumps({'translation_units':len(translations),'interface_phrases':len(ui),'languages':['de','en','zh'],'chapters_per_language':len(original['chapters'])}))
