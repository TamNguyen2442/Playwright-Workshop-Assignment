import { test, expect } from '@playwright/test';

// Setup credentials and URLs
const BASE_URL = 'https://www.saucedemo.com/inventory.html';
const USERNAME = 'standard_user';
const PASSWORD = 'secret_sauce';

test.beforeEach(async ({ page }) => {
    // Go to the login page
    await page.goto(BASE_URL);
    // Log in with valid credentials
    await page.fill('input[data-test="username"]', USERNAME);
    await page.fill('input[data-test="password"]', PASSWORD);
    await page.click('input[data-test="login-button"]');
});


test('TC001 - Verify Sort by Price', async ({ page }) => {
    // Step 1: Go to the inventory page (Handled in beforeEach)

    // Expected Result 1: Validate the "Products" header is visible
    const header = page.locator('//span[@data-test="title"]');
    await expect(header).toHaveText('Products');

    // Step 2: Select "sort by price (low to high)"
    await page.locator(`//select[@data-test='product-sort-container']`).selectOption('lohi');

    // Expected Result 2: Validate the sort works correctly
    const prices = await page.$$eval('.inventory_item_price', elements =>
        elements.map(el => parseFloat(el.textContent?.replace('$', '') || '0'))
    );

    for (let i = 0; i < prices.length - 1; i++) {
        expect(prices[i]).toBeLessThanOrEqual(prices[i + 1]);
    }
});


test('TC002 - Verify User Can Order Product', async ({ page }) => {
    // Step 1: Go to the inventory page (Handled in beforeEach)

    // Expected Result 1: Validate the "Products" header is visible
    const header = page.locator('//span[@data-test="title"]');
    await expect(header).toHaveText('Products');

    // Step 2: Add the first item to the cart
    await page.click('button[data-test="add-to-cart-sauce-labs-backpack"]');

    // Expected Result 2: The button text changed into "Remove" and there is number '1' on the cart
    const removeButton = page.getByRole('button', { name: 'Remove' });
    await expect(removeButton).toBeVisible();
    const cartBadge = page.locator('.shopping_cart_badge');
    await expect(cartBadge).toHaveText('1');

    // Step 3: Click on the cart
    await page.click('.shopping_cart_link');

    // Expected Result 3: Validate pre-added item is visible in the cart
    const cartItem = page.locator('.inventory_item_name', { hasText: 'Sauce Labs Backpack' });
    await expect(cartItem).toBeVisible();

    // Step 4: Click checkout and input all required fields
    await page.click('button[data-test="checkout"]');
    await page.fill('input[data-test="firstName"]', 'John');
    await page.fill('input[data-test="lastName"]', 'Doe');
    await page.fill('input[data-test="postalCode"]', '12345');

    // Expected Result 4: Validate the corresponding fields display input text
    const firstName = await page.inputValue('input[data-test="firstName"]');
    const lastName = await page.inputValue('input[data-test="lastName"]');
    const postalCode = await page.inputValue('input[data-test="postalCode"]');
    expect(firstName).toBe('John');
    expect(lastName).toBe('Doe');
    expect(postalCode).toBe('12345');

    // Step 5: Click Continue
    await page.click('input[data-test="continue"]');

    // Expected Result 5: Validate checkout page has item added earlier
    const checkoutItem = page.locator('.inventory_item_name', { hasText: 'Sauce Labs Backpack' });
    await expect(checkoutItem).toBeVisible();

    // Step 6: Click Finish
    await page.click('button[data-test="finish"]');

    // Expected Result 6: Validate thank you message
    const thankYouMessage = page.locator('.complete-header');
    const dispatchMessage = page.locator('.complete-text');
    await expect(thankYouMessage).toHaveText('Thank you for your order!');
    await expect(dispatchMessage).toHaveText('Your order has been dispatched, and will arrive just as fast as the pony can get there!');
});
