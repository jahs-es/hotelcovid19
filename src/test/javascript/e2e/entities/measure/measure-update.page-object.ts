import { element, by, ElementFinder } from 'protractor';

export default class MeasureUpdatePage {
  pageTitle: ElementFinder = element(by.id('hotelcovid19App.measure.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  dateInput: ElementFinder = element(by.css('input#measure-date'));
  temperatureAt8Input: ElementFinder = element(by.css('input#measure-temperatureAt8'));
  temperatureAt20Input: ElementFinder = element(by.css('input#measure-temperatureAt20'));
  coughtInput: ElementFinder = element(by.css('input#measure-cought'));
  troubleToBreatheInput: ElementFinder = element(by.css('input#measure-troubleToBreathe'));
  sputumInput: ElementFinder = element(by.css('input#measure-sputum'));
  soreThroatInput: ElementFinder = element(by.css('input#measure-soreThroat'));
  ostTasteInput: ElementFinder = element(by.css('input#measure-ostTaste'));
  flutterInput: ElementFinder = element(by.css('input#measure-flutter'));
  diarrheaInput: ElementFinder = element(by.css('input#measure-diarrhea'));
  headacheInput: ElementFinder = element(by.css('input#measure-headache'));
  musclePainInput: ElementFinder = element(by.css('input#measure-musclePain'));
  notesInput: ElementFinder = element(by.css('input#measure-notes'));
  userSelect: ElementFinder = element(by.css('select#measure-user'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setDateInput(date) {
    await this.dateInput.sendKeys(date);
  }

  async getDateInput() {
    return this.dateInput.getAttribute('value');
  }

  async setTemperatureAt8Input(temperatureAt8) {
    await this.temperatureAt8Input.sendKeys(temperatureAt8);
  }

  async getTemperatureAt8Input() {
    return this.temperatureAt8Input.getAttribute('value');
  }

  async setTemperatureAt20Input(temperatureAt20) {
    await this.temperatureAt20Input.sendKeys(temperatureAt20);
  }

  async getTemperatureAt20Input() {
    return this.temperatureAt20Input.getAttribute('value');
  }

  getCoughtInput() {
    return this.coughtInput;
  }
  getTroubleToBreatheInput() {
    return this.troubleToBreatheInput;
  }
  getSputumInput() {
    return this.sputumInput;
  }
  getSoreThroatInput() {
    return this.soreThroatInput;
  }
  getOstTasteInput() {
    return this.ostTasteInput;
  }
  getFlutterInput() {
    return this.flutterInput;
  }
  getDiarrheaInput() {
    return this.diarrheaInput;
  }
  getHeadacheInput() {
    return this.headacheInput;
  }
  getMusclePainInput() {
    return this.musclePainInput;
  }
  async setNotesInput(notes) {
    await this.notesInput.sendKeys(notes);
  }

  async getNotesInput() {
    return this.notesInput.getAttribute('value');
  }

  async userSelectLastOption() {
    await this.userSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async userSelectOption(option) {
    await this.userSelect.sendKeys(option);
  }

  getUserSelect() {
    return this.userSelect;
  }

  async getUserSelectedOption() {
    return this.userSelect.element(by.css('option:checked')).getText();
  }

  async save() {
    await this.saveButton.click();
  }

  async cancel() {
    await this.cancelButton.click();
  }

  getSaveButton() {
    return this.saveButton;
  }
}
