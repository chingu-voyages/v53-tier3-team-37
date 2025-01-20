import { encryptPassword } from "../services/authService";
import * as userService from "../services/userService";
import { NextApiRequest, NextApiResponse } from "next";


export const changePassword = async (req: NextApiRequest, res: NextApiResponse) => {

    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({ error: "Unauthorized"})
        };
        //   make sure user isnt assigning itself new roles
        delete req.body.roles;

        const newPassword = await encryptPassword(req.body.password)

        await userService.updatePassword(userId, newPassword)
        return res.status(200).json({ message: "Password updated successfully" })

    } catch (err) {
        console.error("Error updating password:", err)
        return res.status(500).json({error: "Failed to update password"})
    }
}