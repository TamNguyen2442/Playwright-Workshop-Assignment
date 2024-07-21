# Setup project
1. Clone project from link: git@github.com:TamNguyen2442/Playwright-Workshop-Assignment.git
2. Install node
3. Set timeout in file playwright.config.ts (timeout: 60000)
   
# Run Playwright Workshop Assignment
1. Open terminal from VS
1. Install Playwright: npm init playwright@latest
2. Run tc session3:
   Chrome: npx playwright test <filename>.spec.ts --project=chrome --headed
   Firefox: npx playwright test <filename>.spec.ts --project=firefox --headed
   Safari: npx playwright test <filename>.spec.ts --project=webkit --headed
