import re
with open(r'Prototype.html','r',encoding='utf-8') as f:
    html=f.read()
for name in ['Invite V1','Invite V2']:
    idx=html.find(name)
    if idx==-1: continue
    s=html.find('srcdoc=',idx)
    q=html[s+7]
    cs=s+8
    ce=html.find(q+'></iframe>',cs)
    c=html[cs:ce]
    c=c.replace('&lt;','<').replace('&gt;','>').replace('&amp;','&').replace('&quot;','"')
    c=re.sub(r'src="data:image/[^"]*"','src="IMG"',c)
    c=re.sub(r'url\(data:image/[^)]*\)','url(IMG)',c)
    print(f'===== {name} =====')
    print(c)
