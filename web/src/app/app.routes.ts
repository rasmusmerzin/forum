import { Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { NewComponent } from "./new/new.component";
import { MeComponent } from "./me/me.component";
import { EditComponent } from "./me/edit/edit.component";
import { PostComponent } from "./post/post.component";
import { PostCommentComponent } from "./post/post-comment/post-comment.component";

export const routes: Routes = [
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full",
  },
  {
    path: "home",
    component: HomeComponent,
  },
  {
    path: "new",
    component: NewComponent,
  },
  {
    path: "me",
    component: MeComponent,
  },
  {
    path: "me/edit",
    component: EditComponent,
  },
  {
    path: "post/:id",
    component: PostComponent,
  },
  {
    path: "post/:id/comment",
    component: PostCommentComponent,
  },
];
