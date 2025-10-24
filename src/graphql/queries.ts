import { gql } from "graphql-request";

export const SuperAdminLogin = gql`
  mutation SellerLogin($emailAddress: String!, $password: String!) {
    sellerLogin(emailAddress: $emailAddress, password: $password) {
      token
      user {
        id
        name
        role
        refModel
      }
    }
  }
`;

export const ForgotPassword = gql`
  mutation sellerForgotPassword($emailAddress: String!) {
    sellerForgotPassword(emailAddress: $emailAddress) {
      status
      type
    }
  }
`;

export const VerifyToken = gql`
  mutation verifyResetPasswordToken($token: String!) {
    verifyResetPasswordToken(token: $token) {
      status
    }
  }
`;

export const ResetPassword = gql`
  mutation sellerResetPassword($token: String!, $password: String!) {
    sellerResetPassword(token: $token, password: $password) {
      status
    }
  }
`;
