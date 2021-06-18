import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MemorySubject} from "../shared-classes/MemorySubject";
import * as dictionaryFromFakeServer from "./../../../dictionary.json";
import {map, takeUntil} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class DictionaryInteractionService {
  private _dictionaryActualizing$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private _snackBar: MatSnackBar) {
  }

  private _dictionary$: MemorySubject<Word[]> = new MemorySubject<Word[]>();

  get dictionary$(): MemorySubject<Word[]> {
    return this._dictionary$;
  }

  get dictionaryLength$(): Observable<number> {
    return this._dictionary$.pipe(map(dict=>dict.length));
  }

  async actualizeDictionary(): Promise<boolean> {
    try {
      this._dictionaryActualizing$.next(true);
      // @ts-ignore
      this._dictionary$.next(dictionaryFromFakeServer);
      this._dictionaryActualizing$.next(false);
      return true;
    } catch (err) {
      this._dictionaryActualizing$.next(false);
      this._snackBar.open(err)._dismissAfter(1000);
      return false;
    }
  }
}
