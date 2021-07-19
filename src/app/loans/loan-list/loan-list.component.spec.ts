//import { browser, element, by } from 'protractor';

describe('List Loans', () => {
  beforeEach(() => {
    browser.driver.manage().window().maximize();
    browser.get('https://localhost:4200/login');
    element(by.id('username')).getWebElement().sendKeys('admin');
    browser.sleep(1000);
    element(by.id('password')).getWebElement().sendKeys('admin');
    browser.sleep(1000);
    element(by.id('login')).getWebElement().click();
    browser.sleep(1000);
  });

  it('should list all loans', () => {
    browser.get('https://localhost:4200/loans');
    browser.sleep(3000);
  });

  it('should show details of loan', () => {
    browser.get('https://localhost:4200/loans');
    browser.sleep(2000);
    element(by.id('edit')).getWebElement().click();
    browser.sleep(2000);
  });

});
