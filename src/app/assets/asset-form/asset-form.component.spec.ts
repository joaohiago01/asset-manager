//import { browser, element, by } from 'protractor';

describe('Create or Edit New Equipment', () => {
  beforeEach(() => {
    browser.driver.manage().window().maximize();
    browser.get('https://localhost:4200/login');
    element(by.id('username')).getWebElement().sendKeys('admin');
    browser.sleep(1000);
    element(by.id('password')).getWebElement().sendKeys('admin');
    browser.sleep(1000);
    element(by.id('login')).getWebElement().click();
    browser.sleep(1000);
    browser.get('https://localhost:4200/assets/form');
  });

  it('should create new asset', () => {
    element(by.id('categories')).sendKeys('Rede');
    browser.sleep(1000);
    element(by.id('name')).getWebElement().sendKeys('Insumo Teste');
    browser.sleep(1000);
    element(by.id('bookcase')).getWebElement().sendKeys('A');
    browser.sleep(1000);
    element(by.id('shelf')).getWebElement().sendKeys('1');
    browser.sleep(1000);
    element(by.id('minQuantity')).getWebElement().sendKeys('10');
    browser.sleep(1000);
    element(by.id('currentQuantity')).getWebElement().sendKeys('20');
    browser.sleep(1000);
    element(by.id('unitOfMeasurement')).getWebElement().sendKeys('Metros');
    browser.sleep(1000);
    element(by.id('create')).getWebElement().click();
    browser.sleep(5000);
  });

  it('should not create new asset without min quantity', () => {
    element(by.id('categories')).sendKeys('Rede');
    browser.sleep(1000);
    element(by.id('name')).getWebElement().sendKeys('Insumo Teste');
    browser.sleep(1000);
    element(by.id('bookcase')).getWebElement().sendKeys('A');
    browser.sleep(1000);
    element(by.id('shelf')).getWebElement().sendKeys('1');
    browser.sleep(1000);
    element(by.id('currentQuantity')).getWebElement().sendKeys('20');
    browser.sleep(1000);
    element(by.id('unitOfMeasurement')).getWebElement().sendKeys('Metros');
    browser.sleep(1000);
    element(by.id('create')).getWebElement().click();
    browser.sleep(5000);
  });

  it('should not create new asset without current quantity', () => {
    element(by.id('categories')).sendKeys('Rede');
    browser.sleep(1000);
    element(by.id('name')).getWebElement().sendKeys('Insumo Teste');
    browser.sleep(1000);
    element(by.id('bookcase')).getWebElement().sendKeys('A');
    browser.sleep(1000);
    element(by.id('shelf')).getWebElement().sendKeys('1');
    browser.sleep(1000);
    element(by.id('minQuantity')).getWebElement().sendKeys('10');
    browser.sleep(1000);
    element(by.id('unitOfMeasurement')).getWebElement().sendKeys('Metros');
    browser.sleep(1000);
    element(by.id('create')).getWebElement().click();
    browser.sleep(5000);
  });
});
