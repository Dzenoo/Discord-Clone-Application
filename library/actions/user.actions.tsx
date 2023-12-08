"use server";

import User from "../models/user";
import Server from "../models/server";
import Message from "../models/message";
import { connectToDb } from "../mongoose";
import { hashPassword } from "../functions";
import { revalidatePath } from "next/cache";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  validate,
} from "../validators/Validators";
import {
  findDirectMessages,
  findUserById,
} from "./functions/functions.actions";

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
      .populate({
        path: "friends",
        model: User,
        select: "-password",
      })
      .populate({
        path: "directMessages",
        populate: {
          path: "userId",
          model: User,
          select: "name username image _id",
        },
      })
      .populate({
        path: "directMessages",
        populate: {
          path: "messages",
          model: Message,
          populate: {
            path: "from",
            model: User,
            select: "name username image _id",
          },
        },
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

    const friend = await User.findOne({ username: friendUsername });
    const user = await findUserById(userId);

    if (!user || !friend) {
      return { message: "No user found." };
    }

    if (
      user.friends.includes(friend._id) ||
      friend.friends.includes(user._id)
    ) {
      return { message: "Friend already added." };
    }

    user.friends.push(friend._id);
    friend.friends.push(user._id);

    await user.save();
    await friend.save();

    revalidatePath(path);
    return { message: "Friend added." };
  } catch (error) {
    console.log(error);
  }
}

export async function createMessagesDirect(userId: string, friendId: string) {
  try {
    await connectToDb();

    const user = await findUserById(userId);
    const friend = await findUserById(friendId);

    if (!user || !friend) {
      return { message: "No user found." };
    }

    const directMessagesUser = await findDirectMessages(userId, friendId);
    const directMessagesFriend = await findDirectMessages(friendId, userId);

    if (directMessagesUser || directMessagesFriend) {
      return { message: "Direct messages already exist." };
    }

    const directMessagesUserData = {
      userId: friend._id,
      messages: [],
    };

    const directMessagesFriendData = {
      userId: user._id,
      messages: [],
    };

    user.directMessages.push(directMessagesUserData);
    friend.directMessages.push(directMessagesFriendData);

    await user.save();
    await friend.save();

    return { message: "Direct messages created." };
  } catch (error) {
    console.log(error);
  }
}

export async function createMessagesForDirect(
  userId: string,
  friendId: string,
  message: string,
  path: string
) {
  try {
    await connectToDb();

    const user = await User.findById(userId);
    const friend = await User.findById(friendId);

    if (!user || !friend) {
      return { message: "No user found." };
    }

    const directMessagesUser = user.directMessages.find(
      (directMessage: any) =>
        directMessage.userId.toString() === friend._id.toString()
    );

    const directMessagesFriend = friend.directMessages.find(
      (directMessage: any) =>
        directMessage.userId.toString() === user._id.toString()
    );

    if (!directMessagesUser || !directMessagesFriend) {
      return { message: "Direct messages not found." };
    }

    const newMessage = await Message.create({
      from: userId,
      content: message,
    });

    directMessagesUser.messages.push(newMessage._id);
    directMessagesFriend.messages.push(newMessage._id);

    await user.save();
    await friend.save();

    revalidatePath(path);
    return { message: "Message sent." };
  } catch (error) {
    console.log(error);
  }
}

export async function deleteDirectMessage(
  userId: string,
  friendId: string,
  messageId: string,
  path: string
) {
  try {
    await connectToDb();

    const user = await findUserById(userId);
    const friend = await findUserById(friendId);

    if (!user || !friend) {
      return { message: "No user found." };
    }

    const directMessagesUser = await findDirectMessages(userId, friendId);
    const directMessagesFriend = await findDirectMessages(friendId, userId);

    if (!directMessagesUser || !directMessagesFriend) {
      return { message: "Direct messages not found." };
    }

    directMessagesUser.messages.pull(messageId);
    directMessagesFriend.messages.pull(messageId);

    await user.save();
    await friend.save();

    await Message.findByIdAndDelete(messageId);

    revalidatePath(path);
    return { message: "Message deleted." };
  } catch (error) {
    console.log(error);
  }
}

export async function editMessage(
  messageId: string,
  messageEdited: string,
  path: string
) {
  try {
    await connectToDb();

    const message = await Message.findByIdAndUpdate(messageId, {
      content: messageEdited,
    });

    if (!message) {
      return { message: "Message not found." };
    }

    revalidatePath(path);
    return { message: "Message edited." };
  } catch (error) {
    console.log(error);
  }
}
