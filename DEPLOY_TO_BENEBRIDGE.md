# 🚀 Deploy BeneBridge Website to benebridge.io

## Quick Start (15 minutes total)

### Step 1: Deploy to Netlify (5 minutes)

1. **Go to Netlify**
   - Open https://app.netlify.com/
   - Click "Sign up" (use GitHub login for easiest setup)

2. **Deploy Your Site**
   - Click "Add new site" → "Deploy manually"
   - **Drag and drop** the entire `benebridge-website` folder onto the page
   - Wait 30 seconds - your site is now live at a random URL like `quirky-curie-a1b2c3.netlify.app`

3. **Test Your Site**
   - Click the URL Netlify gives you
   - Verify everything looks correct
   - Test the contact form
   - Check mobile responsiveness

### Step 2: Connect Your Domain (10 minutes + DNS propagation)

1. **Add Custom Domain in Netlify**
   - In your Netlify site dashboard, click "Domain settings"
   - Click "Add custom domain"
   - Enter: `benebridge.io`
   - Click "Verify" (Netlify will say you need to configure DNS)

2. **Configure Namecheap DNS**
   - Login to https://www.namecheap.com
   - Go to Domain List → Click "Manage" next to benebridge.io
   - Click "Advanced DNS" tab
   - Delete any existing A Records or CNAME Records
   - Add these new records:

   ```
   Type: A Record
   Host: @
   Value: 75.2.60.5
   TTL: Automatic

   Type: CNAME Record
   Host: www
   Value: [your-site-name].netlify.app
   TTL: Automatic
   ```

   Replace `[your-site-name]` with the name Netlify assigned (e.g., `quirky-curie-a1b2c3`)

3. **Wait for DNS Propagation**
   - Usually takes 5-30 minutes
   - Can take up to 24 hours in rare cases
   - Check status at: https://www.whatsmydns.net/#A/benebridge.io

4. **Enable HTTPS (Automatic)**
   - Once DNS propagates, Netlify automatically provisions SSL certificate
   - Go to "Domain settings" → "HTTPS" → Click "Verify DNS configuration"
   - HTTPS will be enabled within a few minutes

### Step 3: Configure www Redirect

In Netlify, both `benebridge.io` and `www.benebridge.io` will work automatically.

---

## Alternative: Deploy via GitHub (Recommended for Updates)

If you want to make future updates easier:

### Step 1: Create GitHub Repository

1. **Initialize Git**
   ```bash
   cd "/Users/danallen/Library/Mobile Documents/com~apple~CloudDocs/MCA_Bridge/benebridge-website"
   git init
   git add .
   git commit -m "Initial BeneBridge website"
   ```

2. **Create GitHub Repo**
   - Go to https://github.com/new
   - Repository name: `benebridge-website`
   - Make it Private (unless you want it public)
   - Click "Create repository"

3. **Push to GitHub**
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/benebridge-website.git
   git branch -M main
   git push -u origin main
   ```

### Step 2: Connect Netlify to GitHub

1. **Import from Git**
   - In Netlify, click "Add new site" → "Import an existing project"
   - Choose "GitHub"
   - Authorize Netlify
   - Select your `benebridge-website` repository

2. **Configure Build Settings**
   - Build command: (leave empty - it's a static site)
   - Publish directory: `/` (root)
   - Click "Deploy site"

3. **Automatic Deploys**
   - Now when you push changes to GitHub, Netlify automatically rebuilds
   - `git add .`
   - `git commit -m "Update content"`
   - `git push`
   - Site updates in 30 seconds!

---

## Setting Up Contact Form Email

Your contact form currently just shows a success message. To receive actual emails:

### Option 1: Netlify Forms (Easiest - FREE)

1. **Update `index.html`**
   Add `data-netlify="true"` to your form:
   ```html
   <form class="contact-form-modern" id="contactForm" data-netlify="true" name="contact">
   ```

2. **Add Hidden Input**
   ```html
   <input type="hidden" name="form-name" value="contact">
   ```

3. **Redeploy**
   - Upload updated files to Netlify
   - Submissions appear in Netlify dashboard under "Forms"
   - Configure email notifications in Netlify settings

### Option 2: Formspree (100 submissions/month free)

1. **Sign up at https://formspree.io**
2. Create new form, get form ID
3. Update `script.js` line with your form ID:
   ```javascript
   fetch('https://formspree.io/f/YOUR_FORM_ID', {
       method: 'POST',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify(formData)
   });
   ```

### Option 3: Email Directly to dan@benebridge.io

Update the form to use `mailto:` (works but creates worse UX):
```html
<form action="mailto:dan@benebridge.io" method="post" enctype="text/plain">
```

---

## Add Google Analytics (Optional but Recommended)

1. **Create Google Analytics Account**
   - Go to https://analytics.google.com
   - Create property for "benebridge.io"
   - Get your Measurement ID (looks like G-XXXXXXXXXX)

2. **Add to Your Site**
   Add before `</head>` in `index.html`:
   ```html
   <!-- Google Analytics -->
   <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
   <script>
     window.dataLayer = window.dataLayer || [];
     function gtag(){dataLayer.push(arguments);}
     gtag('js', new Date());
     gtag('config', 'G-XXXXXXXXXX');
   </script>
   ```

3. **Redeploy to Netlify**

---

## Post-Deployment Checklist

Once your site is live:

- [ ] Visit https://benebridge.io and verify it loads
- [ ] Check https://www.benebridge.io works (should redirect)
- [ ] Verify HTTPS (green lock icon)
- [ ] Test on mobile device
- [ ] Submit contact form to test email delivery
- [ ] Check Google Analytics is tracking (if enabled)
- [ ] Submit to Google Search Console
- [ ] Update LinkedIn company page with website URL
- [ ] Update Twitter bio with website URL
- [ ] Share on LinkedIn!

---

## Troubleshooting

**Site not loading after DNS change:**
- Wait longer (DNS can take 24 hours)
- Check https://www.whatsmydns.net/#A/benebridge.io
- Clear browser cache (Cmd+Shift+R on Mac)

**HTTPS not working:**
- Wait for DNS to fully propagate first
- In Netlify, go to Domain settings → HTTPS → "Verify DNS configuration"
- May take a few hours after DNS propagates

**Contact form not working:**
- Check browser console for errors (right-click → Inspect → Console)
- Verify Formspree/Netlify Forms is properly configured
- Test with a simple test submission

**Images not loading:**
- Make sure `logo-actual.svg` is in the same folder as `index.html`
- Check file names match exactly (case-sensitive)

---

## Future Updates

To update your live website:

### Via Netlify Dashboard (Manual):
1. Make changes to files locally
2. Go to Netlify dashboard → "Deploys"
3. Drag updated folder to deploy new version

### Via GitHub (Automatic):
1. Make changes locally
2. `git add .`
3. `git commit -m "Update description"`
4. `git push`
5. Site updates automatically in 30 seconds!

---

## Cost Breakdown

**Free Option:**
- Netlify: Free (includes HTTPS, CDN, forms)
- Domain: $35/year (already purchased)
- **Total: $35/year**

**With Additions:**
- Google Analytics: Free
- Formspree Basic: Free (100 submissions/month)
- Email forwarding: Free via Namecheap
- **Total: Still $35/year**

---

## Need Help?

If you run into issues:
1. Check Netlify docs: https://docs.netlify.com
2. Check DNS propagation: https://www.whatsmydns.net
3. Email me the error message and I'll help troubleshoot

---

**Your website is production-ready! Let's get it live! 🚀**

Recommended: Use the Netlify drag-and-drop method first (Step 1), then set up GitHub later if you want automatic deployments.
