import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DictionaryService {

  constructor(private httpClient: HttpClient) {
  }

  public addWord(data: {rus: string, eng: string, description: string}): Observable<any> {
    return this.httpClient.post("http://localhost:10051/api/dictionary/add-word", data);
  }

}
