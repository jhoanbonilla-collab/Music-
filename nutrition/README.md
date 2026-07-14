# NourishWeek — Family Meal Planner

A single-file web app that executes our weekly high-protein meal-plan prompt — built for a
family of three with a newborn, where mum is exclusively breastfeeding and nobody has time
to cook.

**Open [`index.html`](index.html) in any browser. No build, no server, no dependencies.**

## Run it locally

The simplest way — double-click `index.html` (or drag it into a browser tab). Everything works
from a plain `file://` page, including the Claude API call.

If you prefer a proper local URL:

```sh
git clone https://github.com/jhoanbonilla-collab/Music-.git
cd Music-/nutrition
sh serve.sh          # → http://localhost:8787
```

`serve.sh` uses Python's built-in web server (falls back to `npx serve`), binds to
127.0.0.1 only, and needs nothing installed beyond Python or Node. Set `PORT=3000 sh serve.sh`
to use a different port. Your settings, API key, and plan history live in that browser's
localStorage, so stick to one browser/URL for continuity.

## What it does

1. **Plan Builder** — assembles the full Registered-Dietitian prompt (protein targets,
   Australian supermarkets, meal-prep rules, output format) and lets you layer on
   week-specific tweaks with one click:
   - Use only ingredients already in the pantry (with a pantry inventory box)
   - Every lunch under 600 kcal
   - Two vegetarian dinners
   - No seafood this week
   - Gentle fat loss for dad (never restricting mum's calories while breastfeeding)
   - 14 lunches (7 days × 2 adults)
   - Free-text instructions and an "avoid these ingredients" field
2. **Generate** — two ways to execute the prompt:
   - **Generate with Claude** — streams the plan directly from the Claude API
     (`claude-opus-4-8`) into the app. Needs an API key from
     [console.anthropic.com](https://console.anthropic.com), saved under Settings
     (stored only in your browser's localStorage).
   - **Copy full prompt** — copies the assembled prompt to paste into
     [claude.ai](https://claude.ai) or any AI chat, then paste the answer back into the app.
3. **This Week's Plan** — renders the markdown response with proper tables (per-day
   macros, shopping list, Sunday prep guide, storage guide, cost estimate, nutrition
   review). Print it, download it as `.md`, or save it to history.
4. **Past Weeks** — every saved plan is kept in localStorage so you can revisit
   what worked.

## Nice touches

- **Baby's age updates itself.** Set the date of birth once in Settings; every week the
  prompt automatically says "a 9-week-old baby", "a 4-month-old baby", etc.
- Protein targets and supermarket list are editable in Settings.
- Weekly tweaks are remembered between visits.
- Print stylesheet strips the chrome so the shopping list prints cleanly for the
  supermarket run.

## Privacy

Everything (settings, API key, plan history) lives in your browser's localStorage.
The only network request the app ever makes is the direct call to
`api.anthropic.com` when you click **Generate with Claude**.
