import { NextApiRequest } from "next";

interface User {
  id: string;
}

declare module "next" {
  export interface NextApiRequest {
    user?: User;
  }
}
