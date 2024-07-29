import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { InventoryPage } from '../pages/inventoryPage';
import { CartPage } from '../pages/cartPage';
import { CheckoutPage } from '../pages/checkoutPage';

test('TC001 - Verify error message appears when login with invalid user', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login('locked_out_user', 'secret_sauce');

  const errorMessage = await loginPage.getErrorMessage();
  expect(errorMessage).toBe('Epic sadface: Sorry, this user has been locked out.');
});

test('TC002 - Verify user can order product successfully', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  // Login
  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');

  // Verify inventory page
  const pageTitle = await inventoryPage.getPageTitle();
  expect(pageTitle).toBe('Products');

  // Add item to cart
  await inventoryPage.addItemToCart();
  await inventoryPage.goToCart();

  // Checkout process
  await cartPage.checkout();
  await checkoutPage.fillCheckoutInfo('Tam', 'Nguyen', '2442');
  await checkoutPage.finishCheckout();

  // Verify thank you message
  const thankYouMessage = await checkoutPage.getThankYouMessage();
  const thankYouDetail = await checkoutPage.getThankYouDetail();

  expect(thankYouMessage).toBe('Thank you for your order!');
  expect(thankYouDetail).toBe('Your order has been dispatched, and will arrive just as fast as the pony can get there!');
});
