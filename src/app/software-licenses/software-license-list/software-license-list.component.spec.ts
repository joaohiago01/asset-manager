//import { browser, element, by } from 'protractor';

describe('List Software Licenses', () => {
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

  it('should list all software licenses', () => {
    browser.get('https://localhost:4200/software-licenses');
    browser.sleep(2000);
  });

  it('should show details of software license', () => {
    browser.get('https://localhost:4200/software-licenses');
    browser.sleep(2000);
    element(by.id('edit')).getWebElement().click();
    browser.sleep(2000);
  });

});
