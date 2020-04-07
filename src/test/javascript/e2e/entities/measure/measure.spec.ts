import { browser, element, by, protractor } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import MeasureComponentsPage, { MeasureDeleteDialog } from './measure.page-object';
import MeasureUpdatePage from './measure-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('Measure e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let measureComponentsPage: MeasureComponentsPage;
  let measureUpdatePage: MeasureUpdatePage;
  let measureDeleteDialog: MeasureDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.waitUntilDisplayed();

    await signInPage.username.sendKeys('admin');
    await signInPage.password.sendKeys('admin');
    await signInPage.loginButton.click();
    await signInPage.waitUntilHidden();
    await waitUntilDisplayed(navBarPage.entityMenu);
  });

  it('should load Measures', async () => {
    await navBarPage.getEntityPage('measure');
    measureComponentsPage = new MeasureComponentsPage();
    expect(await measureComponentsPage.getTitle().getText()).to.match(/Measures/);
  });

  it('should load create Measure page', async () => {
    await measureComponentsPage.clickOnCreateButton();
    measureUpdatePage = new MeasureUpdatePage();
    expect(await measureUpdatePage.getPageTitle().getAttribute('id')).to.match(/hotelcovid19App.measure.home.createOrEditLabel/);
    await measureUpdatePage.cancel();
  });

  it('should create and save Measures', async () => {
    async function createMeasure() {
      await measureComponentsPage.clickOnCreateButton();
      await measureUpdatePage.setDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
      expect(await measureUpdatePage.getDateInput()).to.contain('2001-01-01T02:30');
      await measureUpdatePage.setTemperatureAt8Input('5');
      expect(await measureUpdatePage.getTemperatureAt8Input()).to.eq('5');
      await measureUpdatePage.setTemperatureAt20Input('5');
      expect(await measureUpdatePage.getTemperatureAt20Input()).to.eq('5');
      const selectedCought = await measureUpdatePage.getCoughtInput().isSelected();
      if (selectedCought) {
        await measureUpdatePage.getCoughtInput().click();
        expect(await measureUpdatePage.getCoughtInput().isSelected()).to.be.false;
      } else {
        await measureUpdatePage.getCoughtInput().click();
        expect(await measureUpdatePage.getCoughtInput().isSelected()).to.be.true;
      }
      const selectedTroubleToBreathe = await measureUpdatePage.getTroubleToBreatheInput().isSelected();
      if (selectedTroubleToBreathe) {
        await measureUpdatePage.getTroubleToBreatheInput().click();
        expect(await measureUpdatePage.getTroubleToBreatheInput().isSelected()).to.be.false;
      } else {
        await measureUpdatePage.getTroubleToBreatheInput().click();
        expect(await measureUpdatePage.getTroubleToBreatheInput().isSelected()).to.be.true;
      }
      const selectedSputum = await measureUpdatePage.getSputumInput().isSelected();
      if (selectedSputum) {
        await measureUpdatePage.getSputumInput().click();
        expect(await measureUpdatePage.getSputumInput().isSelected()).to.be.false;
      } else {
        await measureUpdatePage.getSputumInput().click();
        expect(await measureUpdatePage.getSputumInput().isSelected()).to.be.true;
      }
      const selectedSoreThroat = await measureUpdatePage.getSoreThroatInput().isSelected();
      if (selectedSoreThroat) {
        await measureUpdatePage.getSoreThroatInput().click();
        expect(await measureUpdatePage.getSoreThroatInput().isSelected()).to.be.false;
      } else {
        await measureUpdatePage.getSoreThroatInput().click();
        expect(await measureUpdatePage.getSoreThroatInput().isSelected()).to.be.true;
      }
      const selectedOstTaste = await measureUpdatePage.getOstTasteInput().isSelected();
      if (selectedOstTaste) {
        await measureUpdatePage.getOstTasteInput().click();
        expect(await measureUpdatePage.getOstTasteInput().isSelected()).to.be.false;
      } else {
        await measureUpdatePage.getOstTasteInput().click();
        expect(await measureUpdatePage.getOstTasteInput().isSelected()).to.be.true;
      }
      const selectedFlutter = await measureUpdatePage.getFlutterInput().isSelected();
      if (selectedFlutter) {
        await measureUpdatePage.getFlutterInput().click();
        expect(await measureUpdatePage.getFlutterInput().isSelected()).to.be.false;
      } else {
        await measureUpdatePage.getFlutterInput().click();
        expect(await measureUpdatePage.getFlutterInput().isSelected()).to.be.true;
      }
      const selectedDiarrhea = await measureUpdatePage.getDiarrheaInput().isSelected();
      if (selectedDiarrhea) {
        await measureUpdatePage.getDiarrheaInput().click();
        expect(await measureUpdatePage.getDiarrheaInput().isSelected()).to.be.false;
      } else {
        await measureUpdatePage.getDiarrheaInput().click();
        expect(await measureUpdatePage.getDiarrheaInput().isSelected()).to.be.true;
      }
      const selectedHeadache = await measureUpdatePage.getHeadacheInput().isSelected();
      if (selectedHeadache) {
        await measureUpdatePage.getHeadacheInput().click();
        expect(await measureUpdatePage.getHeadacheInput().isSelected()).to.be.false;
      } else {
        await measureUpdatePage.getHeadacheInput().click();
        expect(await measureUpdatePage.getHeadacheInput().isSelected()).to.be.true;
      }
      const selectedMusclePain = await measureUpdatePage.getMusclePainInput().isSelected();
      if (selectedMusclePain) {
        await measureUpdatePage.getMusclePainInput().click();
        expect(await measureUpdatePage.getMusclePainInput().isSelected()).to.be.false;
      } else {
        await measureUpdatePage.getMusclePainInput().click();
        expect(await measureUpdatePage.getMusclePainInput().isSelected()).to.be.true;
      }
      await measureUpdatePage.setNotesInput('notes');
      expect(await measureUpdatePage.getNotesInput()).to.match(/notes/);
      await measureUpdatePage.userSelectLastOption();
      await waitUntilDisplayed(measureUpdatePage.getSaveButton());
      await measureUpdatePage.save();
      await waitUntilHidden(measureUpdatePage.getSaveButton());
      expect(await measureUpdatePage.getSaveButton().isPresent()).to.be.false;
    }

    await createMeasure();
    await measureComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeCreate = await measureComponentsPage.countDeleteButtons();
    await createMeasure();

    await measureComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await measureComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last Measure', async () => {
    await measureComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await measureComponentsPage.countDeleteButtons();
    await measureComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    measureDeleteDialog = new MeasureDeleteDialog();
    expect(await measureDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/hotelcovid19App.measure.delete.question/);
    await measureDeleteDialog.clickOnConfirmButton();

    await measureComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await measureComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
