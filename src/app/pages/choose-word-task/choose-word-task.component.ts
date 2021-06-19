import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {ThemePalette} from "@angular/material/core/common-behaviors/color";
import {BehaviorSubject, combineLatest, Observable, of, Subject} from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";
import {DictionaryInteractionService} from "../../services/dictionary-interaction.service";
import {map, takeUntil} from "rxjs/operators";
import {Utils} from "../../shared-classes/Utils";

@Component({
  selector: 'app-choose-word-task',
  templateUrl: './choose-word-task.component.html',
  styleUrls: ['./choose-word-task.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChooseWordTaskComponent implements OnInit, OnDestroy {
  dictionary$: Observable<Word[]> = this.dictionaryInteraction.dictionary$;
  currentWordState$: BehaviorSubject<'warn' | 'approved' | 'unset'> = new BehaviorSubject<'warn' | 'approved' | 'unset'>('unset');
  words$: Observable<Word[]>;
  rightWordIndex: number = -1;
  difficultyLevel: number = 3;
  levels = [
    {numberOfWord: 3, levelName: 'easy'},
    {numberOfWord: 5, levelName: 'medium'},
    {numberOfWord: 7, levelName: 'hard'}
  ];
  private componentDestroyed$ = new Subject();

  constructor(private _snackBar: MatSnackBar,
              private dictionaryInteraction: DictionaryInteractionService) {
    this.dictionaryInteraction.actualizeDictionary().catch(Utils.doNothing);
    this.words$ = this.getRandomWords();
  }

  ngOnInit(): void {
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

  chooseWord(untranslatedWord: Word, translation: Word): void {
    if (translation.eng === untranslatedWord.eng) {
      this.currentWordState$.next('approved');
      this._snackBar.open('You are right!!')._dismissAfter(1000);
      setTimeout(() => {
        this.nextWordToTranslate();
        this.currentWordState$.next('unset');
      }, 1500)
    } else {
      this.currentWordState$.next('warn');
      this._snackBar.open('You are FOOL(((')._dismissAfter(1000);
    }
  }

  getRandomWords(): Observable<Word[]> {
    let randomWordsIndexes = this.dictionaryInteraction.dictionaryLength$
      .pipe(map(dictionaryLength => Utils.getRandomNumbersInRange(0, dictionaryLength, this.difficultyLevel)));

    return combineLatest([randomWordsIndexes, this.dictionary$])
      .pipe(
        map(([indexes, dictionary]) => {
          this.rightWordIndex = Utils.getRandomNumbersInRange(0, this.difficultyLevel - 1, 1)[0];
          return indexes.reduce((acc: Word[], cur: number) => [...acc, dictionary[cur]], []);
        }));
  }

  nextWordToTranslate() {
    this.words$ = this.getRandomWords();
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next();
    this.componentDestroyed$.complete();
  }
}
