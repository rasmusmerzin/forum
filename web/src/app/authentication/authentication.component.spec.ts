import { ComponentFixture, TestBed } from "@angular/core/testing";

import { AuthenticationComponent } from "./authentication.component";
import { mockClass, Mocked } from "../mock";
import { ThemeService } from "../theme/theme.service";

describe("AuthenticationComponent", () => {
  let component: AuthenticationComponent;
  let fixture: ComponentFixture<AuthenticationComponent>;
  let themeService: Mocked<ThemeService>;

  beforeEach(async () => {
    themeService = mockClass(ThemeService);

    await TestBed.configureTestingModule({
      imports: [AuthenticationComponent],
      providers: [{ provide: ThemeService, useValue: themeService }],
    }).compileComponents();

    fixture = TestBed.createComponent(AuthenticationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
