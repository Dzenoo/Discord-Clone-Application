import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

const NotFoundPage = async () => {
  const session: any = await getServerSession(authOptions);

  if (session) {
    redirect(`/${session.user.id}`);
  } else {
    redirect("/login");
  }
};

export default NotFoundPage;
