# Make.com Quick Fix — Paragraphs & Threading

If replies are one block of text and/or start new threads instead of replying in-thread:

---

## 1. Replace Send with Reply

- Remove **Gmail → Send an Email**
- Add **Gmail → Reply to an email**
- **Thread ID:** `{{1.threadId}}` (from Gmail Watch — module 1)
- **Body:** `{{2.result}}` or `{{2.message.content}}` (OpenAI output — module 2)

---

## 2. Fix Body Contents (CRITICAL — this is why it's broken)

**Problem:** "Collection of contents" expects an **array** of content blocks. Mapping `{{2.result}}` directly to Body contents fails because it's a string, not an array.

**Fix in Make UI:**
1. Open **Reply to an email** module
2. In **Body contents**, click **Add item** (or **+**)
3. You'll get a Content block with a **Text** field
4. Map `{{2.result}}` to that **Text** field (inside the block), NOT to the whole Body contents
5. Save

**Alternative:** Switch **Body type** to **Raw HTML**. Then Body contents accepts `{{2.result}}` as a plain string. Update the system prompt so the AI outputs HTML with `<p>First paragraph.</p><p>Second paragraph.</p>` for paragraphs.

---

## 3. Update System Prompt

- Copy the full contents of `PROMPT_COPY_PASTE.txt`
- Paste into OpenAI module → **Message 1** (System role)
- Contains explicit paragraph formatting instructions

---

## 4. Save & Run Once

- Click Save
- Run once to test
- Send a test email; reply should be in-thread with proper paragraphs
