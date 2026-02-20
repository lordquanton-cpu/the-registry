# Implementation Options — Registry Inquiry Agent

**Goal:** Inbox receives inquiry → AI drafts reply → (optional) human approves → send. Or fully automated.

---

## Option 1: Gmail + Make (Integromat) + OpenAI

1. **Gmail** (mock account): `registry.inquiries@gmail.com` or Proton/Tutanota
2. **Make scenario:**
   - Trigger: New email in Gmail (filter: to inquiry address, unread)
   - Module: Gmail — Get email (subject, body, from)
   - Module: OpenAI — Create completion (system prompt + email body as user message)
   - Module: Gmail — **Reply to an email** (not Send — keeps thread). Body type: **Plain text** (for paragraph breaks).
   - Optional: Gmail — Mark as read
3. **OpenAI:** Use gpt-4 or gpt-3.5. System prompt from SYSTEM_PROMPT.md.
4. **Safety:** Add a pre-step that checks email body for crisis keywords ("kill," "suicide," "hurt myself") → skip AI, send crisis hotline template instead.

---

## Option 2: n8n (Self-hosted or Cloud)

Same flow as Make. Nodes:
- **Trigger:** Email (IMAP or Gmail node)
- **Filter:** Optional — skip if from same thread and already replied (conversation threading)
- **OpenAI:** Chat completion with system prompt
- **Email:** Send reply
- **Logic:** Store thread ID / case number in database (Airtable, Supabase) for continuity across emails

**Advantage:** Can maintain "case numbers" and conversation history so the AI has context for multi-turn.

---

## Option 3: Zapier

- Trigger: New Email in Gmail
- Action: OpenAI (via Zapier's OpenAI integration or webhook)
- Action: Send Email

Simpler but less control. No built-in conversation memory.

---

## Option 4: Custom Script (Python + Cron)

```python
# Pseudocode
import imaplib, openai, smtplib
# 1. Connect to Gmail IMAP, fetch unread
# 2. For each email:
#    - If crisis keywords: send_crisis_response()
#    - Else: response = openai.ChatCompletion.create(
#          model="gpt-4",
#          messages=[
#            {"role": "system", "content": SYSTEM_PROMPT},
#            {"role": "user", "content": email_body}
#          ])
#    - Send response via SMTP
#    - Mark read
# 3. Run via cron every 5-15 min
```

**Advantage:** Full control. Can add SQLite for thread history. Cheap.

---

## Option 5: Botpress / Voiceflow (No-Code Chatbot)

If you want a web form instead of email: embed a chatbot that collects "inquiry" and responds with the AI. Less mysterious than email, but easier to implement and no email automation needed.

---

## Recommended for "Neat Implementation"

**n8n + Supabase:**
- n8n for workflow (free tier)
- Supabase for storing: `thread_id`, `email`, `case_number`, `message_history` (JSON)
- Each new email: lookup thread, append to history, send to OpenAI with full context, save reply, send
- Result: Multi-turn conversations with memory. "Case ZS-2291" persists. Very neat.

---

## Email Setup Checklist

- [ ] Create mock account (Gmail or Proton)
- [ ] Set up forwarding if using external automation
- [ ] Or: Use Gmail API / IMAP for automation to read/send
- [ ] Create filter: inquiries only (avoid replying to newsletters, etc.)
- [ ] Test with your own secondary email first
- [ ] Add crisis keyword detection before any AI reply
