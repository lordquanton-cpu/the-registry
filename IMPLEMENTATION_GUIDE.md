# Implementation Guide — The Registry

**Goal:** Get the Registry on GitHub + contact email with AI agent that runs curious inquirers in a friendly loop.

---

## Part 1: GitHub Repo (Mock Google Account)

### 1.1 Create Account
- Use a dedicated Google account (e.g., `registry.art.project@gmail.com`)
- Sign up for GitHub with that email
- Keep it separate from your main identity

### 1.2 Create Repo
- New repository: `the-registry` or `registry-catalog`
- Visibility: **Public** (it's art — let people find it)
- Or: **Unlisted** if you want discoverability only via link

### 1.3 Repo Structure

```
the-registry/
├── README.md
├── 00_REGISTRY_CATALOG.md
├── packages/
│   ├── NULL_AXIS/         ← The Karma Machine
│   ├── ZERO_SIGNATURE/    ← The Ghost Protocol
│   ├── QUIET_FLOOR/       ← The Blanket
│   └── DARK_MIRROR/       ← The Reflection
├── AGENT_SPEC/            ← System prompt, BLUEPRINT.json, implementation
├── IMPLEMENTATION_GUIDE.md
└── CONTACT.md             ← Inquiries: Lord.Quanton@gmail.com
```

### 1.4 Contact Email in Repo
- Add `inquiries@yourdomain.com` to README and CONTACT.md
- Use Proton Mail (e.g., `registry.inquiries@proton.me`) for privacy
- Or: Gmail alias that forwards to your automation

---

## Part 2: AI Inquiry Agent

**Full step-by-step:** See [AGENT_SPEC/STEP_BY_STEP_SETUP.md](./AGENT_SPEC/STEP_BY_STEP_SETUP.md)

**Prompt (copy-paste ready):** [AGENT_SPEC/PROMPT_COPY_PASTE.txt](./AGENT_SPEC/PROMPT_COPY_PASTE.txt)

**Agent handles:** Registry inquiries (never fulfills) + conspiracy theory Q&A (fun, engaging) + general curiosity. Crisis override for harm-related emails.

### 2.1 Choose Stack
- **Simplest:** Gmail + Zapier + OpenAI (paid, ~$20/mo)
- **Most flexible:** n8n + Supabase + Gmail (free tiers available)
- **Most control:** Python script + cron + Gmail API

### 2.2 Core Flow
1. New email arrives at inquiry address
2. **Crisis check:** If body contains harm-related keywords → send crisis template, do not AI
3. **AI response:** System prompt + email body → OpenAI → reply
4. **Send:** Reply to sender

### 2.3 Multi-Turn (Optional but Neat)
- Store thread/conversation in DB
- When replying, include prior exchange in OpenAI context
- AI can reference "Case ZS-2291" or "your referral from Phoenix"
- Feels like real back-and-forth

### 2.4 Safety Checklist
- [ ] Crisis keyword filter (suicide, self-harm, kill, etc.)
- [ ] Rate limit: don't reply to same sender 50x/day
- [ ] Never include real payment links
- [ ] Never promise real services
- [ ] If someone says "I know this is fake" — AI can break character gently and confirm

---

## Part 3: Contact Email Options

| Option | Pros | Cons |
|-------|------|------|
| **Proton** | Private, good for fiction | Harder to automate; may need bridge |
| **Gmail** | Easy automation (Make, n8n, API) | Tied to Google |
| **Custom domain** | Looks professional | Requires hosting |
| **SimpleLogin + Gmail** | Alias, forwards to Gmail | Extra layer |

**Recommendation:** Gmail for automation ease. Use `registry.inquiries.[random]@gmail.com` or similar. Or Proton with ProtonMail Bridge + local script if you want maximal separation.

---

## Part 4: Deploy Order

1. Create GitHub account + repo
2. Clone or copy this repo (packages already included)
3. Create inquiry email
4. Set up automation (Make/n8n/script) — see AGENT_SPEC/BLUEPRINT.json
5. Test with your own email
6. Push contact address to repo
7. Share link if desired — or let it be found

---

## Part 5: What You'll Need

- GitHub account
- Email account for inquiries
- OpenAI API key (or other LLM)
- Make / n8n / Zapier account (or Python + server)
- 1–2 hours to wire it up
- Ongoing: ~$10–30/mo if using paid automation + API

---

*The Registry exists. We route. We never deliver. We just run the loop.*
