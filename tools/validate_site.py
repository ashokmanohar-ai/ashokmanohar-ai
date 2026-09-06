#!/usr/bin/env python3
"""Dependency-free pre-deployment checks for the static portfolio."""
from __future__ import annotations
import json, re, sys
from html.parser import HTMLParser
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
ERRORS=[]
WARNINGS=[]

class LinkParser(HTMLParser):
    def __init__(self):
        super().__init__(); self.refs=[]; self.ids=set(); self.description=False; self.canonical=False
    def handle_starttag(self, tag, attrs):
        a=dict(attrs)
        if a.get('id'): self.ids.add(a['id'])
        if tag=='a' and a.get('href'): self.refs.append(('href',a['href']))
        if tag in {'img','script'} and a.get('src'): self.refs.append(('src',a['src']))
        if tag=='link' and a.get('href'):
            if a.get('rel')=='canonical': self.canonical=True
            if a.get('rel') in {'stylesheet','icon'}: self.refs.append(('href',a['href']))
        if tag=='meta' and a.get('name')=='description' and a.get('content'): self.description=True


def validate_json():
    for p in (ROOT/'data').glob('*.json'):
        try: json.loads(p.read_text(encoding='utf-8'))
        except Exception as e: ERRORS.append(f'{p.relative_to(ROOT)}: invalid JSON: {e}')


def resolve(page:Path, ref:str):
    ref=ref.split('#',1)[0].split('?',1)[0]
    if not ref: return page
    if ref.startswith('/'):
        return ROOT/ref.lstrip('/')
    return (page.parent/ref).resolve()


def validate_html():
    pages=list(ROOT.rglob('*.html'))
    if not pages: ERRORS.append('No HTML pages found'); return
    for page in pages:
        text=page.read_text(encoding='utf-8')
        parser=LinkParser(); parser.feed(text)
        if '<title>' not in text: ERRORS.append(f'{page.relative_to(ROOT)}: missing title')
        if not parser.description: ERRORS.append(f'{page.relative_to(ROOT)}: missing meta description')
        if not parser.canonical: ERRORS.append(f'{page.relative_to(ROOT)}: missing canonical URL')
        if 'id="main"' not in text: ERRORS.append(f'{page.relative_to(ROOT)}: missing main landmark id')
        if 'skip-link' not in text: WARNINGS.append(f'{page.relative_to(ROOT)}: missing skip link')
        for kind,ref in parser.refs:
            if ref.startswith(('#','mailto:','tel:','data:','javascript:')): continue
            if re.match(r'^https?://', ref): continue
            target=resolve(page,ref)
            try: target.relative_to(ROOT.resolve())
            except ValueError:
                ERRORS.append(f'{page.relative_to(ROOT)}: reference escapes site root: {ref}'); continue
            if not target.exists(): ERRORS.append(f'{page.relative_to(ROOT)}: broken {kind}: {ref}')


def validate_required():
    req=['index.html','about.html','expertise.html','projects.html','architecture.html','publications.html','articles.html','resume.html','contact.html','assets/css/main.css','assets/js/main.js','assets/og-image.png','assets/Ashok-Kumar-Manohar-Resume.pdf','data/profile.json','data/projects.json','data/publications.json','data/articles.json','.github/workflows/deploy.yml','robots.txt','sitemap.xml','README.md','LICENSE']
    for rel in req:
        if not (ROOT/rel).exists(): ERRORS.append(f'Missing required file: {rel}')


def validate_profile():
    try: p=json.loads((ROOT/'data/profile.json').read_text())
    except Exception: return
    if not p.get('github'): ERRORS.append('profile.json: GitHub URL is not configured')
    if not p.get('linkedin'): WARNINGS.append('profile.json: LinkedIn URL is not configured')
    if p.get('email'):
        WARNINGS.append('profile.json: public email is configured; confirm this is intentional')

if __name__=='__main__':
    validate_json(); validate_required(); validate_html(); validate_profile()
    for w in WARNINGS: print('WARNING:',w)
    for e in ERRORS: print('ERROR:',e)
    print(f'Checked site: {len(ERRORS)} error(s), {len(WARNINGS)} warning(s)')
    sys.exit(1 if ERRORS else 0)
