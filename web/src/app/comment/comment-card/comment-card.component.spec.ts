import { ComponentFixture, TestBed } from "@angular/core/testing";

import { CommentCardComponent } from "./comment-card.component";
import { mockClass, Mocked } from "../../mock";
import { ActivatedRoute } from "@angular/router";

describe("CommentCardComponent", () => {
  let component: CommentCardComponent;
  let fixture: ComponentFixture<CommentCardComponent>;
  let activatedRoute: Mocked<ActivatedRoute>;

  beforeEach(async () => {
    activatedRoute = mockClass(ActivatedRoute);

    await TestBed.configureTestingModule({
      imports: [CommentCardComponent],
      providers: [{ provide: ActivatedRoute, useValue: activatedRoute }],
    }).compileComponents();

    fixture = TestBed.createComponent(CommentCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
