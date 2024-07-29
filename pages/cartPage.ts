import { Page } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly checkoutButton = '[data-test="checkout"]';

  constructor(page: Page) {
    this.page = page;
  }

  async checkout() {
    await this.page.click(this.checkoutButton);
  }
}