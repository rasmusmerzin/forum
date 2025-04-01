import { ComponentFixture, TestBed } from "@angular/core/testing";

import { CommentBarComponent } from "./comment-bar.component";
import { mockClass, Mocked } from "../../mock";
import { ActivatedRoute } from "@angular/router";

describe("CommentBarComponent", () => {
  let component: CommentBarComponent;
  let fixture: ComponentFixture<CommentBarComponent>;
  let activatedRoute: Mocked<ActivatedRoute>;

  beforeEach(async () => {
    activatedRoute = mockClass(ActivatedRoute);

    await TestBed.configureTestingModule({
      imports: [CommentBarComponent],
      providers: [{ provide: ActivatedRoute, useValue: activatedRoute }],
    }).compileComponents();

    fixture = TestBed.createComponent(CommentBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
