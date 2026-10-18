# Pocketspell Studios website

Static site for https://pocketspellstudios.com, hosted free on GitHub Pages.

## Pages
- `index.html` home and games list
- `lantern-keeper.html` game page
- `lantern-keeper-privacy.html` privacy policy (use this URL in Google Play Console)
- `support.html`, `press.html`, `about.html`, `404.html`
- `app-ads.txt` AdMob file (fill in your publisher ID later)
- `CNAME` tells GitHub Pages to use pocketspellstudios.com

## Going live
1. Create a **public** GitHub repo (for example `pocketspell-site`) and put these files at its root.
2. Repo **Settings → Pages**: Source = *Deploy from a branch*, Branch = `main`, folder `/ (root)`. Save.
3. In **Namecheap → Domain List → Manage → Advanced DNS** (keep Namecheap BasicDNS so email forwarding keeps working):
   - Delete the default **URL Redirect Record** for `@` and the **CNAME** for `www` that points to `parkingpage.namecheap.com`.
   - Add four **A Records**, Host `@`:
     `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - Add a **CNAME Record**, Host `www`, Value `cegenaus.github.io.`
   - Leave the Mail Settings (Email Forwarding) section alone.
4. Back in **Settings → Pages**, the custom domain should show `pocketspellstudios.com`. Once the DNS check passes (can take up to a few hours), tick **Enforce HTTPS**.

## Before launch
- Replace the placeholder art and screenshots.
- Add the Google Play link on `lantern-keeper.html` once the store listing exists.
- Put your real AdMob line in `app-ads.txt` (remove the `# ` in front of it).
- Re-check the privacy policy if the game adds analytics, cloud saves, or anything else that collects data.
