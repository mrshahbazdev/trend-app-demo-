import re
with open(r'Prototype.html', 'r', encoding='utf-8') as f:
    html = f.read()
screen_name = 'Register V2'
idx = html.find(screen_name)
srcdoc_start = html.find('srcdoc=', idx)
quote_char = html[srcdoc_start+7]
content_start = srcdoc_start + 8
end_marker = quote_char + '></iframe>'
content_end = html.find(end_marker, content_start)
content = html[content_start:content_end]
content = content.replace('&lt;', '<').replace('&gt;', '>').replace('&amp;', '&').replace('&quot;', '"')
content_clean = re.sub(r'src="data:image/[^"]*"', 'src="IMG"', content)
content_clean = re.sub(r'url\(data:image/[^)]*\)', 'url(IMG)', content_clean)
print(content_clean)
