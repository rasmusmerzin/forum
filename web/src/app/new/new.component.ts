import { Component } from "@angular/core";
import { HeaderComponent } from "./header/header.component";

@Component({
  selector: "app-new",
  imports: [HeaderComponent],
  templateUrl: "./new.component.html",
  styleUrl: "./new.component.scss",
})
export class NewComponent {}
