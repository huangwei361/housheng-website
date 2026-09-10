# -*- coding: utf-8 -*-
"""修正详情页里 '返回' 按钮路径（加 ../）+ 补齐 fitness 1v1 私教课程链接"""
from pathlib import Path
import re

BASE = Path(r"C:\Users\64549\.minimax\大健康公司\website")
DETAILS = BASE / "details"

# 1) 修正所有详情页的"返回"按钮路径
for f in DETAILS.glob("*.html"):
    text = f.read_text(encoding="utf-8")
    # biz-nutrition.html -> ../biz-nutrition.html
    text = re.sub(r'href="(biz-[a-z]+\.html)"', r'href="../\1"', text)
    # shop.html / courses.html / therapy.html / checkup.html 也加 ../
    text = re.sub(r'href="(shop|courses|therapy|checkup|brand|index)\.html"', r'href="../\1.html"', text)
    f.write_text(text, encoding="utf-8")
print("OK 修正详情页返回路径")

# 2) 补齐 fitness 1v1 私教课程链接
ff = BASE / "biz-fitness.html"
text = ff.read_text(encoding="utf-8")
# 替换"预约 1v1 私教 →"按钮
text = text.replace(
    '<a href="#consult" class="btn btn-primary">预约 1v1 私教 →</a>',
    '<a href="details/fitness-cpt-1v1.html" class="btn btn-primary">预约 1v1 私教 →</a>'
)
ff.write_text(text, encoding="utf-8")
print("OK 补齐 fitness 1v1 私教链接")
