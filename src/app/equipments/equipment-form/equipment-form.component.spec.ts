//import { browser, element, by } from 'protractor';

describe('Create New Equipment', () => {
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
    element(by.id('add')).getWebElement().click();
    browser.sleep(1000);
  });

  it('should create new equipment', () => {
    element(by.id('number')).getWebElement().sendKeys('12345');
    browser.sleep(1000);
    element(by.id('serialNumber')).getWebElement().sendKeys('123AB1');
    browser.sleep(1000);
    element(by.id('description')).getWebElement().sendKeys('Teste Descrição');
    browser.sleep(1000);
    element(by.id('categories')).sendKeys('Software');
    browser.sleep(1000);
    element(by.id('conservationStates')).sendKeys('CONSERVADO');
    browser.sleep(1000);
    element(by.id('block')).getWebElement().sendKeys('A');
    browser.sleep(1000);
    element(by.id('room')).getWebElement().sendKeys('1');
    browser.sleep(1000);
    element(by.id('hostname')).getWebElement().sendKeys('DESKTOP');
    browser.sleep(1000);
    element(by.id('addressIP')).getWebElement().sendKeys('100.100.10.1');
    browser.sleep(1000);
    element(by.id('addressMAC')).getWebElement().sendKeys('9B-F1-R4-57-H9');
    browser.sleep(1000);
    element(by.id('save')).getWebElement().click();
    browser.sleep(5000);
  });

  it('should not create new equipment without category', () => {
    element(by.id('number')).getWebElement().sendKeys('12345');
    browser.sleep(1000);
    element(by.id('serialNumber')).getWebElement().sendKeys('123AB1');
    browser.sleep(1000);
    element(by.id('description')).getWebElement().sendKeys('Teste Descrição');
    browser.sleep(1000);
    element(by.id('conservationStates')).sendKeys('CONSERVADO');
    browser.sleep(1000);
    element(by.id('block')).getWebElement().sendKeys('A');
    browser.sleep(1000);
    element(by.id('room')).getWebElement().sendKeys('1');
    browser.sleep(1000);
    element(by.id('hostname')).getWebElement().sendKeys('DESKTOP');
    browser.sleep(1000);
    element(by.id('addressIP')).getWebElement().sendKeys('100.100.10.1');
    browser.sleep(1000);
    element(by.id('addressMAC')).getWebElement().sendKeys('9B-F1-R4-57-H9');
    browser.sleep(1000);
    element(by.id('save')).getWebElement().click();
    browser.sleep(5000);
  });

  it('should not create new equipment without conservation state', () => {
    element(by.id('number')).getWebElement().sendKeys('12345');
    browser.sleep(1000);
    element(by.id('serialNumber')).getWebElement().sendKeys('123AB1');
    browser.sleep(1000);
    element(by.id('description')).getWebElement().sendKeys('Teste Descrição');
    browser.sleep(1000);
    element(by.id('categories')).sendKeys('Software');
    browser.sleep(1000);
    element(by.id('block')).getWebElement().sendKeys('A');
    browser.sleep(1000);
    element(by.id('room')).getWebElement().sendKeys('1');
    browser.sleep(1000);
    element(by.id('hostname')).getWebElement().sendKeys('DESKTOP');
    browser.sleep(1000);
    element(by.id('addressIP')).getWebElement().sendKeys('100.100.10.1');
    browser.sleep(1000);
    element(by.id('addressMAC')).getWebElement().sendKeys('9B-F1-R4-57-H9');
    browser.sleep(1000);
    element(by.id('save')).getWebElement().click();
    browser.sleep(5000);
  });
});
