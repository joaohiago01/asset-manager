let SpecReporter = require('jasmine-spec-reporter').SpecReporter;

exports.config = {
  framework: 'jasmine',
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: [
    './src/app/category/category-list/category-list.component.spec.ts',
    './src/app/equipments/equipment-form/equipment-form.component.spec.ts',
    './src/app/equipments/equipments-list/equipments-list.component.spec.ts',
    './src/app/assets/asset-form/asset-form.component.spec.ts',
    './src/app/assets/asset-list/asset-list.component.spec.ts',
    './src/app/software-licenses/software-licenses-list/software-licenses-list.component.spec.ts'
  ],

  onPrepare: function(){
    jasmine.getEnv().addReporter(new SpecReporter({
      displayFailuresSummary: true,
      displayFailuredSpec: true,
      displaySuiteNumber: true,
      displaySpecDuration: true
    }));
  }
}