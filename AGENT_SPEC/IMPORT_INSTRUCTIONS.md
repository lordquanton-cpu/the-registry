# How to Import the Blueprint (When "Nothing Happens")

If Import Blueprint does nothing (no error, no modules appear), try these:

---

## Option 1: Correct import location

The **Import Blueprint** option is in the **bottom** toolbar of the scenario canvas, not the top.

1. **Create a new scenario** (Scenarios → Create a new scenario)
2. Look at the **bottom** of the white canvas — there's a toolbar with icons
3. Click the **⋯** (three dots) or **More** button
4. Choose **Import Blueprint**
5. **Upload** the JSON file, or **Paste** the contents if there's a text area

---

## Option 2: Paste instead of upload

Some Make versions prefer pasted JSON:

1. Open `Registry_Inquiry_Agent_MINIMAL_FIX.json` in a text editor
2. Select all (Ctrl+A) and copy (Ctrl+C)
3. In Make: Create new scenario → ⋯ → Import Blueprint
4. If you see a **text area**, paste the JSON there instead of uploading
5. Click OK / Import

---

## Option 3: Use the original export

To test whether *any* blueprint imports:

1. Use your **original** export: `Registry Inquiry Agent — Gmail → OpenAI → Gmail.blueprint.json` from Downloads
2. If that also does nothing → the problem is likely the import flow (browser, account, or Make UI)
3. If the original imports → we can compare and adjust the fixed version

---

## Blueprint files

- `Registry_Inquiry_Agent_MINIMAL_FIX.json` — Original structure + fixes (mapper + connection)
- `Registry_Inquiry_Agent_FIXED.json` — Simpler structure, same fixes

Use **MINIMAL_FIX** first; it keeps the full Make metadata.
