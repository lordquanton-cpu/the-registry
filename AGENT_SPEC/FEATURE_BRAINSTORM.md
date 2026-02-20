# Feature Brainstorm — Registry Agent

Ideas to add or iterate on. Pick what you like.

---

## Implemented (in system prompt)
- Registry intake loop
- Conspiracy theory Q&A
- Easter eggs (karma machine, 137, 322)
- Crisis override

---

## Easy Adds (tweak the prompt)

### Lore drops
When replying to Registry inquiries, occasionally toss in a fake universe detail:
- "QUIET FLOOR once had a client who needed a bunker that *forgot*."
- "ZERO SIGNATURE's first principal was a diplomat. Or so the story goes."

### Joke deflections
- "Make my neighbor disappear" → "We'd need a referral. And a hypothetical neighbor. Purely theatrical. How's the weather?"
- "Can you hack my ex's email?" → "We don't touch real systems. But we can run you through the fictional intake. Case ref: DM-4492. Purely for the exercise."

### "What's the catch?"
- "No catch. No delivery. No refunds because there's nothing to refund. Just the loop. The fiction. Enjoy the ride."

### Tarot / mystic flavor
- "The Registry doesn't do divination. But if we did: The Tower. Upheaval. Change. Interpret as you will."
- Add when they seem into mysticism

---

## Medium Adds (need logic or data)

### Recommendation engine
If they ask about NULL AXIS, mention ZERO SIGNATURE: "Not your style? ZERO SIGNATURE handles the opposite problem — extraction, not application. Purely hypothetical."
Requires: Light parsing of inquiry type.

### Secret handshake
If they include a phrase (e.g., "the triangle closes"), respond with "Level 2" — deeper lore, fake case file.
Requires: Keyword check before sending to AI.

### Mood detection
Playful → more roleplay. Curious → more conspiracy depth. Confused → gently clarify.
Requires: AI already does this if you phrase it in the prompt. Can emphasize: "Match their energy."

---

## Advanced (need more setup)

### Multi-turn memory
Store conversation history per email thread. AI gets prior messages as context.
Requires: Database (Supabase, Airtable) + n8n to look up thread history before calling AI.

### Response delay
Don't reply instantly. Add 2–4 hour delay. Feels more "operational."
Requires: Schedule or queue in Make/n8n.

### Different personas per provider
NULL AXIS inquiries → colder, more terse. ZERO SIGNATURE → more "extraction" vibe. Conspiracy questions → chatty researcher.
Requires: Router that detects inquiry type and sends to different prompt variants.

### Rotating sign-offs
Pull from a list of 10–20 sign-offs at random.
Requires: Array in Make + random element. Or let the AI vary (it already does if you tell it to).

---

## Fun one-liners to sprinkle
- "We notice when numbers repeat."
- "The official story is boring. The fun story is in the margins."
- "Coincidences are the universe's sense of humor."
- "Down the rabbit hole we go."
- "The Registry does not confirm or deny. It routes."
- "Patience is part of the vetting."
- "We don't touch real people. Obviously."

---

*Pick. Implement. Iterate. It's your fiction.*
