import { ComponentFixture, TestBed } from "@angular/core/testing";

import { HeaderComponent } from "./header.component";
import { ThemeService } from "../../theme/theme.service";
import { mockClass, Mocked } from "../../mock";

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
    expect(themeService.getPrimaryColor.hasBeenCalledOnce()).toBeTrue();
    expect(themeService.registerBarColor.lastCalledWith()![0]).toBe(
      themeService.getPrimaryColor.output[0].value!,
    );
  });
});
