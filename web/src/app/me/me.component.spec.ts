import { ComponentFixture, TestBed } from "@angular/core/testing";

import { MeComponent } from "./me.component";
import { mockClass, Mocked, mockFn } from "../mock";
import { AuthenticationService } from "../authentication/authentication.service";
import { NavigationComponent } from "../navigation/navigation.component";
import { HeaderComponent } from "./header/header.component";
import { PostsComponent } from "./posts/posts.component";
import { ThemeService } from "../theme/theme.service";
import { ActivatedRoute } from "@angular/router";

describe("MeComponent", () => {
  let component: MeComponent;
  let fixture: ComponentFixture<MeComponent>;
  let authenticationService: Mocked<AuthenticationService>;
  let themeService: Mocked<ThemeService>;
  let activatedRoute: Mocked<ActivatedRoute>;

  beforeEach(async () => {
    authenticationService = mockClass(AuthenticationService);
    authenticationService.getUsername = mockFn(() => "username");
    themeService = mockClass(ThemeService);
    activatedRoute = mockClass(ActivatedRoute);

    await TestBed.configureTestingModule({
      imports: [
        MeComponent,
        NavigationComponent,
        HeaderComponent,
        PostsComponent,
      ],
      providers: [
        { provide: AuthenticationService, useValue: authenticationService },
        { provide: ThemeService, useValue: themeService },
        { provide: ActivatedRoute, useValue: activatedRoute },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
