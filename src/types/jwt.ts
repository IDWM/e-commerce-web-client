export interface JWTPayload {
  role: string;
  email: string;
  given_name: string;
  nameid: string;
  exp: number;
  iss: string;
  aud: string;
}
