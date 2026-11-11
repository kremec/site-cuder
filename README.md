# Astro Starter Kit: Minimal

## Shareable previews

Cloudflare Workers Builds deploys pushes to feature branches as Worker Previews.
The stable `workers.dev` URL updates on each push and appears in the Cloudflare
Worker's **Previews** tab and on the GitHub pull request. Only `develop` deploys
to the production website.

To deploy the current branch manually after `bunx wrangler login`, run
`bunx wrangler preview`.

Previews intentionally omit production email and queue bindings. The pages work,
but submitting the contact form returns an error and does not send an email.

## Business Profile analytics

The `Sync Google Business Profile` GitHub Actions workflow imports performance
data into PostHog daily at 07:23 UTC. It reads Google data; it never edits listings.
Repository secrets `GOOGLE_BUSINESS_PROFILE_CLIENT` (downloaded Desktop client
JSON) and `GOOGLE_BUSINESS_PROFILE_REFRESH_TOKEN` authorize it. Repository variable
`GBP_LOCATION` selects the business (`locations/<id>`).

Each run refreshes the two previous calendar months and the current month;
**Run workflow → start_date** allows an earlier backfill. Google search terms are
imported for completed months, including privacy thresholds. Snapshot queries in
`scripts/business-profile-*.sql` select the latest data per date/month, so reruns
and corrected figures do not inflate totals. They follow the dashboard's selected
calendar month. Views sum Google's daily device/platform counts, not unique
monthly people; button clicks do not prove calls, visits or sales.

GitHub disables schedules in public repositories after 60 days without repository
activity. Re-enable this workflow under Actions if that happens; a backfill can
recover the missed period.

```sh
bun create astro@latest -- --template minimal
```

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
├── src/
│   └── pages/
│       └── index.astro
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command               | Action                                           |
| :-------------------- | :----------------------------------------------- |
| `bun install`         | Installs dependencies                            |
| `bun dev`             | Starts local dev server at `localhost:4321`      |
| `bun build`           | Build your production site to `./dist/`          |
| `bun preview`         | Preview your build locally, before deploying     |
| `bun astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `bun astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).
