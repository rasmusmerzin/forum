import { ComponentFixture, TestBed } from "@angular/core/testing";

import { HeaderCardComponent } from "./header-card.component";
import { mockClass, Mocked } from "../../mock";
import { ActivatedRoute } from "@angular/router";

describe("HeaderCardComponent", () => {
  let component: HeaderCardComponent;
  let fixture: ComponentFixture<HeaderCardComponent>;
  let activatedRoute: Mocked<ActivatedRoute>;

  beforeEach(async () => {
    activatedRoute = mockClass(ActivatedRoute);
    activatedRoute.snapshot = { params: { username: "username" } } as any;

    await TestBed.configureTestingModule({
      imports: [HeaderCardComponent],
      providers: [{ provide: ActivatedRoute, useValue: activatedRoute }],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
