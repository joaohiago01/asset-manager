// import { browser, element, by } from 'protractor';

describe('Create new Asset Input and Output', () => {
  beforeAll(() => {
    browser.driver.manage().window().maximize();
    browser.get('https://localhost:4200/login');

    element(by.id('username')).getWebElement().sendKeys('admin');
    browser.sleep(1000);

    element(by.id('password')).getWebElement().sendKeys('admin');
    browser.sleep(1000);

    element(by.id('login')).getWebElement().click();
    browser.sleep(1000);

    browser.get('https://localhost:4200/assets');
    browser.sleep(2000);

    element(by.id('detailButton')).getWebElement().click();
  });

  it('should create new asset input', () => {
    element(by.id('assetInput')).getWebElement().click();
    browser.sleep(1000);

    element(by.id('dateModalInput')).sendKeys('21/07/2021');
    browser.sleep(1000);

    element(by.id('expirationDateModalInput')).sendKeys('21/08/2021');
    browser.sleep(1000);

    element(by.id('amountModalInput')).sendKeys('10');
    browser.sleep(1000);

    element(by.id('create')).getWebElement().click();
    browser.sleep(5000);
  });

  it('should create new asset output', () => {
    element(by.id('assetOutput')).getWebElement().click();
    browser.sleep(1000);

    element(by.id('outputAmount')).sendKeys('10');
    browser.sleep(1000);

    element(by.id('callNumberSuap')).sendKeys('5253');
    browser.sleep(1000);

    element(by.id('callLinkSuap')).sendKeys('https://suap.ifpb.edu.br');
    browser.sleep(1000);

    element(by.id('consignorName')).sendKeys('Expedidor Teste');
    browser.sleep(1000);

    element(by.id('consignorRegistrationNumber')).sendKeys('201715020085');
    browser.sleep(1000);

    element(by.id('requestorName')).sendKeys('Solicitante Teste');
    browser.sleep(1000);

    element(by.id('requestorRegistrationNumber')).sendKeys('201615420024');
    browser.sleep(1000);

    element(by.id('departments')).sendKeys('Coordenação de Análise e Desenvolvimento de Sistemas');
    browser.sleep(1000);

    element(by.id('create')).getWebElement().click();
    browser.sleep(3000);

    element(by.id('outputList')).getWebElement().click();
    browser.sleep(5000);
  });
  
});
