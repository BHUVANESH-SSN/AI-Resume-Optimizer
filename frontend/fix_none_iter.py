import re

with open("../backend/app/services/resume_service.py", "r") as f:
    text = f.read()

# Make sure all list gets fallback properly if the value is explicitly None
# Original: db_res.get("skills", [])
# New: (db_res.get("skills") or [])
text = re.sub(r'db_res\.get\("skills", \[\]\)', '(db_res.get("skills") or [])', text)
text = re.sub(r'file_res\.get\("skills", \[\]\)', '(file_res.get("skills") or [])', text)

text = re.sub(r'db_res\.get\("education", \[\]\)', '(db_res.get("education") or [])', text)
text = re.sub(r'file_res\.get\("education", \[\]\)', '(file_res.get("education") or [])', text)

text = re.sub(r'db_res\.get\("experience", \[\]\)', '(db_res.get("experience") or [])', text)
text = re.sub(r'file_res\.get\("experience", \[\]\)', '(file_res.get("experience") or [])', text)

text = re.sub(r'db_res\.get\("projects", \[\]\)', '(db_res.get("projects") or [])', text)
text = re.sub(r'file_res\.get\("projects", \[\]\)', '(file_res.get("projects") or [])', text)

text = re.sub(r'db_res\.get\("certifications", \[\]\)', '(db_res.get("certifications") or [])', text)
text = re.sub(r'file_res\.get\("certifications", \[\]\)', '(file_res.get("certifications") or [])', text)

text = re.sub(r'db_res\.get\("achievements", \[\]\)', '(db_res.get("achievements") or [])', text)
text = re.sub(r'file_res\.get\("achievements", \[\]\)', '(file_res.get("achievements") or [])', text)

text = re.sub(r'db_res\.get\("skills_categorized", \{\}\)', '(db_res.get("skills_categorized") or {})', text)

with open("../backend/app/services/resume_service.py", "w") as f:
    f.write(text)
