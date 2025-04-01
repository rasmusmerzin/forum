import { ComponentFixture, TestBed } from "@angular/core/testing";

import { HeaderComponent } from "./header.component";
import { ThemeService } from "../../theme/theme.service";
import { mockClass, Mocked } from "../../mock";
import { ActivatedRoute } from "@angular/router";

describe("HeaderComponent", () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let themeService: Mocked<ThemeService>;
  let activatedRoute: Mocked<ActivatedRoute>;

  beforeEach(async () => {
    themeService = mockClass(ThemeService);
    activatedRoute = mockClass(ActivatedRoute);

    await TestBed.configureTestingModule({
      imports: [HeaderComponent],
      providers: [
        { provide: ThemeService, useValue: themeService },
        { provide: ActivatedRoute, useValue: activatedRoute },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
