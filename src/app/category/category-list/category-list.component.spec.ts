//import { browser, element, by } from 'protractor';

describe('Create Or Edit Category', () => {
  beforeEach(() => {
    browser.driver.manage().window().maximize();
    browser.get('https://localhost:4200/login');
    element(by.id('username')).getWebElement().sendKeys('admin');
    browser.sleep(1000);
    element(by.id('password')).getWebElement().sendKeys('admin');
    browser.sleep(1000);
    element(by.id('login')).getWebElement().click();
    browser.sleep(1000);
    browser.get('https://localhost:4200/category');
  });

  it('should create category', () => {
    element(by.id('add')).getWebElement().click();
    browser.sleep(1000);
    element(by.id('nameModalNew')).getWebElement().sendKeys('Rede');
    browser.sleep(1000);
    element(by.id('categoryTypesModalNew')).sendKeys('REDE');
    browser.sleep(1000);
    element(by.id('create')).getWebElement().click();
    browser.sleep(5000);
  });

  it('should edit category', () => {
    element(by.id('details')).getWebElement().click();
    browser.sleep(1000);
    element(by.id('nameModalEdit')).getWebElement().clear();
    browser.sleep(1000);
    element(by.id('nameModalEdit')).getWebElement().sendKeys('Categoria Editada');
    browser.sleep(1000);
    element(by.id('categoryTypesModalEdit')).sendKeys('');
    browser.sleep(1000);
    element(by.id('categoryTypesModalEdit')).sendKeys('OUTROS');
    browser.sleep(1000);
    element(by.id('edit')).getWebElement().click();
    browser.sleep(5000);
  });
});
