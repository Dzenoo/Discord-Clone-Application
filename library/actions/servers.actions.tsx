"use server";

import Server from "../models/server";
import { uploadImage } from "../functions";
import { connectToDb } from "../mongoose";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
  validate,
} from "../validators/Validators";
import { revalidatePath } from "next/cache";
import User from "../models/user";

export async function createServer(
  serverName: string,
  serverImage: string,
  userId: string,
  path: string
): Promise<any> {
  try {
    await connectToDb();

    if (!serverImage || !serverName || !userId) {
      return { message: "Please enter a valid server name, image, and userId" };
    }

    const isServerNameValid = validate(serverName, [
      VALIDATOR_REQUIRE(),
      VALIDATOR_MINLENGTH(3),
    ]);

    if (!isServerNameValid) {
      return { message: "Please enter a valid server name." };
    }

    const uploadedImage = await uploadImage(serverImage);

    const roles = {
      name: "Admin",
      members: [userId],
    };

    const categories = {
      name: "Text Channels",
      channels: [
        {
          name: "general",
          type: "text",
          messages: [],
        },
      ],
    };

    const members = [userId];

    const createdServer = await Server.create({
      name: serverName,
      image: uploadedImage.url,
      creatorId: userId,
      roles: [roles],
      categories: [categories],
      members,
    });

    await User.findByIdAndUpdate(userId, {
      $push: {
        servers: createdServer._id,
        roles: {
          serverId: createdServer._id,
          roleId: createdServer.roles[0]._id,
        },
      },
    });

    const serverId = createdServer._id;
    const channelId = createdServer.categories[0].channels[0]._id;

    revalidatePath(path);

    return {
      message: "Server created successfully.",
      serverId,
      channelId,
    };
  } catch (error) {
    console.log(error);
  }
}

export async function fetchServerById(serverId: string): Promise<any> {
  try {
    await connectToDb();

    const server = await Server.findById(serverId).populate({
      path: "members",
      model: User,
      select: "name _id username",
    });

    if (!server) {
      return { message: "Server not found." };
    }

    return server;
  } catch (error) {
    console.log(error);
  }
}
