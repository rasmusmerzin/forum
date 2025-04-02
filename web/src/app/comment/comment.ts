export interface Comment {
  id: string;
  postId: string;
  username: string;
  verified: boolean;
  content: string;
  created: string;
  favorites: number;
  favorited: boolean;
}
