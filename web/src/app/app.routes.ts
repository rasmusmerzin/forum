import { Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { NewComponent } from "./new/new.component";
import { MeComponent } from "./me/me.component";
import { EditComponent } from "./me/edit/edit.component";
import { PostComponent } from "./post/post.component";
import { PostCommentComponent } from "./post/post-comment/post-comment.component";
import { UserComponent } from "./user/user.component";
import { BlankComponent } from "./blank/blank.component";
import { VerifyComponent as MeVerifyComponent } from "./me/verify/verify.component";
import { VerifyComponent } from "./verify/verify.component";

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
    path: "me/verify",
    component: MeVerifyComponent,
  },
  {
    path: "verify/:id",
    component: VerifyComponent,
  },
  {
    path: "post/:id",
    component: PostComponent,
  },
  {
    path: "post/:id/comment",
    component: PostCommentComponent,
  },
  {
    path: "user/:username",
    component: UserComponent,
  },
  {
    path: "blank",
    component: BlankComponent,
  },
];
