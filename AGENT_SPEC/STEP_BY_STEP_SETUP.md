# Step-by-Step Setup — Registry Inquiry Agent

**Goal:** Lord.Quanton@gmail.com automatically replies with an AI that handles Registry inquiries, conspiracy Q&A, and general curiosity. Free or cheap.

---

## What You'll Need

- [ ] Lord.Quanton@gmail.com account (you have this)
- [ ] Make.com account (free) — https://www.make.com
- [ ] OpenAI API key — https://platform.openai.com (or Groq for free alternative)
- [ ] 30–45 minutes

---

## Step 1: Get Your API Keys

### OpenAI (paid, ~$1–5/month for low volume)
1. Go to https://platform.openai.com
2. Sign up or log in
3. **Billing** → Add payment method (required for API)
4. **API Keys** → Create new secret key → Copy it (you won't see it again)
5. Save the key somewhere safe

### Groq (free alternative)
1. Go to https://console.groq.com
2. Sign up
3. **API Keys** → Create API key → Copy it
4. Free tier: 30 req/min, 6000 req/day — plenty for email

---

## Step 2: Create Make Account & Scenario

**Option A: Import Blueprint (fastest)**  
`Registry_Inquiry_Agent.json` is in `AGENT_SPEC/`:
1. Go to https://www.make.com → Sign up (free)
2. Click **Create a new scenario**
3. Click the **three-dot menu** (top right) → **Import Blueprint**
4. Upload or paste the JSON
5. Connect Gmail + OpenAI when prompted
6. Paste `PROMPT_COPY_PASTE.txt` into the System message (Message 1) — blueprint may have a placeholder
7. Save, schedule (Every 15 min), turn On. Done.

**Option B: Manual setup**  
1. Go to https://www.make.com → Sign up (free)
2. Click **Create a new scenario**
3. You'll build: **Gmail (new email) → OpenAI → Gmail (send)**

---

## Step 3: Add Gmail Trigger

1. Click the **+** in the middle of the empty scenario
2. Search for **Gmail**
3. Choose **Watch Emails** (triggers on new email)
4. Connect your Google account (Lord.Quanton@gmail.com)
5. **Mailbox:** Inbox
6. **Trigger:** On new email (unread)
7. **Limit:** 1 (process one at a time)
8. Save (orange button)

---

## Step 4: Add Router (Crisis vs. Normal)

1. Click **+** after the Gmail module
2. Search for **Router**
3. Add it — you'll have multiple routes
4. **Route 1:** Add a **filter** — we'll set this up for crisis keywords

### Route 1 — Crisis Path
- Click the filter icon on Route 1
- **Label:** Crisis
- **Condition:** `Text` / `contains` / (leave empty for now — we'll use a separate module)

*Simpler approach:* Use an **Array aggregator** + **Iterator** to check the email body. Or use a single path and let the AI handle it (the system prompt already tells the AI to send crisis response for harm keywords). 

**Easier:** Skip the router for now. Use one path. The AI system prompt already handles crisis — if the email says "I want to kill myself," the AI is instructed to respond with crisis resources. The LLM will follow that. Add the router later if you want a hard filter.

**For simplicity, we'll use one path: Gmail → OpenAI → Gmail.** The prompt handles crisis.

---

## Step 5: Add OpenAI Module

1. Click **+** after the Gmail Watch Emails module
2. Search for **OpenAI**
3. Choose **Create a Chat Completion**
4. Connect your OpenAI account (paste API key when prompted)
5. **Model:** gpt-4o-mini (cheaper) or gpt-3.5-turbo
6. **Messages:**
   - **Role:** System | **Content:** [Paste the full system prompt from SYSTEM_PROMPT.md]
   - **Role:** User | **Content:** `Subject: {{1.subject}}\n\nFrom: {{1.from}}\n\nBody:\n{{1.text}}`
7. **Max tokens:** 500
8. Save

---

## Step 6: Add Gmail Reply (Stay in Thread)

**Important:** Use **Reply to an email** — NOT **Send an Email**. "Send" creates a new thread; "Reply" keeps the conversation together.

1. Click **+** after the OpenAI module
2. Search for **Gmail**
3. Choose **Reply to an email** (in the new Gmail app — if you only see "Send an Email," update your Gmail connection or use the legacy workaround below)
4. **Message ID:** `{{1.id}}` (from Gmail Watch — this keeps the reply in the same thread)
5. **Body:** `{{2.message.content}}` (the AI's reply — adjust the module number if different)
6. **Body type:** **Plain text** (required for paragraph breaks — `\n\n` in AI output will render as line breaks)
7. Save

**If "Reply to an email" isn't available:** Use the Email module with `In-Reply-To` and `References` headers set to the original message's Message-ID (from Gmail headers). Or switch to n8n, which has native reply support.

---

## Step 7: Mark Email as Read (Optional)

1. Click **+** after Reply to an email
2. Add **Gmail** → **Mark as Read**
3. **Message ID:** `{{1.id}}`
4. This prevents the same email from triggering again

---

## Step 8: Test

1. Click **Run once** (bottom of screen)
2. Send a test email to Lord.Quanton@gmail.com from another address
3. Wait 1–2 minutes (Make free tier can have a short delay)
4. Check if you got a reply
5. If not: Check **Operations** (left sidebar) for errors
6. Common fix: Make sure the Gmail connection has "Send email" permission

---

## Step 9: Schedule (Free Tier)

- **Make free tier:** Scenarios run on a schedule or manually
- **Scheduling:** Click the clock icon on the scenario → Schedule → Every 15 minutes (or every 5 min if available)
- This means: Every 15 min, Make checks for new emails and processes them

---

## Using Groq Instead of OpenAI (Free)

1. Make may not have a native Groq module — check the integration list
2. If not: Use **HTTP** module instead of OpenAI:
   - **URL:** `https://api.groq.com/openai/v1/chat/completions`
   - **Method:** POST
   - **Headers:** `Authorization: Bearer YOUR_GROQ_KEY`, `Content-Type: application/json`
   - **Body:**
   ```json
   {
     "model": "llama-3.1-70b-versatile",
     "messages": [
       {"role": "system", "content": "YOUR_SYSTEM_PROMPT"},
       {"role": "user", "content": "{{1.text}}"}
     ],
     "max_tokens": 500
   }
   ```
3. Use **JSON** module to parse response and extract `choices[0].message.content`
4. Pass that to Gmail Send

---

## Troubleshooting

| Issue | Fix |
|------|-----|
| Won't go past Gmail (0 bundles) | Gmail Watch sometimes ignores unread emails on Run once. **Fix 1:** Turn the scenario **ON** (schedule Every 15 min) and wait — or mark email unread, send fresh one, then Run once. **Fix 2 (workaround):** Replace Watch Emails with **Manual trigger** + **Gmail → Search for emails** (Query: `is:unread in:inbox`, Limit: 1). Map outputs: `subject`→{{1.subject}}, `fullTextBody`→{{1.fullTextBody}}, `fromEmail`→{{1.fromEmail}}, `threadId`→{{1.threadId}}, `id`→{{1.id}}. |
| No reply | Check Operations log. Verify Gmail "Send" permission. |
| Same email triggers twice | Add Mark as Read. Or add a "Already processed" filter (store IDs in Google Sheet, check before replying). |
| Rate limit | Make free: 1,000 ops/month. Each email ≈ 3 ops. ~330 emails/month max. |
| AI ignores prompt | Make prompt shorter or clearer. Add "CRITICAL:" for crisis instruction. |
| No paragraphs / block of text | Body type must be **Plain text** (not Raw HTML). `\n\n` only works in plain text. |
| Reply creates new thread | Use **Reply to an email**, not Send an Email. Map Message ID to `{{1.id}}`. |

---

## Cost Estimate

| Component | Free Tier | Paid |
|----------|-----------|------|
| Make | 1,000 ops/mo | $9/mo for 10K |
| OpenAI (gpt-4o-mini) | — | ~$1–3/mo at 50–100 emails |
| Gmail | Free | Free |
| **Total** | ~$1–3/mo | Or $0 with Groq + n8n self-hosted |

---

*Once it's running, you're done. The Registry replies. We don't ask why.*
