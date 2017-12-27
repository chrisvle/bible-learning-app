import { browser, ElementFinder, ExpectedConditions } from 'protractor';

export class Helper {
  clickElement(element) {
    this.wait();
    return element.click();
  }

  expectElementToBePresent(element: ElementFinder, timeout?: number) {
    return timeout ? browser.wait(ExpectedConditions.presenceOf(element), timeout)
      : browser.wait(ExpectedConditions.presenceOf(element));
  }

  expectElementNotToBePresent(element: ElementFinder, timeout?: number) {
    return timeout ? browser.wait(ExpectedConditions.stalenessOf(element), timeout)
      : browser.wait(ExpectedConditions.stalenessOf(element));
  }

  expectUrlToContain(url: string, timeout?: number) {
    return timeout ? browser.wait(ExpectedConditions.urlContains(url), timeout)
      : browser.wait(ExpectedConditions.urlContains(url));
  }

  navigateTo(path: string) {
    return browser.get(path);
  }

  wait() {
    browser.waitForAngular();
  }
}
