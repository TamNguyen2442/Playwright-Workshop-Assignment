import { Page } from '@playwright/test';

export class CheckoutPage {
  readonly page: Page;
  readonly firstNameInput = '[data-test="firstName"]';
  readonly lastNameInput = '[data-test="lastName"]';
  readonly postalCodeInput = '[data-test="postalCode"]';
  readonly continueButton = '[data-test="continue"]';
  readonly finishButton = '[data-test="finish"]';
  readonly thankYouMessage = '.complete-header';
  readonly thankYouDetail = '.complete-text';

  constructor(page: Page) {
    this.page = page;
  }

  async fillCheckoutInfo(firstName: string, lastName: string, postalCode: string) {
    await this.page.fill(this.firstNameInput, firstName);
    await this.page.fill(this.lastNameInput, lastName);
    await this.page.fill(this.postalCodeInput, postalCode);
    await this.page.click(this.continueButton);
  }

  async finishCheckout() {
    await this.page.click(this.finishButton);
  }

  async getThankYouMessage() {
    return this.page.textContent(this.thankYouMessage);
  }

  async getThankYouDetail() {
    return this.page.textContent(this.thankYouDetail);
  }
}