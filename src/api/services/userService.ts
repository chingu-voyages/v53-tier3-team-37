import { encryptPassword } from "./authService"
import prisma from "./prisma"

export const updatePassword = async (userId:string, newPassword: string) => {
 
    const user = await prisma.user.findUnique({
      where: {id: userId}
    })

    if (!user) {
      console.error("This user doesnt exist")
    }
    const updatedHash = await encryptPassword(newPassword)
    await prisma.credential.update({
      where: {userId: userId},
      data: {
        value: updatedHash
      }


    })

 
} 