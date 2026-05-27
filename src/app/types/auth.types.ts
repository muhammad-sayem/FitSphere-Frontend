export interface ILoginResponse {
  token: string;
  access_token: string;
  refresh_token: string;
  user: {
    id: string;
    email: string;
    name: string;
    image: string;
    role: string;
    status: string;
    isDeleted: boolean;
  };
}

export interface ILoginPayload {
  email: string;
  password: string;
}