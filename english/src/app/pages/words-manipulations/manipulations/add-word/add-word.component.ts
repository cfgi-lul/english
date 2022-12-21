import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {DictionaryService} from "../../services/dictionary.service";

@Component({
  selector: 'app-add-word',
  templateUrl: './add-word.component.html',
  styleUrls: ['./add-word.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddWordComponent implements OnInit {

  constructor(private dictionaryService: DictionaryService) {
  }

  async ngOnInit(): Promise<void> {
    this.dictionaryService.addWord({rus: "Привет", eng: "hello", description: "Приветствие"}).subscribe();
  }

}
