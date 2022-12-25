import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {DictionaryService} from "../../services/dictionary.service";
import {PeriodicElement} from "../../words-manipulations/words-manipulations.component";

@Component({
  selector: 'app-words-list',
  templateUrl: './words-list.component.html',
  styleUrls: ['./words-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WordsListComponent implements OnInit {
  loading$ = new BehaviorSubject(false);
  columns = [
    {
      columnDef: 'russianValue',
      header: 'russianValue',
      cell: (element: PeriodicElement) => `${element.russianValue}`,
    },
    {
      columnDef: 'englishValue',
      header: 'englishValue',
      cell: (element: PeriodicElement) => `${element.englishValue}`,
    },
    {
      columnDef: 'description',
      header: 'description',
      cell: (element: PeriodicElement) => `${element.description}`,
    }
  ];
  dataSource: PeriodicElement[] = [];
  displayedColumns = this.columns.map(c => c.columnDef);

  constructor(private dictionaryService: DictionaryService) {
  }

  async ngOnInit(): Promise<void> {
    try {
      this.loading$.next(true);
      this.dataSource = await this.dictionaryService.getWords().toPromise();
    } catch (e) {
      console.error(e);
    } finally {
      this.loading$.next(false);
    }

  }
}
