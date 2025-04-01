import { ComponentFixture, TestBed } from "@angular/core/testing";

import { PostCommentComponent } from "./post-comment.component";
import { mockClass, Mocked } from "../../mock";
import { ActivatedRoute } from "@angular/router";

describe("PostCommentComponent", () => {
  let component: PostCommentComponent;
  let fixture: ComponentFixture<PostCommentComponent>;
  let activatedRoute: Mocked<ActivatedRoute>;

  beforeEach(async () => {
    activatedRoute = mockClass(ActivatedRoute);

    await TestBed.configureTestingModule({
      imports: [PostCommentComponent],
      providers: [{ provide: ActivatedRoute, useValue: activatedRoute }],
    }).compileComponents();

    fixture = TestBed.createComponent(PostCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
