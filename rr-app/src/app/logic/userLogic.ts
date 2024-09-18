import UserModel from "@/models/userModels";
import { UserInput } from "../api/types/type";
export const createUser = async (values: UserInput) => {
  const user = new UserModel(values);
  const savedUser = await user.save();
  return savedUser.toObject();
};

export const validateUserInput = (userData: UserInput): { result: boolean; message: string } => {
  let result = false;
  let message = "";

  if (!/^[^@]+@[^.]+\..+$/.test(userData.user_email!)) {
    message = "your email address is not correct";
  } else if (!userData.user_name) {
    message = "Please enter your name";
  } else {
    result = true;
  }

  return { result, message };
};
