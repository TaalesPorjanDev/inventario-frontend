import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  exp: number;
}

export function isValidToken(token: string) {
  try {
    const decoded = jwtDecode<DecodedToken>(token);

    if (!decoded.exp) {
      return false;
    }

    const currentTime = Date.now() / 1000;

    return decoded.exp > currentTime;
  } catch {
    return false;
  }
}
