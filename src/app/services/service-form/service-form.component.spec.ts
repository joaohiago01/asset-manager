//import { browser, element, by } from 'protractor';

describe('Create New Service', () => {
  beforeAll(() => {
    browser.driver.manage().window().maximize();
    browser.get('https://localhost:4200/login');
    element(by.id('username')).getWebElement().sendKeys('admin');
    browser.sleep(1000);
    element(by.id('password')).getWebElement().sendKeys('admin');
    browser.sleep(1000);
    element(by.id('login')).getWebElement().click();
    browser.sleep(1000);
  });

  beforeEach(() => {
    browser.get('https://localhost:4200/services');
    browser.sleep(1000);
    element(by.id('add')).getWebElement().click();
    browser.sleep(1000);
  });

  it('should not create new service with only description', () => {
    element(by.id('description')).getWebElement().sendKeys('Conserto do equipamento');
    browser.sleep(1000);

    element(by.id('save')).getWebElement().click();
    browser.sleep(5000);
  });

  it('should not add a select asset without setting the amount', () => {
    element(by.id('assetsTab')).getWebElement().click();
    browser.sleep(2000);
    
    element(by.id('assetSearch')).sendKeys('Papel Sulfite A4');
    browser.sleep(2000);

    element(by.id('assetAddButton')).getWebElement().click();
    browser.sleep(4000);
  });

  it('should create new service without sending SUAP form', () => {
    element(by.id('equipmentSearch')).sendKeys('IMPRESSORA ECO-TANK. MARCA: EPSON');
    browser.sleep(1000);

    element(by.id('description')).getWebElement().sendKeys('Conserto do equipamento');
    browser.sleep(1000);

    element(by.id('serviceTypes')).sendKeys('CONSERTO');
    browser.sleep(1000);

    element(by.id('departments')).sendKeys('Coordenação de ADS');
    browser.sleep(1000);

    element(by.id('suapTab')).getWebElement().click();
    browser.sleep(2000);
    
    element(by.id('assetsTab')).getWebElement().click();
    browser.sleep(2000);
    
    element(by.id('assetSearch')).sendKeys('Papel Sulfite A4');
    browser.sleep(1000);

    element(by.id('assetAmount')).getWebElement().sendKeys('1');
    
    element(by.id('assetAddButton')).getWebElement().click();
    browser.sleep(2000);

    element(by.id('save')).getWebElement().click();
    browser.sleep(5000);
  });
});
