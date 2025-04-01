import { ComponentFixture, TestBed } from "@angular/core/testing";

import { PostsComponent } from "./posts.component";
import { mockClass, Mocked } from "../../mock";
import { ActivatedRoute } from "@angular/router";

describe("PostsComponent", () => {
  let component: PostsComponent;
  let fixture: ComponentFixture<PostsComponent>;
  let activatedRoute: Mocked<ActivatedRoute>;

  beforeEach(async () => {
    activatedRoute = mockClass(ActivatedRoute);
    activatedRoute.snapshot = { params: { username: "username" } } as any;

    await TestBed.configureTestingModule({
      imports: [PostsComponent],
      providers: [{ provide: ActivatedRoute, useValue: activatedRoute }],
    }).compileComponents();

    fixture = TestBed.createComponent(PostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
