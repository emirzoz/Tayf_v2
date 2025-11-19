<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1hTlZZUYwJfXUr0mulePsF0Fozx3FmYwe

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Styling

The site no longer relies on the Tailwind CDN. All utility classes that exist in
the React components are captured inside `tailwind_tokens.json` and compiled into
`src/styles/tailwind-lite.css` via `python scripts/generate_tailwind_lite.py`.

If you add or remove classes, re-run the script so the generated stylesheet
stays in sync before building or deploying.
