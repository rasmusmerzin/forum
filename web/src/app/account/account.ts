export interface Account {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  bio: string;
  email: string;
  emailVerified: boolean;
  created: string;
}

export interface AccountUpdate {
  firstName: string;
  lastName: string;
  bio: string;
  email: string;
}
