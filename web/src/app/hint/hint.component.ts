import {
  Component,
  HostBinding,
  inject,
  OnDestroy,
  OnInit,
} from "@angular/core";
import { Hint, HintService } from "./hint.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-hint",
  imports: [],
  templateUrl: "./hint.component.html",
  styleUrl: "./hint.component.scss",
})
export class HintComponent implements OnInit, OnDestroy {
  hintService = inject(HintService);
  hint = "";
  @HostBinding("class.removed")
  removed = false;
  queue: Hint[] = [];
  subscription = new Subscription();

  ngOnInit() {
    this.subscription.add(
      this.hintService.hint.subscribe(this.onHint.bind(this)),
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onHint(hint: Hint) {
    if (this.hint) this.queue.push(hint);
    else this.showHint(hint);
  }

  showHint(hint: Hint) {
    this.hint = hint.message;
    setTimeout(() => {
      this.removed = true;
    }, hint.duration - 1000);
    setTimeout(() => {
      this.hint = "";
      this.removed = false;
      const nextHint = this.queue.shift();
      if (nextHint) this.showHint(nextHint);
    }, hint.duration);
  }
}
