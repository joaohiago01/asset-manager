//import { browser, element, by } from 'protractor';

describe('Edit Or Delete Equipment', () => {
  beforeEach(() => {
    browser.driver.manage().window().maximize();
    browser.get('https://localhost:4200/login');
    element(by.id('username')).getWebElement().sendKeys('admin');
    browser.sleep(1000);
    element(by.id('password')).getWebElement().sendKeys('admin');
    browser.sleep(1000);
    element(by.id('login')).getWebElement().click();
    browser.sleep(1000);
    browser.get('https://localhost:4200/equipments');
    browser.sleep(1000);
    element(by.id('edit')).getWebElement().click();
    browser.sleep(1000);
  });

  it('should edit equipment', () => {
    element(by.id('number')).getWebElement().clear();
    browser.sleep(1000);
    element(by.id('number')).getWebElement().sendKeys('9876');
    browser.sleep(1000);
    element(by.id('description')).getWebElement().clear();
    browser.sleep(1000);
    element(by.id('description')).getWebElement().sendKeys('Teste Editar');
    browser.sleep(1000);
    element(by.id('save')).getWebElement().click();
    browser.sleep(5000);
  });

  it('should not edit equipment without number', () => {
    element(by.id('number')).getWebElement().clear();
    browser.sleep(1000);
    element(by.id('save')).getWebElement().click();
    browser.sleep(5000);
  });

  it('should not delete equipment', () => {
    element(by.id('delete')).getWebElement().click();
    browser.sleep(5000);
  });
});
