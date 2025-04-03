export interface Comment {
  id: string;
  postId: string;
  opUsername: string;
  opVerified: boolean;
  username: string;
  verified: boolean;
  content: string;
  created: string;
  favorites: number;
  favorited: boolean;
}
