import { ComponentFixture, TestBed } from "@angular/core/testing";

import { HomeComponent } from "./home.component";
import { NavigationComponent } from "../navigation/navigation.component";
import { HeaderComponent } from "./header/header.component";
import { LatestPostsComponent } from "./latest-posts/latest-posts.component";
import { mockClass, Mocked } from "../mock";
import { ThemeService } from "../theme/theme.service";
import { ActivatedRoute } from "@angular/router";

describe("HomeComponent", () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let themeService: Mocked<ThemeService>;
  let activatedRoute: Mocked<ActivatedRoute>;

  beforeEach(async () => {
    themeService = mockClass(ThemeService);
    activatedRoute = mockClass(ActivatedRoute);

    await TestBed.configureTestingModule({
      imports: [
        HomeComponent,
        NavigationComponent,
        HeaderComponent,
        LatestPostsComponent,
      ],
      providers: [
        { provide: ThemeService, useValue: themeService },
        { provide: ActivatedRoute, useValue: activatedRoute },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
