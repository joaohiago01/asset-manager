//import { browser, element, by } from 'protractor';

describe('Show Dashboard', () => {
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

  it('should list all asset inputs in dashboard', () => {
    element(by.id('loanTabButton')).getWebElement().click();
    browser.sleep(2000);
    element(by.id('serviceTabButton')).getWebElement().click();
    browser.sleep(2000);
    element(by.id('inputAssetTabButton')).getWebElement().click();
    browser.sleep(2000);
    element(by.id('outputAssetTabButton')).getWebElement().click();
    browser.sleep(2000);
  });

  it('should show details of asset input', () => {
    element(by.id('inputAssetTabButton')).getWebElement().click();
    browser.sleep(2000);
    element(by.id('detailButtonAssetInput')).getWebElement().click();
    browser.sleep(2000);
  });

  it('should show details of asset output', () => {
    element(by.id('outputAssetTabButton')).getWebElement().click();
    browser.sleep(2000);
    element(by.id('detailButtonAssetOutput')).getWebElement().click();
    browser.sleep(2000);
  });

  it('should show details of loan', () => {
    element(by.id('loanTabButton')).getWebElement().click();
    browser.sleep(2000);
    element(by.id('detailButtonLoan')).getWebElement().click();
    browser.sleep(2000);
  });

  it('should show details of service', () => {
    element(by.id('serviceTabButton')).getWebElement().click();
    browser.sleep(2000);
    element(by.id('detailButtonService')).getWebElement().click();
    browser.sleep(2000);
  });

});
