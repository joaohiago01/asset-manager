//import { browser, element, by } from 'protractor';

describe('Associate Software License With Equipment', () => {
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

  it('should associate software license with equipment', () => {
    element(by.id('detailWithAssociationsButton')).getWebElement().click();
    browser.sleep(1000);
    element(by.id('associate')).getWebElement().click();
    browser.sleep(1000);
    element(by.id('equipmentSearch')).sendKeys('EQUIPAMENTO SLUMP TEST');
    browser.sleep(1000);
    element(by.id('equipmentSelected')).getWebElement().click();
    browser.sleep(1000);
    element(by.id('create')).getWebElement().click();
    browser.sleep(5000);
  });

  it('should dissociate software license with equipment', () => {
    element(by.id('detailWithAssociationsButton')).getWebElement().click();
    browser.sleep(1000);
    element(by.id('unlink')).getWebElement().click();
    browser.sleep(5000);
  });
});
