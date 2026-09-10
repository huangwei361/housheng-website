# -*- coding: utf-8 -*-
"""把 6 个 biz-*.html 里的 '加微信购买' / '立即报名' 链接改成对应详情页"""
from pathlib import Path
import re

BASE = Path(r"C:\Users\64549\.minimax\大健康公司\website")

# 商品/课程 slug 与详情页的对应（按出现顺序扫描）
SLUGS = {
    "nutrition":   ["qushi-tea", "fish-oil", "vit-d3-k2", "probiotics", "juhua-tea", "bazheng-powder", "honey", "body-scale", "health-pot"],
    "fitness":     ["yoga-mat", "pilates-ring", "yoga-block", "dumbbell", "resistance-band", "foam-roller"],
    "gongfa":      ["training-suit", "taiji-shoes", "taichi-socks", "meditation-cushion", "baduanjin-book"],
    "tcm":         ["mugwort-stick", "moxibustion-box", "foot-moxa", "bian-stone", "cupping-set", "massage-hammer"],
    "mind":        ["sleep-tea", "sleep-band", "lavender-oil", "meditation-cushion-m", "sleep-headphone"],
    "checkup":     ["body-scale-c", "bp-monitor", "blood-glucose", "oximeter", "dna-test"],
}
COURSE_SLUGS = {
    "nutrition":   ["consult-1v1", "family-21day", "chronic-6m", "kids-1m"],
    "fitness":     ["yoga-21day", "pilates-8w", "postpartum-1v1", "fat-loss-28d", "pt-1v1"],
    "gongfa":      ["baduanjin-21d", "taiji-8w", "jingang-30d", "meditation-14d"],
    "tcm":         ["shoulder-60m", "tizhi-12w", "women-8w", "home-moxa-14d"],
    "mind":        ["psy-1v1", "cbti-21d", "mbsr-8w", "teen-3m"],
    "checkup":     ["free-body-test", "deep-test", "chronic-12m"],
}

for biz_key in SLUGS.keys():
    biz_file = BASE / f"biz-{biz_key}.html"
    if not biz_file.exists():
        print(f"SKIP {biz_file.name}")
        continue
    text = biz_file.read_text(encoding="utf-8")
    p_slugs = SLUGS[biz_key]
    c_slugs = COURSE_SLUGS[biz_key]

    # 替换商品按钮：按顺序替换
    p_idx = [0]
    def repl_product(m):
        i = p_idx[0]
        p_idx[0] += 1
        if i < len(p_slugs):
            slug = p_slugs[i]
            return f'href="details/{biz_key}-p{slug}.html"'
        return m.group(0)
    text = re.sub(r'href="shop\.html"\s+class="btn btn-primary btn-block"', repl_product, text)
    # 也覆盖 a href="#consult" class="btn btn-primary btn-block" 的商品（如果有）
    p_idx2 = [0]
    def repl_product2(m):
        i = p_idx2[0]
        p_idx2[0] += 1
        if i < len(p_slugs):
            slug = p_slugs[i]
            return f'href="details/{biz_key}-p{slug}.html" class="btn btn-primary btn-block"'
        return m.group(0)
    text = re.sub(r'href="#consult"\s+class="btn btn-primary btn-block"', repl_product2, text)

    # 替换课程/咨询按钮
    c_idx = [0]
    def repl_course(m):
        i = c_idx[0]
        c_idx[0] += 1
        if i < len(c_slugs):
            slug = c_slugs[i]
            return f'href="details/{biz_key}-c{slug}.html"'
        return m.group(0)
    # 课程卡片用 "立即报名" 或 "立即预约" 按钮
    text = re.sub(r'<a href="#consult" class="btn btn-primary">立即报名', repl_course, text)
    text = re.sub(r'<a href="#consult" class="btn btn-primary">立即预约', repl_course, text)
    text = re.sub(r'<a href="#consult" class="btn btn-primary">咨询.*?</a>', repl_course, text)

    biz_file.write_text(text, encoding="utf-8")
    print(f"  OK {biz_file.name}  商品={p_idx[0]} 课程={c_idx[0]}")
