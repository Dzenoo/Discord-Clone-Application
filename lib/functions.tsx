import { ServersCategory, ServerChannel } from "@/types/servers";
import bcrypt from "bcryptjs";
import { useSession } from "next-auth/react";

export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, 12);
}

export async function comparePassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(password, hashedPassword);
}

export async function uploadImage(imagePath: string): Promise<any> {
  try {
    const response = await fetch("http://localhost:3000/api/upload", {
      method: "POST",
      body: JSON.stringify({ path: imagePath }),
    });

    return response.json();
  } catch (error) {
    console.log(error);
  }
}

export function getChannel(
  categories: ServersCategory[],
  channelId: string
): ServerChannel {
  let channel = {} as ServerChannel;
  for (const category of categories) {
    const categoryChannel = category.channels.find(
      (channel: ServerChannel) => channel._id === channelId
    );
    if (categoryChannel) {
      channel = categoryChannel;
    }
  }

  return channel;
}

export function formatCreatedDate(date: string) {
  const createdDate = new Date(date).toLocaleDateString("en-US");

  return createdDate;
}

export function getUserAuthId() {
  const { data } = useSession();
  // @ts-ignore
  const userId: string = data?.user.id;

  return userId;
}
