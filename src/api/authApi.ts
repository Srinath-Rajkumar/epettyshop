// import { graphqlClient } from "../api/graphql";
// import { SuperAdminLogin ,ForgotPassword,VerifyToken,ResetPassword} from "../graphql/queries";
import type { ForgotPasswordType, LoginType, VerifyTokenType ,ResetPassowrdType} from "../types/auth";
import {client} from "../api/apolloClient";
import { SuperAdminLogin ,ForgotPassword,VerifyToken,ResetPassword} from "../graphql/apolloQueries";

// export const login = async (emailAddress: string,password: string): Promise<LoginType> => {
//   const data = await graphqlClient.request<{ sellerLogin: LoginType }>(
//     SuperAdminLogin,
//     {
//       emailAddress,
//       password,
//     }
//   );
//   return data.sellerLogin;
// };
export const login = async (emailAddress: string, password: string): Promise<LoginType> => {
  const { data } = await client.mutate<{ sellerLogin: LoginType }>({
    mutation: SuperAdminLogin,
    variables: {
      emailAddress,
      password,
    },
  });
   if (!data) throw new Error("No data returned from server");
  return data.sellerLogin;
};

// export const forgotPassword=async(emailAddress:string):Promise<ForgotPasswordType>=>{
//   const forgotPassowrdData=await graphqlClient.request<{sellerForgotPassword:ForgotPasswordType}>(
//     ForgotPassword,{
//       emailAddress,
//     }
//   );
// return forgotPassowrdData.sellerForgotPassword;
// }

export const forgotPassword = async (emailAddress: string): Promise<ForgotPasswordType> => {
  const { data } = await client.mutate<{ sellerForgotPassword: ForgotPasswordType }>({
    mutation: ForgotPassword,
    variables: {
      emailAddress,
    },
  });
   if (!data) throw new Error("No data returned from server");
  return data.sellerForgotPassword;
};

// export const verifyToken=async(token:string):Promise<VerifyTokenType>=>{
//   const verifyTokenData=await graphqlClient.request<{verifyResetPasswordToken:VerifyTokenType}>(
//     VerifyToken,{
//       token,
//     }
//   );
//   return verifyTokenData.verifyResetPasswordToken;
// }

export const verifyToken = async (token: string): Promise<VerifyTokenType> => {
  const { data } = await client.mutate<{ verifyResetPasswordToken: VerifyTokenType }>({
    mutation: VerifyToken,
    variables: {
      token,
    },
  });
   if (!data) throw new Error("No data returned from server");
  return data.verifyResetPasswordToken;
};
// export const resetPassword=async(token:string,password:string):Promise<ResetPassowrdType>=>{
//   const resetPasswordData=await graphqlClient.request<{sellerResetPassword:ResetPassowrdType}>(
//     ResetPassword,{
//       token,password
//     }
//   );
//   return resetPasswordData.sellerResetPassword;
// }
export const resetPassword = async (token: string,password:string): Promise<ResetPassowrdType> => {
  const { data } = await client.mutate<{ sellerResetPassword: ResetPassowrdType }>({
    mutation: ResetPassword,
    variables: {
      token,password
    },
  });
   if (!data) throw new Error("No data returned from server");
  return data.sellerResetPassword;
};