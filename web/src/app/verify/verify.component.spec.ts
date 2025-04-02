import { ComponentFixture, TestBed } from "@angular/core/testing";

import { VerifyComponent } from "./verify.component";
import { mockClass, Mocked } from "../mock";
import { ActivatedRoute } from "@angular/router";

describe("VerifyComponent", () => {
  let component: VerifyComponent;
  let fixture: ComponentFixture<VerifyComponent>;
  let activatedRoute: Mocked<ActivatedRoute>;

  beforeEach(async () => {
    activatedRoute = mockClass(ActivatedRoute);
    activatedRoute.snapshot = { params: { id: "123" } } as any;

    await TestBed.configureTestingModule({
      imports: [VerifyComponent],
      providers: [{ provide: ActivatedRoute, useValue: activatedRoute }],
    }).compileComponents();

    fixture = TestBed.createComponent(VerifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
