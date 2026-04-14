# Mike McCabe Counseling — Site Deployment Guide

## What You Have
A complete static website ready to deploy. No build step needed — just upload and go.

---

## Step 1: Create a GitHub Account (5 min)

1. Go to https://github.com/signup
2. Use your business email (mike@mikemccabecounseling.com)
3. Pick a username (e.g., `mikemccabecounseling`)
4. Free plan is all you need

## Step 2: Create a Repository (3 min)

1. Click the **+** button (top-right) → **New repository**
2. Name: `mikemccabecounseling.com`
3. Set to **Public** (Cloudflare Pages works with both, but public is simpler)
4. Check **"Add a README file"**
5. Click **Create repository**

## Step 3: Upload the Site Files (5 min)

1. In your new repo, click **"Add file"** → **"Upload files"**
2. Drag the ENTIRE contents of the `mccabe-site` folder into the upload area
   - This means all files and folders: `css/`, `js/`, `images/`, `blog/`, `thank-you/`, and all the `.html` files
3. Scroll down, click **"Commit changes"**

**Important:** Make sure the files are at the ROOT of the repo, not inside a `mccabe-site/` subfolder. You should see `couples.html` at the top level, not `mccabe-site/couples.html`.

## Step 4: Create a Cloudflare Account (5 min)

1. Go to https://dash.cloudflare.com/sign-up
2. Sign up with your business email
3. Free plan is all you need

## Step 5: Connect Cloudflare Pages to GitHub (5 min)

1. In Cloudflare dashboard, click **"Workers & Pages"** in the left sidebar
2. Click **"Create"** → **"Pages"** → **"Connect to Git"**
3. Sign in to GitHub when prompted and authorize Cloudflare
4. Select your `mikemccabecounseling.com` repository
5. Settings:
   - **Production branch:** `main`
   - **Build command:** (leave BLANK — no build needed)
   - **Build output directory:** `/` (just a forward slash)
6. Click **"Save and Deploy"**
7. Wait ~60 seconds. Your site is now live at `mikemccabecounseling-com.pages.dev`

## Step 6: Connect Your Domain (10 min)

### Option A: Transfer DNS to Cloudflare (Recommended)
1. In Cloudflare dashboard, click **"Add a Site"**
2. Enter `mikemccabecounseling.com`
3. Select Free plan
4. Cloudflare will show you two nameservers (e.g., `anna.ns.cloudflare.com`)
5. Go to your domain registrar (wherever you bought the domain) and change the nameservers to the ones Cloudflare gave you
6. Back in Cloudflare: **Workers & Pages** → your project → **Custom domains** → **Add** → enter `mikemccabecounseling.com`
7. Also add `www.mikemccabecounseling.com`

### Option B: Keep DNS Elsewhere (CNAME)
1. In your Pages project → **Custom domains** → **Add**
2. Enter `mikemccabecounseling.com`
3. Cloudflare will give you a CNAME target
4. Add that CNAME record at your DNS provider

**DNS propagation takes 10 min to 48 hours.** Usually under an hour.

---

## Post-Launch Checklist

- [ ] Verify site loads at mikemccabecounseling.com
- [ ] Test the Calendly links (all "Book consult" buttons)
- [ ] Test the contact form → thank you page flow
- [ ] Test mobile responsiveness (pull up on your phone)
- [ ] Submit sitemap to Google Search Console: https://search.google.com/search-console
      → Add property → enter your domain → verify → Sitemaps → submit `sitemap.xml`
- [ ] Verify Google Ads conversion tracking fires on thank-you pages
      → Open Chrome DevTools (F12) → Network tab → load a thank-you page → search for "googleads"

---

## Form Backend (TODO)

The contact forms currently submit but need a backend to actually receive the data. Options:

1. **Formspree** (easiest, free tier): https://formspree.io
   - Create account, get a form endpoint URL
   - Replace `action="#"` in each form with `action="https://formspree.io/f/YOUR_ID"`
   
2. **Cloudflare Workers** (more control, free tier)
   - Build a small worker that receives form data and emails it to you

3. **Netlify Forms** (if you switch from Cloudflare, which I don't recommend)

**Formspree is the move.** 5 min setup, free for your volume.

---

## Adding Blog Posts Later

1. Create a new `.html` file in the `blog/` folder (e.g., `blog/signs-marriage-needs-intensive.html`)
2. Copy the structure from any existing page (nav, footer, head tags)
3. Add the post content in the main section
4. Add a card for it in `blog/index.html`
5. Add the URL to `sitemap.xml`
6. Commit and push to GitHub — Cloudflare auto-deploys in ~30 seconds

---

## File Structure Reference

```
mikemccabecounseling.com/
├── index.html              → Redirects to couples.html
├── couples.html            → PRIMARY landing page (Couples Therapy)
├── intensives.html         → Marriage Intensives + pricing
├── mens.html               → Men's Counseling
├── about.html              → About Mike
├── 404.html                → Custom 404 page
├── robots.txt              → Search engine crawl rules
├── sitemap.xml             → SEO sitemap
├── _headers                → Cloudflare security headers + caching
├── _redirects              → Cloudflare redirect rules
├── css/
│   └── style.css           → All styles
├── js/
│   └── main.js             → Nav toggle, FAQ accordion, form handling
├── images/
│   └── mike-mccabe-headshot.png
├── blog/
│   └── index.html          → Blog listing page
└── thank-you/
    ├── couples.html        → Couples form thank-you (fires conversion)
    ├── intensives.html     → Intensives thank-you (fires conversion)
    └── mens.html           → Men's thank-you (fires conversion)
```
