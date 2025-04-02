export interface Post {
  id: string;
  content: string;
  created: string;
  username: string;
  verified: boolean;
  comments: number;
  favorites: number;
  favorited: boolean;
}
