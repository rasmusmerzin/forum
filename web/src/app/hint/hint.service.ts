import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

export interface Hint {
  message: string;
  duration: number;
}

@Injectable({
  providedIn: "root",
})
export class HintService {
  hint = new Subject<Hint>();

  showHint(message: string, duration: number) {
    this.hint.next({ message, duration });
  }
}
