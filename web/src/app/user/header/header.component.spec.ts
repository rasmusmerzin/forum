import { ComponentFixture, TestBed } from "@angular/core/testing";

import { HeaderComponent } from "./header.component";
import { mockClass, Mocked } from "../../mock";
import { ThemeService } from "../../theme/theme.service";

describe("HeaderComponent", () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let themeService: Mocked<ThemeService>;

  beforeEach(async () => {
    themeService = mockClass(ThemeService);

    await TestBed.configureTestingModule({
      imports: [HeaderComponent],
      providers: [{ provide: ThemeService, useValue: themeService }],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
