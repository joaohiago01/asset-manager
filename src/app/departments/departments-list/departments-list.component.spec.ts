// import { browser, element, by } from 'protractor';

describe('Create or Edit New Department', () => {
  beforeAll(() => {
    browser.driver.manage().window().maximize();
    browser.get('https://localhost:4200/login');

    element(by.id('username')).getWebElement().sendKeys('admin');
    browser.sleep(1000);

    element(by.id('password')).getWebElement().sendKeys('admin');
    browser.sleep(1000);

    element(by.id('login')).getWebElement().click();
    browser.sleep(1000);

    browser.get('https://localhost:4200/departments');
  });

  it('should create new department', () => {
    element(by.id('addButton')).getWebElement().click();
    browser.sleep(1000);

    element(by.id('nameModalNew')).sendKeys('Coordenação de Análise e Desenvolvimento de Sistemas');
    browser.sleep(1000);

    element(by.id('acronymModalNew')).sendKeys('CCADS');
    browser.sleep(1000);

    element(by.id('create')).getWebElement().click();
    browser.sleep(5000);
  });

  it('should create new department with the same acronym', () => {
    element(by.id('addButton')).getWebElement().click();
    browser.sleep(1000);

    element(by.id('nameModalNew')).sendKeys('Coordenação de ADS');
    browser.sleep(1000);

    element(by.id('acronymModalNew')).sendKeys('CCADS');
    browser.sleep(1000);

    element(by.id('create')).getWebElement().click();
    browser.sleep(3000);

    let alert = browser.switchTo().alert();
    expect(alert.getText()).toEqual('Oops, ocorreu um erro ao tentar cadastrar esse setor');
  });
  
});
