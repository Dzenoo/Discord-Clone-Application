"use server";

import { connectToDb } from "../mongoose";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  validate,
} from "../validators/Validators";
import User from "../models/user";
import { hashPassword } from "../functions";
import Server from "../models/server";
import { revalidatePath } from "next/cache";

export async function signup(
  name: string,
  email: string,
  username: string,
  password: string
): Promise<any> {
  try {
    await connectToDb();

    if (!email || !name || !username || !password) {
      return { message: "Invalid inputs." };
    }

    const isNameValid = validate(name, [VALIDATOR_MINLENGTH(3)]);
    const isEmailValid = validate(email, [VALIDATOR_EMAIL()]);
    const isUsernameValid = validate(username, [VALIDATOR_MINLENGTH(3)]);
    const isPasswordValid = validate(password, [VALIDATOR_MINLENGTH(8)]);

    if (!isEmailValid || !isUsernameValid || !isNameValid || !isPasswordValid) {
      return { message: "Please enter valid credentials." };
    }

    const existingEmail = await User.findOne({ email: email });
    const existingUsername = await User.findOne({ name: name });

    if (existingEmail || existingUsername) {
      return { message: "User already exists. Please try again." };
    }

    const hashedPassword = await hashPassword(password);

    await User.create({
      name,
      email,
      username,
      password: hashedPassword,
      directMessages: [],
      friends: [],
      servers: [],
      roles: [],
    });

    return { message: "User created." };
  } catch (error) {
    console.log(error);
  }
}

export async function fetchUser(userId: string): Promise<any> {
  try {
    await connectToDb();

    const user = await User.findById(userId)
      .populate({
        path: "servers",
        model: Server,
      })
      .populate("directMessages.userId")
      .populate("directMessages.messages")
      .populate({
        path: "friends",
        model: User,
        select: "-password",
      })
      .select("-password");

    if (!user) {
      return { message: "No user found." };
    }

    return user;
  } catch (error) {
    console.log(error);
  }
}

export async function addFriend(
  userId: string,
  friendUsername: string,
  path: string
): Promise<any> {
  try {
    await connectToDb();

    const friend = await User.findOneAndUpdate(
      { username: friendUsername },
      {
        $push: { friends: userId },
      }
    );

    const user = await User.findByIdAndUpdate(userId, {
      $push: { friends: friend?._id },
    });

    if (!user || !friend) {
      return { message: "No user found." };
    }

    if (user.friends.includes(friend._id)) {
      return { message: "Friend already added." };
    }

    revalidatePath(path);
    return { message: "Friend added." };
  } catch (error) {
    console.log(error);
  }
}
