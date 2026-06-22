import { jwtDecode, type JwtPayload } from "jwt-decode";

const TokenExpire = (token: string) => {
  const decoded = jwtDecode<JwtPayload>(token);

  return decoded.exp ? decoded.exp * 1000 < Date.now() : false;
};

export default TokenExpire;
