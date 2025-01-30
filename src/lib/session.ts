import { User } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export const getUserSession = async (): Promise<User> => {
    const authUserSession = await getServerSession(authOptions);

    return authUserSession?.user as User;
}