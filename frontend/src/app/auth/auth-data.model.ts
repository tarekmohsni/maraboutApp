export interface AuthData {
  username: string;
  name: string;
  email: string;
  password: string;
  profile_id: [];
}

export interface LoginAuth {
  email: string;
  password: string;
}

export class Profile {
  profile_id: string;
  label: string;

}
