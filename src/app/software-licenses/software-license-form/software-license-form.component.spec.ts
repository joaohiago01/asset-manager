//import { browser, element, by } from 'protractor';

describe('Create or Edit New Software License', () => {
  beforeEach(() => {
    browser.driver.manage().window().maximize();
    browser.get('https://localhost:4200/login');
    element(by.id('username')).getWebElement().sendKeys('admin');
    browser.sleep(1000);
    element(by.id('password')).getWebElement().sendKeys('admin');
    browser.sleep(1000);
    element(by.id('login')).getWebElement().click();
    browser.sleep(1000);
    browser.get('https://localhost:4200/software-licenses');
  });

  it('should create new software license', () => {
    element(by.id('add')).getWebElement().click();
    browser.sleep(1000);
    element(by.id('categories')).sendKeys('Software');
    browser.sleep(1000);
    element(by.id('name')).getWebElement().sendKeys('Power Point');
    browser.sleep(1000);
    element(by.id('number')).getWebElement().sendKeys('1234789');
    browser.sleep(1000);
    element(by.id('activationKey')).getWebElement().sendKeys('12347ABR');
    browser.sleep(1000);
    element(by.id('maxActivations')).getWebElement().sendKeys('5');
    browser.sleep(1000);
    element(by.id('create')).getWebElement().click();
    browser.sleep(5000);
  });

  it('should not create new software license without max activations', () => {
    element(by.id('add')).getWebElement().click();
    browser.sleep(1000);
    element(by.id('categories')).sendKeys('Software');
    browser.sleep(1000);
    element(by.id('name')).getWebElement().sendKeys('Power Point');
    browser.sleep(1000);
    element(by.id('number')).getWebElement().sendKeys('1234789');
    browser.sleep(1000);
    element(by.id('activationKey')).getWebElement().sendKeys('12347ABR');
    browser.sleep(1000);
    element(by.id('create')).getWebElement().click();
    browser.sleep(5000);
  });

  it('should edit software license', () => {
    element(by.id('edit')).getWebElement().click();
    browser.sleep(1000);
    element(by.id('name')).getWebElement().clear();
    browser.sleep(1000);
    element(by.id('name')).getWebElement().sendKeys('Power Point 2');
    browser.sleep(1000);
    element(by.id('create')).getWebElement().click();
    browser.sleep(5000);
  });

  it('should not edit software license without max activations', () => {
    element(by.id('edit')).getWebElement().click();
    browser.sleep(1000);
    element(by.id('maxActivations')).getWebElement().clear();
    browser.sleep(1000);
    element(by.id('create')).getWebElement().click();
    browser.sleep(5000);
  });
});
