import { browser } from 'protractor';
import { Helper } from '../helper';
import { DashboardPage } from '../page-objects/dashboard.po';

xdescribe('Dashboard Page', () => {
  let helper: Helper;
  let dashboardPage: DashboardPage;

  beforeAll(() => {
    dashboardPage = new DashboardPage();
    helper = new Helper();
    helper.navigateTo(dashboardPage.path);
  });

  it('should instantiate null state on load', () => {
    helper.expectUrlToContain(dashboardPage.path);
    helper.expectElementToBePresent(dashboardPage.noGameTypeText);
    helper.expectElementToBePresent(dashboardPage.noOldOrNewText);
    helper.expectElementToBePresent(dashboardPage.noBibleBookText);
  });

  it('should display game type choice', () => {
    helper.clickElement(dashboardPage.chapterOnlySelectButton);
    helper.expectElementNotToBePresent(dashboardPage.noGameTypeText);
    helper.expectElementToBePresent(dashboardPage.gameTypeSelection);
    dashboardPage.gameTypeSelection.getText().then(text => {
      expect(text).toBe('Chapter Only');
    });
  });

  it('should display old or new testament choice', () => {
    helper.clickElement(dashboardPage.oldTestamentSelectButton);
    helper.expectElementNotToBePresent(dashboardPage.noOldOrNewText);
    helper.expectElementToBePresent(dashboardPage.oldOrNewSelection);
    dashboardPage.oldOrNewSelection.getText().then(text => {
      expect(text).toBe('Old Testament');
    });
  });

  it('should display bible book choice', () => {
    helper.clickElement(dashboardPage.genesisSelectButton);
    helper.expectElementNotToBePresent(dashboardPage.noBibleBookText);
    helper.expectElementToBePresent(dashboardPage.bibleBookSelection);
    dashboardPage.bibleBookSelection.getText().then(text => {
      expect(text).toBe('Genesis');
    });
    helper.expectElementToBePresent(dashboardPage.playNowButton);
  });
});
