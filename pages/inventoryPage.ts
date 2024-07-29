import { Page } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly firstItemAddToCartButton = '[data-test="add-to-cart-sauce-labs-backpack"]';
  readonly cartButton = '.shopping_cart_link';
  readonly pageTitle = '.title';

  constructor(page: Page) {
    this.page = page;
  }

  async addItemToCart() {
    await this.page.click(this.firstItemAddToCartButton);
  }

  async goToCart() {
    await this.page.click(this.cartButton);
  }

  async getPageTitle() {
    return this.page.textContent(this.pageTitle);
  }
}