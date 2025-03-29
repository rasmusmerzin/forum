import { ComponentFixture, TestBed } from "@angular/core/testing";

import { CommentBarComponent } from "./comment-bar.component";

describe("CommentBarComponent", () => {
  let component: CommentBarComponent;
  let fixture: ComponentFixture<CommentBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommentBarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CommentBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
