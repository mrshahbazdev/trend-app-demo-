import re

with open(r'Prototype.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Find Landing V1 section
idx = html.find('Landing V1')
print(f'Landing V1 position: {idx}')

# Find the iframe srcdoc after this label
srcdoc_start = html.find('srcdoc=', idx)
quote_char = html[srcdoc_start+7]
content_start = srcdoc_start + 8

# Find closing
end_marker = quote_char + '></iframe>'
content_end = html.find(end_marker, content_start)
print(f'Content length: {content_end - content_start}')

content = html[content_start:content_end]

# Decode HTML entities
content = content.replace('&lt;', '<').replace('&gt;', '>').replace('&amp;', '&').replace('&quot;', '"')

# Remove base64 image data but keep the structure
content_clean = re.sub(r'src="data:image/[^"]*"', 'src="LOGO_IMAGE"', content)
content_clean = re.sub(r'url\(data:image/[^)]*\)', 'url(BG_IMAGE)', content_clean)

print(content_clean[:8000])
print('\n\n--- END PREVIEW ---')
print(f'Total clean length: {len(content_clean)}')
