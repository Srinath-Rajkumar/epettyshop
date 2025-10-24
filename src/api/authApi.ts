import { graphqlClient } from "../api/graphql";
import { SuperAdminLogin ,ForgotPassword,VerifyToken,ResetPassword} from "../graphql/queries";
import type { ForgotPasswordType, LoginType, VerifyTokenType ,ResetPassowrdType} from "../types/auth";

export const login = async (emailAddress: string,password: string): Promise<LoginType> => {
  const data = await graphqlClient.request<{ sellerLogin: LoginType }>(
    SuperAdminLogin,
    {
      emailAddress,
      password,
    }
  );
  return data.sellerLogin;
};

export const forgotPassword=async(emailAddress:string):Promise<ForgotPasswordType>=>{
  const forgotPassowrdData=await graphqlClient.request<{sellerForgotPassword:ForgotPasswordType}>(
    ForgotPassword,{
      emailAddress,
    }
  );
return forgotPassowrdData.sellerForgotPassword;
}

export const verifyToken=async(token:string):Promise<VerifyTokenType>=>{
  const verifyTokenData=await graphqlClient.request<{verifyResetPasswordToken:VerifyTokenType}>(
    VerifyToken,{
      token,
    }
  );
  return verifyTokenData.verifyResetPasswordToken;
}

export const resetPassword=async(token:string,password:string):Promise<ResetPassowrdType>=>{
  const resetPasswordData=await graphqlClient.request<{sellerResetPassword:ResetPassowrdType}>(
    ResetPassword,{
      token,password
    }
  );
  return resetPasswordData.sellerResetPassword;
}