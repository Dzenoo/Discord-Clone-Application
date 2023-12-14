import "react-toastify/dist/ReactToastify.css";
import "../../globals.css";
import DirectMessagesSidebar from "@/components/direct-messages/navigation/DirectMessagesSidebar";
import ActiveNowSidebar from "@/components/direct-messages/navigation/ActiveNowSidebar";
import { Session, getServerSession } from "next-auth";
import { authOptions } from "@/lib/session";
import { fetchUser } from "@/lib/actions/user.actions";
import { UserTypes } from "@/types/users";

export default async function DirectMessagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session: Session | null = await getServerSession(authOptions);
  // @ts-ignore
  const userIdAuth: string = session?.user?.id;
  const user: UserTypes = await fetchUser(userIdAuth);

  return (
    <div className="flex">
      <div className="basis-[30em] max-w-[240px] w-full">
        <DirectMessagesSidebar user={JSON.parse(JSON.stringify(user))} />
      </div>
      <div className="basis-full grow">{children}</div>
      <ActiveNowSidebar />
    </div>
  );
}
