export interface User {
  id: number;
  name: string;
  role: {
    hasura_role: string;
    id: number;
    privileges: {
      all: boolean;
    };
    role_name: string;
  };
  refModel: string;
}

export interface LoginType {
  token: string;
  user: User;
}

export interface ForgotPasswordType {
  status: boolean;
  type: string;
}

export interface VerifyTokenType {
  status: boolean;
}

export interface ResetPassowrdType {
  status: boolean;
}
