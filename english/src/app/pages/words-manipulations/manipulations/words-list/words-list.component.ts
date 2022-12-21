import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'app-words-list',
  templateUrl: './words-list.component.html',
  styleUrls: ['./words-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WordsListComponent {

}
