# Social Work Students in Action (SWSA) — website starter

A responsive, public-facing website for Social Work Students in Action, a student organization at Freed-Hardeman University. The site has a fun, welcoming visual identity and editable content collections.

## Included
- Homepage with the SWSA / Freed-Hardeman University identity
- Mission statement and Learn · Serve · Advocate · Inspire tagline
- About, events, get involved, club documents, leadership, and contact sections
- Responsive mobile navigation
- Editable JSON content for site settings, events, documents, and officers
- Decap CMS editor scaffold at `/admin/`
- Netlify publish configuration

## Current publishing status
This is a website project package, not a live deployed website. No Netlify site, GitHub repository, custom domain, or CMS authentication has been connected yet. The admin page is a scaffold and will not accept edits until the repository and a supported authentication provider are configured.

## Publish to Netlify
1. Create or sign in to a GitHub account.
2. Create a new repository named `swsa-website`.
3. Upload the **contents** of this folder to the repository root (so `index.html` is at the top level, not inside an extra nested folder).
4. In `admin/config.yml`, replace `YOUR-GITHUB-USERNAME/swsa-website` with the actual GitHub owner and repository.
5. In Netlify, choose **Add new site → Import an existing project**, connect GitHub, and select `swsa-website`.
6. Use no build command and set the publish directory to `.`. Deploy.
7. Replace the placeholder `site_url` and `display_url` in `admin/config.yml` with the Netlify URL. Commit the change.
8. Configure Decap CMS authentication for the GitHub backend using a currently supported OAuth/auth service. Do not use the retired Netlify Git Gateway setup for a new project. Test `/admin/` with an editor account before inviting officers.

## Update content before CMS is enabled
The website reads these files directly; authorized repository editors can update them in GitHub: `content/site.json`, `content/events.json`, `content/documents.json`, and `content/leaders.json`. Uploaded documents and images belong in `assets/uploads/`.

## Club information intentionally left open
- Constitution and bylaws (to be added when approved for publication)
- Membership eligibility and joining instructions
- Current officers and approved profile photos
- Event dates, locations, and RSVP links
- Official club email or contact form

Do not publish internal meeting minutes or personal student contact details unless the club has approved them for public display.
