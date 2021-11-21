export interface UserAuthSignup {
  username: string;
  password: string;
  fullname: string;
  email: string;
  isadmin?: boolean;
}

export interface UserAuthLogin {
  username: string;
  password: string;
}
