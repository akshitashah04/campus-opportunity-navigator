# Campus Opportunity Navigator

A beginner-friendly product management portfolio project: a clickable prototype that helps students discover campus opportunities and track the ones they want to pursue.

**Live prototype data is fictional.** No listing is a real opening, and the displayed deadlines are illustrative counts, not calendar dates. There are no application links or claims about a university’s actual eligibility rules.

## Try it locally

The project has no package dependencies or build step. From this folder:

```bash
python3 -m http.server 8000
```

Open [http://localhost:8000](http://localhost:8000). A local server is needed because the app uses JavaScript modules. Alternatively, use any static host such as GitHub Pages.

## What V0 does

- Browse six illustrative opportunities; search by title, department, skill, type, or location.
- Filter by opportunity type; open a detail dialog with a fictional eligibility example.
- Save and remove opportunities. Move saved items through **Saved → Preparing → Applied → Interview → Offer**.
- Keep application stages in this browser’s `localStorage`, with no account or external service.
- Work on desktop and mobile, with labeled controls and keyboard accessible dialog behavior.

## Product thinking

**Problem hypothesis:** Graduate students searching for university opportunities may have to check multiple channels, interpret unclear eligibility, and manage deadlines on their own. This is a hypothesis to validate through interviews.

**Initial target user:** Graduate students actively seeking campus jobs, research, teaching, or fellowship opportunities.

**Chosen first slice:** Let users browse, narrow, save, and track opportunities. This tests whether a unified discovery and tracking flow feels useful without first building integrations or a recommendation engine.

**Current limits:** Opportunity records are static and fictional; no live feed, authentication, reminders, personalized matching, analytics collection, or actual application submission exists. The deadline labels are demo values and do not count down. Browser data remains on one device and can be cleared by the user.

See [docs/product-brief.md](docs/product-brief.md) for the assumptions, success criteria, and next decisions. See [docs/research-plan.md](docs/research-plan.md) for interview guidance. This repository does **not** claim user research or outcomes that have not happened.

## File map

| File | Purpose |
| --- | --- |
| `index.html` | App structure and accessible controls |
| `styles.css` | Responsive layout and visual design |
| `src/data.js` | Clearly marked fictional example records |
| `src/app.js` | Search, filtering, details, saves, and local tracking |
| `docs/` | PM project brief and research plan |

## Publish to GitHub

1. Create a new **public** repository named `campus-opportunity-navigator` on GitHub. Do not initialize it with a README.
2. In this project folder, run:

   ```bash
   git init
   git add .
   git commit -m "Build Campus Opportunity Navigator prototype"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/campus-opportunity-navigator.git
   git push -u origin main
   ```

3. To host it with GitHub Pages, go to **Settings → Pages**, choose **Deploy from a branch**, then select `main` and `/ (root)`. Use the URL GitHub gives you once deployment finishes.

## Good next increments

1. Interview five students about their last opportunity search. Record actual behavior and where it broke down.
2. Revise the problem statement and target segment based on repeated evidence; document disconfirming interviews too.
3. Test the prototype with three students and observe whether they can find and track an opportunity without coaching.
4. Prioritize a real-data strategy and verify permission, freshness, and source links before adding live listings.

**Author:** Akshita Rupesh Shah · PM learning project
