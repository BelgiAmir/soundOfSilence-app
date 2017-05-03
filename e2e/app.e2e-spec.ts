import { SoundOfSilenceAppPage } from './app.po';

describe('sound-of-silence-app App', () => {
  let page: SoundOfSilenceAppPage;

  beforeEach(() => {
    page = new SoundOfSilenceAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
