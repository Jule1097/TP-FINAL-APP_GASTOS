import axios from "axios";
import { hashPassword, verifyPassword } from "../utils/auth.utils";

export class UserService {
  #url = "";

  constructor() {
    this.#url = "https://69190be29ccba073ee92089d.mockapi.io/api/users";
  }

  async fetchUsers() {
    try {
      const users = await axios.get(this.#url);
      return users.data;
    } catch (error) {
      console.error("Error fetching users:", error);
      return [];
    }
  }

  checkIfUserExists = async (userData) => {
    const users = await this.fetchUsers();
    const userExist = users.find((user) => user.email === userData.email);

    if (!userExist) return false;

    const passwordMatch = await verifyPassword(
      userData.password,
      userExist.password
    );

    if (!passwordMatch) return false;

    return userExist;
  };

  isUserUnique = async (userData) => {
    const users = await this.fetchUsers();
    const userNameExists = users.some(
      (user) => user.userName === userData.userName
    );
    const emailExists = users.some((user) => user.email === userData.email);

    return !(userNameExists || emailExists);
  };

  userLogin = async (userData) => {
    try {
      const userExist = await this.checkIfUserExists(userData);

      if (!userExist)
        return {
          messageError: "El usuario no existe o la contraseña es incorrecta.",
          success: false,
        };

      return {
        userLogged: userExist,
        success: true,
      };
    } catch (error) {
      console.error("Error during user login:", error);
      return null;
    }
  };

  registerUser = async (userData) => {
    try {
      const userIsUnique = await this.isUserUnique(userData);

      if (userIsUnique) {
        const hashedPassword = await hashPassword(userData.password);
        userData.password = hashedPassword;

        await axios.post(this.#url, userData);

        return {
          success: true,
          messageSuccess: "Usuario registrado con éxito.",
        };
      }

      return {
        success: false,
        messageError: "El usuario ya existe.",
      };
    } catch (error) {
      console.error("Error registering user:", error);
      return null;
    }
  };
}
