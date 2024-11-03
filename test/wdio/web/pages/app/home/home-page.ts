import { timeouts } from '../../../../configs/timeouts-conf';
import { Urls } from '../../../../configs/urls-config';
import { PageAbstract } from '../../page-abstract';
import { NotesSectionComponent } from './notes-section-component/notes-section-component';

class HomePage extends PageAbstract {
  public get notesSection(): NotesSectionComponent {
    return new NotesSectionComponent();
  }

  constructor() {
    super('#filterSearch', {
      url: Urls.home,
      waitForTimeout: timeouts.largest,
    });
  }
}

export const homePage = new HomePage();
