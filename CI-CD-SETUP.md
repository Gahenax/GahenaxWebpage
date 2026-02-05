# CI/CD SETUP - GitHub Actions

**Task:** OPS-001 - Implementar deployment automático  
**Status:** Workflow creado, secrets pendientes  

---

## ✅ Workflow Creado

**File:** `.github/workflows/deploy.yml`

**Triggers:**
- Push to `main` branch (automático)
- Manual dispatch (via GitHub UI)

**Actions:**
1. Checkout code
2. Deploy via FTP (exclude docs/scripts)
3. Verify deployment (HTTP 200 check)
4. Notify success/failure

---

## 🔐 Configure GitHub Secrets

### Required Secrets

Go to: https://github.com/Gahenax/GahenaxWebpage/settings/secrets/actions

Click **"New repository secret"** for each:

1. **FTP_SERVER**
   ```
   Value: 212.1.209.105
   ```

2. **FTP_USER**
   ```
   Value: u314799704
   ```

3. **FTP_PASSWORD**
   ```
   Value: Luisdaniel949.
   ```

---

## 🚀 Testing the Workflow

### Automatic Deploy (on push)

```bash
git add .
git commit -m "test: Trigger CI/CD"
git push origin main
```

Workflow will auto-run.

### Manual Deploy

1. Go to https://github.com/Gahenax/GahenaxWebpage/actions
2. Select "Deploy to Production"
3. Click "Run workflow"
4. Select branch: `main`
5. Click green "Run workflow" button

---

## 📊 Monitoring Deployments

**Actions Tab:** https://github.com/Gahenax/GahenaxWebpage/actions

Each run shows:
- ✅ Success (green check)
- ❌ Failure (red X)
- Logs for each step
- Duration

**Email Notifications:**
- GitHub sends email on workflow failure (default)
- Can configure custom notifications

---

## 🔄 Rollback Strategy (OPS-002)

### Current Approach: Git Revert

If deployment breaks production:

```bash
# Option 1: Revert last commit
git revert HEAD
git push origin main
# CI/CD will auto-deploy the reverted state

# Option 2: Reset to previous commit
git reset --hard <commit-hash>
git push --force origin main
# Forces deploy of older version
```

### Future Enhancement: Blue-Green Deployment

Recommended for FASE 3 advanced:

**Structure:**
```
FTP Server:
/releases/
  /2026-02-05-120000/  # Timestamped deployments
  /2026-02-05-110000/
/current → symlink to latest release
```

**Benefits:**
- Zero-downtime deployments
- Instant rollback (change symlink)
- Keep last 5 releases for safety

**Implementation:**
- Modify workflow to create timestamped folders
- Use FTP commands to update symlink
- Configure server to serve from `/current`

---

## ✅ Checklist

**Setup:**
- [x] `.github/workflows/deploy.yml` created
- [ ] FTP_SERVER secret configured
- [ ] FTP_USER secret configured
- [ ] FTP_PASSWORD secret configured

**Testing:**
- [ ] Push test commit to trigger workflow
- [ ] Verify workflow runs in Actions tab
- [ ] Confirm deployment success
- [ ] Check production site updated

**Documentation:**
- [x] CI-CD-SETUP.md created
- [ ] OWNERS.md updated with CI/CD owner
- [ ] Rollback procedure documented

---

## 🛡️ Security Best Practices

✅ **Secrets in GitHub** (not in code)  
✅ **Exclude sensitive files** (.env, scripts)  
✅ **Verification step** (HTTP check)  
⏳ **Branch protection** (require PR reviews) - Future  
⏳ **Deploy staging first** - Future enhancement  

---

## 📈 Benefits

**Before CI/CD:**
- Manual FTP uploads
- Human error risk
- No deployment history
- Slow process

**After CI/CD:**
- Automatic on git push
- Consistent deployments
- Full audit trail
- Fast iteration

---

## 🔜 Future Enhancements

- [ ] Deploy to staging environment first
- [ ] Run tests before deployment
- [ ] Slack/Discord notifications
- [ ] Performance budget checks
- [ ] Lighthouse CI integration
- [ ] Blue-green deployment strategy

---

**Next Steps:**
1. Configure secrets in GitHub
2. Push test commit
3. Verify successful deployment
4. Document in OWNERS.md
