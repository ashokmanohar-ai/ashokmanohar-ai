#!/usr/bin/env python3
"""Rewrite absolute SEO URLs for root- or project-site GitHub Pages deployment."""
from __future__ import annotations
import argparse, json, re
from pathlib import Path
from urllib.parse import urlparse

ROOT = Path(__file__).resolve().parents[1]
DEFAULT = "https://ashokmanohar-ai.github.io"


def normalized(url: str) -> str:
    url = url.strip().rstrip('/')
    parsed = urlparse(url)
    if parsed.scheme not in {"http", "https"} or not parsed.netloc:
        raise SystemExit("--site-url must be an absolute http(s) URL")
    return url


def page_url(base: str, page: Path) -> str:
    rel = page.relative_to(ROOT).as_posix()
    return base + ('/' if rel == 'index.html' else '/' + rel)


def rewrite_html(base: str) -> None:
    for page in ROOT.rglob('*.html'):
        if '.git' in page.parts:
            continue
        text = page.read_text(encoding='utf-8')
        current = page_url(base, page)
        image = base + '/assets/og-image.png'
        text = re.sub(r'(<link rel="canonical" href=")[^"]*(")', rf'\g<1>{current}\2', text)
        text = re.sub(r'(<meta property="og:url" content=")[^"]*(")', rf'\g<1>{current}\2', text)
        text = re.sub(r'(<meta property="og:image" content=")[^"]*(")', rf'\g<1>{image}\2', text)
        text = re.sub(r'(<meta name="twitter:image" content=")[^"]*(")', rf'\g<1>{image}\2', text)
        text = text.replace(f'"url":"{DEFAULT}"', f'"url":"{base}"')
        text = re.sub(r'"url":"https://[^\"]+\.github\.io(?:/[^\"]*)?"(?=,"jobTitle")', f'"url":"{base}"', text)
        page.write_text(text, encoding='utf-8')


def write_discovery(base: str) -> None:
    pages = sorted(p for p in ROOT.rglob('*.html') if '.git' not in p.parts)
    urls = [page_url(base, p) for p in pages]
    sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
    sitemap += ''.join(f'  <url><loc>{u}</loc></url>\n' for u in urls)
    sitemap += '</urlset>\n'
    (ROOT/'sitemap.xml').write_text(sitemap, encoding='utf-8')
    (ROOT/'robots.txt').write_text(f'User-agent: *\nAllow: /\n\nSitemap: {base}/sitemap.xml\n', encoding='utf-8')


def update_profile(base: str) -> None:
    path = ROOT/'data/profile.json'
    data = json.loads(path.read_text(encoding='utf-8'))
    data['siteUrl'] = base
    path.write_text(json.dumps(data, indent=2, ensure_ascii=False)+'\n', encoding='utf-8')


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument('--site-url', required=True, help='e.g. https://user.github.io or https://user.github.io/repo')
    args = parser.parse_args()
    base = normalized(args.site_url)
    rewrite_html(base)
    write_discovery(base)
    update_profile(base)
    print(f'SEO URLs configured for {base}')

if __name__ == '__main__':
    main()
