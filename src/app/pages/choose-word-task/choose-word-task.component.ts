import {Component, OnInit} from '@angular/core';
import {ThemePalette} from "@angular/material/core/common-behaviors/color";
import {BehaviorSubject, Observable} from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";
import {DictionaryInteractionService} from "../../services/dictionary-interaction.service";

@Component({
  selector: 'app-choose-word-task',
  templateUrl: './choose-word-task.component.html',
  styleUrls: ['./choose-word-task.component.scss']
})
export class ChooseWordTaskComponent implements OnInit {

  dictionary$: Observable<Word[]> = this.dictionaryInteraction.dictionary$;
  currentWordState$: BehaviorSubject<'warn' | 'approved' | 'unset'> = new BehaviorSubject<'warn' | 'approved' | 'unset'>('unset');

  wordTranslations: WordTranslation[] = [
    {translation: 'пока', isRight: false},
    {translation: 'досвидания', isRight: false},
    {translation: 'привет', isRight: true}
  ];

  constructor(private _snackBar: MatSnackBar, private dictionaryInteraction: DictionaryInteractionService) {
  }

  ngOnInit(): void {
    this.dictionaryInteraction.actualizeDictionary();
  }

  randomColorizeButton(): ThemePalette {
    const randomNumber: number = Math.random() * 3;
    if (randomNumber <= 1) {
      return 'primary';
    } else if (randomNumber <= 2) {
      return 'accent';
    } else {
      return 'warn';
    }
  }

  chooseWord(word: WordTranslation): void {
    if (word.isRight) {
      this.currentWordState$.next('approved');
      this._snackBar.open('You are right!!')._dismissAfter(1000);
    } else {
      this.currentWordState$.next('warn');
      this._snackBar.open('You are FOOL(((')._dismissAfter(1000);
    }
  }
}
