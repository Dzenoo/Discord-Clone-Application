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

export async function createServer(
  serverName: string,
  serverImage: string,
  userId: string,
  path: string
): Promise<any> {
  try {
    await connectToDb();

    if (!serverImage || !serverName) {
      return { message: "Please enter a valid server name and image." };
    }

    const isServerNameValid = validate(serverName, [
      VALIDATOR_REQUIRE(),
      VALIDATOR_MINLENGTH(3),
    ]);

    if (!isServerNameValid) {
      return { message: "Please enter a valid server name." };
    }

    const uploadedImage = await uploadImage(serverImage);

    const createdServer = await Server.create({
      name: serverName,
      image: uploadedImage.url,
      creatorId: userId,
    });

    const serverId = createdServer._id;

    revalidatePath(path);

    return {
      message: "Server created successfully.",
      serverId,
    };
  } catch (error) {
    console.log(error);
  }
}
