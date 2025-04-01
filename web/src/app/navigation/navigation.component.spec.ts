import { ComponentFixture, TestBed } from "@angular/core/testing";

import { NavigationComponent } from "./navigation.component";
import { mockClass, Mocked } from "../mock";
import { ThemeService } from "../theme/theme.service";
import { ActivatedRoute } from "@angular/router";

describe("NavigationComponent", () => {
  let component: NavigationComponent;
  let fixture: ComponentFixture<NavigationComponent>;
  let themeService: Mocked<ThemeService>;
  let activatedRoute: Mocked<ActivatedRoute>;

  beforeEach(async () => {
    themeService = mockClass(ThemeService);
    activatedRoute = mockClass(ActivatedRoute);

    await TestBed.configureTestingModule({
      imports: [NavigationComponent],
      providers: [
        { provide: ThemeService, useValue: themeService },
        { provide: ActivatedRoute, useValue: activatedRoute },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
