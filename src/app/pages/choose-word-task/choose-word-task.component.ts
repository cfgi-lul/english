import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {ThemePalette} from "@angular/material/core/common-behaviors/color";
import {BehaviorSubject, combineLatest, Observable, Subject} from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";
import {DictionaryInteractionService} from "../../services/dictionary-interaction.service";
import {map} from "rxjs/operators";
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
  randomWordsIndexes: Observable<number[]>;
  getRandomNumbersInRange = Utils.getRandomNumbersInRange;
  rightWordIndex: number = -1;
  private componentDestroyed$ = new Subject();

  constructor(private _snackBar: MatSnackBar,
              private dictionaryInteraction: DictionaryInteractionService) {
    this.dictionaryInteraction.actualizeDictionary().catch(Utils.doNothing);

    this.randomWordsIndexes = this.dictionaryInteraction.dictionaryLength$
      .pipe(map(dictionaryLength => this.getRandomNumbersInRange(0, dictionaryLength, 3)));

    this.words$ = this.getWordsByIndexes(this.randomWordsIndexes);
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
    } else {
      this.currentWordState$.next('warn');
      this._snackBar.open('You are FOOL(((')._dismissAfter(1000);
    }
  }

  getWordsByIndexes(indexes: Observable<number[]>): Observable<Word[]> {
    return combineLatest([indexes, this.dictionary$])
      .pipe(
        map(([indexes, dictionary]) => {
          this.rightWordIndex = this.getRandomNumbersInRange(0, 2, 1)[0];
          return indexes.reduce((acc: Word[], cur: number) => [...acc, dictionary[cur]], []);
        }));
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next();
    this.componentDestroyed$.complete();
  }
}
