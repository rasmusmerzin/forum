import { ComponentFixture, TestBed } from "@angular/core/testing";

import { UserComponent } from "./user.component";
import { mockClass, Mocked } from "../mock";
import { ActivatedRoute } from "@angular/router";
import { ThemeService } from "../theme/theme.service";

describe("UserComponent", () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;
  let activatedRoute: Mocked<ActivatedRoute>;
  let themeService: Mocked<ThemeService>;

  beforeEach(async () => {
    activatedRoute = mockClass(ActivatedRoute);
    activatedRoute.snapshot = { params: { username: "username" } } as any;
    themeService = mockClass(ThemeService);

    await TestBed.configureTestingModule({
      imports: [UserComponent],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRoute },
        { provide: ThemeService, useValue: themeService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
