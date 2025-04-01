import { ComponentFixture, TestBed } from "@angular/core/testing";

import { PostComponent } from "./post.component";
import { mockClass, Mocked } from "../mock";
import { ActivatedRoute } from "@angular/router";

describe("PostComponent", () => {
  let component: PostComponent;
  let fixture: ComponentFixture<PostComponent>;
  let activatedRoute: Mocked<ActivatedRoute>;

  beforeEach(async () => {
    activatedRoute = mockClass(ActivatedRoute);

    await TestBed.configureTestingModule({
      imports: [PostComponent],
      providers: [{ provide: ActivatedRoute, useValue: activatedRoute }],
    }).compileComponents();

    fixture = TestBed.createComponent(PostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
