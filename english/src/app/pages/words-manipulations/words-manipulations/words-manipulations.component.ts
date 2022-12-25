import {ChangeDetectionStrategy, Component} from '@angular/core';

export interface PeriodicElement {
  russianValue: string;
  englishValue: string;
  description: string;
}

@Component({
  selector: 'app-words-manipulations',
  templateUrl: './words-manipulations.component.html',
  styleUrls: ['./words-manipulations.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WordsManipulationsComponent {

}
