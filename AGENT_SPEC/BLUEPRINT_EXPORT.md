# Blueprint Import / Export

A pre-built blueprint is in `BLUEPRINT.json`. Use Import Blueprint to skip manual setup.

---

## Import the Pre-Built Blueprint

1. Go to Make.com → **Create a new scenario**
2. Click the **three-dot menu** (⋮) → **Import Blueprint**
3. Select `BLUEPRINT.json` (or paste its contents)
4. Connect **Gmail** (Lord.Quanton@gmail.com) when prompted
5. Connect **OpenAI** (paste your API key) when prompted
6. If the System prompt is empty or different, paste from `PROMPT_COPY_PASTE.txt` into Message 1
7. **BLUEPRINT.json already uses Reply to an email + Raw HTML.** Connect Gmail + OpenAI when prompted. Body contents map `{{2.result}}`; Thread ID maps `{{1.threadId}}`.
8. Save, set schedule to **Every 15 minutes**, turn **On**

**If import fails:** Make's module IDs can change. Use manual setup (see STEP_BY_STEP_SETUP.md) or try Make's template "Automate email responses with ChatGPT" and replace the prompt with `PROMPT_COPY_PASTE.txt`.

---

## Export Your Working Scenario (to Share or Update)

1. Open your scenario in Make.com (Gmail → OpenAI → Gmail Send).
2. Click the **three-dot menu** (⋮) in the top-right.
3. Select **Export Blueprint**.
4. Save the `.json` file.

---

## Add It to the Repo

1. Rename the file to `Registry_Inquiry_Agent.json`.
2. Place it in `AGENT_SPEC/` next to this file.
3. Commit and push.

---

## For New Users

Anyone can then:

1. Create a new scenario in Make.
2. **Import Blueprint** → select `Registry_Inquiry_Agent.json`.
3. Connect their Gmail (Lord.Quanton@gmail.com or their own).
4. Connect their OpenAI API key.
5. Verify the System prompt in Message 1 matches `PROMPT_COPY_PASTE.txt`.
6. Save, schedule Every 15 min, turn On.

---

**Note:** Blueprints do NOT include API keys or OAuth tokens. Each user must connect their own accounts after import.

**Quick fix (paragraphs + threading):** See [MAKE_QUICK_FIX_CHECKLIST.md](./MAKE_QUICK_FIX_CHECKLIST.md).
