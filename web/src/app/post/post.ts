import { Account } from "../account/account";

export interface Post {
  id: string;
  content: string;
  created: string;
  author: Account;
}
