import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {DictionaryService} from "../../services/dictionary.service";
import {tap} from "rxjs/operators";

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
  }


  async a() {
    try {
      this.dictionaryService.addWord({
        rus: "Привет",
        eng: "hello",
        description: "Приветствие"
      }).pipe(tap(e => console.log(e))).subscribe((e) => console.log("e", e));
    } catch (e) {

    }
  }
}
