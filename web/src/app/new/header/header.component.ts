import {
  Component,
  EventEmitter,
  inject,
  OnDestroy,
  OnInit,
  Output,
} from "@angular/core";
import { ThemeService } from "../../theme/theme.service";

@Component({
  selector: "app-new-header",
  imports: [],
  templateUrl: "./header.component.html",
  styleUrl: "./header.component.scss",
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output()
  postClickEvent = new EventEmitter();

  themeService = inject(ThemeService);
  themeSymbol?: symbol;

  ngOnInit() {
    this.themeSymbol = this.themeService.registerBarColor("#ffffff");
  }

  ngOnDestroy() {
    this.themeService.unregisterBarColor(this.themeSymbol!);
  }

  onBackClick() {
    history.back();
  }

  onPostClick() {
    this.postClickEvent.emit();
  }
}
