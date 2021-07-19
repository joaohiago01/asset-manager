//import { browser, element, by } from 'protractor';

describe('Create, Edit or Delete Loan', () => {
  beforeEach(() => {
    browser.driver.manage().window().maximize();
    browser.get('https://localhost:4200/login');
    element(by.id('username')).getWebElement().sendKeys('admin');
    browser.sleep(1000);
    element(by.id('password')).getWebElement().sendKeys('admin');
    browser.sleep(1000);
    element(by.id('login')).getWebElement().click();
    browser.sleep(1000);
    browser.get('https://localhost:4200/loans');
  });

  it('should create new loan', () => {
    browser.sleep(1000);
    element(by.id('add')).getWebElement().click();
    browser.sleep(1000);
    element(by.id('consignorName')).getWebElement().sendKeys('Teste Expedidor');
    browser.sleep(1000);
    element(by.id('consignorRegistrationNumber')).getWebElement().sendKeys('122345');
    browser.sleep(1000);
    element(by.id('requestorName')).getWebElement().sendKeys('Teste Solicitante');
    browser.sleep(1000);
    element(by.id('requestorRegistrationNumber')).getWebElement().sendKeys('543321');
    browser.sleep(1000);
    element(by.id('callNumberSuap')).getWebElement().sendKeys('89767856764');
    browser.sleep(1000);
    element(by.id('callLinkSuap')).getWebElement().sendKeys('https://suap.ifpb.edu.br');
    browser.sleep(1000);
    element(by.id('returnDate')).getWebElement().sendKeys('19/07/2021');
    browser.sleep(1000);
    element(by.id('expectedReturnDate')).getWebElement().sendKeys('20/07/2021');
    browser.sleep(1000);
    element(by.id('equipments')).sendKeys('EQUIPAMENTO SLUMP TEST');
    browser.sleep(1000);
    element(by.id('departments')).sendKeys('Setor 1');
    browser.sleep(1000);
    element(by.id('observations')).getWebElement().sendKeys('Observações');
    browser.sleep(1000);
    element(by.id('create')).getWebElement().click();
    browser.sleep(5000);
  });

  it('should create new loan without equipment', () => {
    browser.sleep(1000);
    element(by.id('add')).getWebElement().click();
    browser.sleep(1000);
    element(by.id('consignorName')).getWebElement().sendKeys('Teste Expedidor');
    browser.sleep(1000);
    element(by.id('consignorRegistrationNumber')).getWebElement().sendKeys('122345');
    browser.sleep(1000);
    element(by.id('requestorName')).getWebElement().sendKeys('Teste Solicitante');
    browser.sleep(1000);
    element(by.id('requestorRegistrationNumber')).getWebElement().sendKeys('543321');
    browser.sleep(1000);
    element(by.id('callNumberSuap')).getWebElement().sendKeys('89767856764');
    browser.sleep(1000);
    element(by.id('callLinkSuap')).getWebElement().sendKeys('https://suap.ifpb.edu.br');
    browser.sleep(1000);
    element(by.id('returnDate')).getWebElement().sendKeys('20/07/2021');
    browser.sleep(1000);
    element(by.id('expectedReturnDate')).getWebElement().sendKeys('19/07/2021');
    browser.sleep(1000);
    element(by.id('departments')).sendKeys('Setor 1');
    browser.sleep(1000);
    element(by.id('observations')).getWebElement().sendKeys('Observações');
    browser.sleep(1000);
    element(by.id('create')).getWebElement().click();
    browser.sleep(5000);
  });

  it('should create new loan without equipment', () => {
    browser.sleep(1000);
    element(by.id('add')).getWebElement().click();
    browser.sleep(1000);
    element(by.id('consignorName')).getWebElement().sendKeys('Teste Expedidor');
    browser.sleep(1000);
    element(by.id('consignorRegistrationNumber')).getWebElement().sendKeys('122345');
    browser.sleep(1000);
    element(by.id('requestorName')).getWebElement().sendKeys('Teste Solicitante');
    browser.sleep(1000);
    element(by.id('requestorRegistrationNumber')).getWebElement().sendKeys('543321');
    browser.sleep(1000);
    element(by.id('callNumberSuap')).getWebElement().sendKeys('89767856764');
    browser.sleep(1000);
    element(by.id('callLinkSuap')).getWebElement().sendKeys('https://suap.ifpb.edu.br');
    browser.sleep(1000);
    element(by.id('returnDate')).getWebElement().sendKeys('20/07/2021');
    browser.sleep(1000);
    element(by.id('expectedReturnDate')).getWebElement().sendKeys('19/07/2021');
    browser.sleep(1000);
    element(by.id('equipments')).sendKeys('EQUIPAMENTO SLUMP TEST');
    browser.sleep(1000);
    element(by.id('observations')).getWebElement().sendKeys('Observações');
    browser.sleep(1000);
    element(by.id('create')).getWebElement().click();
    browser.sleep(5000);
  });

  it('should edit loan', () => {
    browser.sleep(1000);
    element(by.id('edit')).getWebElement().click();
    browser.sleep(1000);
    element(by.id('consignorName')).getWebElement().clear();
    browser.sleep(1000);
    element(by.id('consignorName')).getWebElement().sendKeys('Teste Expedidor 1');
    browser.sleep(1000);
    element(by.id('create')).getWebElement().click();
    browser.sleep(2000);
    element(by.id('edit')).getWebElement().click();
    browser.sleep(4000);
  });

  it('should delete loan', () => {
    element(by.id('edit')).getWebElement().click();
    browser.sleep(2000);
    element(by.id('delete')).getWebElement().click();
  });
});
