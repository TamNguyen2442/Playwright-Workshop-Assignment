import { test, expect } from '@playwright/test';

test('TC001 - Verify Checkboxes', async ({ page }) => {
  // Step 1.1: Go to the website
  await page.goto('https://the-internet.herokuapp.com/');
  
  // Step 1.2: Select 'Checkboxes' link
  await page.getByRole('link', { name: 'Checkboxes' }).click();

  // Verify Checkboxes header title is displayed
  const header = await page.getByRole('heading', { name: 'Checkboxes' });
  await expect(header).toBeVisible();

  // Step 2: Check 'checkbox1' and uncheck 'checkbox2'
  const checkboxes = page.locator('input[type="checkbox"]');
  const checkbox1 = checkboxes.nth(0);
  const checkbox2 = checkboxes.nth(1);

  if (!await checkbox1.isChecked()) {
    await checkbox1.check();
  }

  if (await checkbox2.isChecked()) {
    await checkbox2.uncheck();
  }

  // Verify the expected results
  await expect(checkbox1).toBeChecked();
  await expect(checkbox2).not.toBeChecked();
});



test('TC002 - Verify Drag and Drop', async ({ page }) => {
  // Step 1.1: Go to the website
  await page.goto('https://the-internet.herokuapp.com/');

  // Step 1.2: Select 'Drag and Drop' link
  await page.getByRole('link', { name: 'Drag and Drop' }).click();

  // Verify Drag and Drop header title is displayed
  const header = await page.getByRole('heading', { name: 'Drag and Drop' });
  await expect(header).toBeVisible();

  // Step 2: Drag and Drop column A to column B
  const columnA = page.locator('#column-a');
  const columnB = page.locator('#column-b');

  await columnA.dragTo(columnB);

  // Verify the expected results
  await expect(columnA).toHaveText('B');
  await expect(columnB).toHaveText('A');
});



test('TC003 - Verify Dropdown', async ({ page }) => {
  // Step 1.1: Go to the website
  await page.goto('https://the-internet.herokuapp.com/');

  // Step 1.2: Select 'Dropdown' link
  await page.getByRole('link', { name: 'Dropdown' }).click();

  // Verify Dropdown List header title is displayed
  const header = await page.getByRole('heading', { name: 'Dropdown List' });
  await expect(header).toBeVisible();

  // Step 2: Select item by label 'Option 2'
  const dropdown = page.locator('#dropdown');
  await dropdown.selectOption({ label: 'Option 2' });

  // Verify the current item is 'Option 2'
  await expect(dropdown).toHaveValue('2');

  // Step 3: Select item by index 1
  await dropdown.selectOption({ index: 1 });

  // Verify the current item is 'Option 1'
  await expect(dropdown).toHaveValue('1');

  // Step 4: Select item by value 2
  await dropdown.selectOption({ value: '2' });

  // Verify the current item is 'Option 2'
  await expect(dropdown).toHaveValue('2');
});



test('TC004 - Verify Frames (alternative)', async ({ page }) => {
  // Step 1: Go to the URL
  await page.goto('https://www.globalsqa.com/demo-site/frames-and-windows/');
  
  // Expected Result 1: Verify the page with 'Frames And Windows' text is shown
  const header = await page.locator('h1');
  await expect(header).toHaveText('Frames And Windows');

  // Step 2: Click on the "Iframe" tab
  await page.click('text=Iframe');
  await page.waitForTimeout(2000);
  
  // Expected Result 2: Verify the iframe is shown
  const iframe = page.frame({ name: 'globalSqa' });
  expect(iframe).not.toBeNull();

  // Step 3: On the iframe, input the search with text "Playwright"
  await iframe?.fill('#s', 'Playwright');

  // Step 4: Click the search icon
  await iframe?.click('button.button_search');
  
  // Expected Result 3: Verify the search bar in iframe displays the "Playwright" text
  const searchBarValue = await iframe?.locator('#s').inputValue();
  expect(searchBarValue).toBe('Playwright');

  // Expected Result 4: Verify the message "Sorry, no posts matched your criteria." is displayed
  const noPostsMessage = await iframe?.locator('.twelve.columns .search_res p').innerText();
  expect(noPostsMessage).toBe('Sorry, no posts matched your criteria.');
});


import path from 'path';

test('TC005 - Verify Upload file', async ({ page }) => {
  // File path to be uploaded
  const filePath = path.join(__dirname, 'files/test-file.txt');

  // Step 1: Go to the website and select 'File upload' link
  await page.goto('https://the-internet.herokuapp.com/');
  await page.click('text=File Upload');

  // Expected Result 1: Verify "File Uploader" header is shown
  const header = page.locator('h3');
  await expect(header).toHaveText('File Uploader');

  // Step 2: Select file and click upload
  await page.setInputFiles('#file-upload', filePath);
  await page.click('#file-submit');

  // Expected Result 2: Verify the message containing the file name is shown
  const resultMessage = page.locator('#uploaded-files');
  await expect(resultMessage).toHaveText('test-file.txt');
});


test('TC006 - Verify Dynamically Loaded Page Elements', async ({ page }) => {
  // Step 1.1: Go to the website
  await page.goto('https://the-internet.herokuapp.com/');

  // Step 1.2: Select 'Dynamic Loading' link
  await page.getByRole('link', { name: 'Dynamic Loading' }).click();

  // Verify "Dynamically Loaded Page Elements" header is shown
  const header = await page.getByRole('heading', { name: 'Dynamically Loaded Page Elements' });
  await expect(header).toBeVisible();

  // Step 2: Go to example 1 page
  await page.getByRole('link', { name: 'Example 1: Element on page that is hidden' }).click();

  // Verify "Dynamically Loaded Page Elements" header is shown again on example 1 page
  const exampleHeader = await page.getByRole('heading', { name: 'Dynamically Loaded Page Elements' });
  await expect(exampleHeader).toBeVisible();

  // Step 3: Click "Start" and verify the message "Hello World" is displayed
  await page.click('button');

 // Wait for the message element to appear and retrieve its text content
 const messageElement = await page.waitForSelector('#finish h4');
 const messageText = await messageElement.textContent();

 // Verify the message text
 expect(messageText).toBe('Hello World!');
});



test('TC007 - Verify input', async ({ page }) => {
  // Step 1: Go to the website
  await page.goto('https://testautomationpractice.blogspot.com/');

  // Verify the header is displayed
  const header = await page.getByRole('heading', { name: 'Automation Testing' });
  await expect(header).toBeVisible();

  // Step 2: Fill name
  const nameInput = page.locator('#name'); // Select by ID
  await nameInput.fill('Tam Nguyen');

  // Verify the name input displays the inputted value
  await expect(nameInput).toHaveValue('Tam Nguyen');

  // Step 3: Fill address
  const addressTextarea = page.locator('#textarea'); // Select by ID
  await addressTextarea.fill('2 Tan Vien');

  // Verify the address textarea displays the inputted value
  await expect(addressTextarea).toHaveValue('2 Tan Vien');

  // Step 4: Clear name
  await nameInput.fill('');

   // Verify the name input is cleared
   await expect(nameInput).toHaveValue('');

  // Step 5: Clear address
  await addressTextarea.fill('');

  // Verify the address textarea is cleared
  await expect(addressTextarea).toHaveValue('');
});



test('TC008 - Verify prompt dialog', async ({ page }) => {
  const your_name = 'Tam Nguyen';

  // Step 1: Go to the website
  await page.goto('https://testautomationpractice.blogspot.com/');

  // Expected Result 1: Verify the header is displayed
  const header = page.locator('h1.title');
  await expect(header).toHaveText('Automation Testing Practice');

  // Step 2: Click "Prompt" button to trigger and validate default prompt value
  page.on('dialog', async dialog => {
    // Expected Result 2: Verify the prompt message and default value
    await expect(dialog.message()).toBe('Please enter your name:');
    await expect(dialog.defaultValue()).toBe('Harry Potter');
    // Step 3: Accept the prompt with a custom value
    await dialog.accept(your_name);
  });

  // Click the "Prompt" button using text selector
  await page.click('button:has-text("Prompt")');

  // Expected Result 3: Verify the message is displayed with the entered name
  const resultMessage = page.locator('#demo');
  await expect(resultMessage).toHaveText(`Hello ${your_name}! How are you today?`);
});







