import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import RoomComponentsPage, { RoomDeleteDialog } from './room.page-object';
import RoomUpdatePage from './room-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('Room e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let roomComponentsPage: RoomComponentsPage;
  let roomUpdatePage: RoomUpdatePage;
  let roomDeleteDialog: RoomDeleteDialog;

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

  it('should load Rooms', async () => {
    await navBarPage.getEntityPage('room');
    roomComponentsPage = new RoomComponentsPage();
    expect(await roomComponentsPage.getTitle().getText()).to.match(/Rooms/);
  });

  it('should load create Room page', async () => {
    await roomComponentsPage.clickOnCreateButton();
    roomUpdatePage = new RoomUpdatePage();
    expect(await roomUpdatePage.getPageTitle().getAttribute('id')).to.match(/hotelcovid19App.room.home.createOrEditLabel/);
    await roomUpdatePage.cancel();
  });

  it('should create and save Rooms', async () => {
    async function createRoom() {
      await roomComponentsPage.clickOnCreateButton();
      await roomUpdatePage.setNameInput('name');
      expect(await roomUpdatePage.getNameInput()).to.match(/name/);
      await roomUpdatePage.userSelectLastOption();
      await waitUntilDisplayed(roomUpdatePage.getSaveButton());
      await roomUpdatePage.save();
      await waitUntilHidden(roomUpdatePage.getSaveButton());
      expect(await roomUpdatePage.getSaveButton().isPresent()).to.be.false;
    }

    await createRoom();
    await roomComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeCreate = await roomComponentsPage.countDeleteButtons();
    await createRoom();

    await roomComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await roomComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last Room', async () => {
    await roomComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await roomComponentsPage.countDeleteButtons();
    await roomComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    roomDeleteDialog = new RoomDeleteDialog();
    expect(await roomDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/hotelcovid19App.room.delete.question/);
    await roomDeleteDialog.clickOnConfirmButton();

    await roomComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await roomComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
