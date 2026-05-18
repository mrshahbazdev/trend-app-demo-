import re

with open(r'Prototype.html', 'r', encoding='utf-8') as f:
    html = f.read()

screens = ['Register V1', 'Register V2', 'Register V3', 'Sign In V1']

for screen_name in screens:
    idx = html.find(screen_name)
    if idx == -1:
        print(f'--- {screen_name}: NOT FOUND ---')
        continue
    
    srcdoc_start = html.find('srcdoc=', idx)
    quote_char = html[srcdoc_start+7]
    content_start = srcdoc_start + 8
    end_marker = quote_char + '></iframe>'
    content_end = html.find(end_marker, content_start)
    
    content = html[content_start:content_end]
    content = content.replace('&lt;', '<').replace('&gt;', '>').replace('&amp;', '&').replace('&quot;', '"')
    content_clean = re.sub(r'src="data:image/[^"]*"', 'src="IMG"', content)
    content_clean = re.sub(r'url\(data:image/[^)]*\)', 'url(IMG)', content_clean)
    
    print(f'\n\n========== {screen_name} ==========')
    print(f'Length: {len(content_clean)}')
    print(content_clean[:6000])
    print('... [truncated]' if len(content_clean) > 6000 else '')
