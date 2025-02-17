import * as authService from "../services/authService";

// register
export const registerUser = async (
  name: string,
  email: string,
  password: string
) => {
  try {
    const existingUser = await authService.findUserByEmail(email);
    if (existingUser) {
      throw new Error("Email is Already Registered");
    }

    const user = await authService.createUser(email, name, password);
    if (!user) {
      throw new Error("Error when creating user");
    }
    const token = await authService.generateToken(user.id);
    if (!token) {
      throw new Error("Error issuing jwt token");
    }
    return { token, message: "User Registered Successfully" };
  } catch (err) {
    console.error("Registration Failed:", err);
    throw err;
  }
};

// login
export const loginUser = async (email: string, password: string) => {
  try {
    const user = await authService.findUserByEmail(email);
    if (!user || !user.credentials) {
      throw new Error("Can't find a user with that email and password");
    }

    if (
      !user.credentials.some((cred) => cred.type === "PASSWORDHASH") ||
      !user.credentials.some(
        async (cred) => await authService.validatePassword(password, cred.value)
      )
    ) {
      throw new Error("Invalid Credentials");
    }

    const token = await authService.generateToken(user.id);
    return { token, user, message: "User Found and Authenticated" };
  } catch (err) {
    console.error("Login Failed:", err);
    throw err;
  }
};
