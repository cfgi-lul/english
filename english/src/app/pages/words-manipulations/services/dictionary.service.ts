import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DictionaryService {

  constructor(private httpClient: HttpClient) {
  }

  public addWord(data: { rus: string, eng: string, description: string }): Observable<any> {
    return this.httpClient.post<any>("http://localhost:10051/api/dictionary/add-word", data,);
  }


  public deleteWord(data: number): Observable<any> {
    return this.httpClient.delete<any>("http://localhost:10051/api/dictionary/delete-word", {body: data});
  }

}

