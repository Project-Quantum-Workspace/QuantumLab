// @ts-ignore
/* eslint-disable */

declare namespace API {
  type CurrentUser = {
    id?:number;
    name?: string;
    avatar?: string;
    email?: string;
    accessLevel?: string;
  };

  type LoginResult = {
    status?: string;
    type?: string;
    currentAuthority?: string;
    accessToken?: string;
    refreshToken?: string;
  };

  type LoginParams = {
    email?: string;
    password?: string;
    autoLogin?: boolean;
    type?: string;
  };

  type ErrorResponse = {
    errorCode: string;
    errorMessage?: string;
    success?: boolean;
  };

}
