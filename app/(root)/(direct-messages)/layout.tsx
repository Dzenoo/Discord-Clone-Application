import DirectMessagesSidebar from "@/components/direct-messages/navigation/DirectMessagesSidebar";
import ActiveNowSidebar from "@/components/direct-messages/navigation/ActiveNowSidebar";
import "../../globals.css";

export default function DirectMessagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <div className="basis-[30em]">
        <DirectMessagesSidebar />
      </div>
      <div className="basis-full grow">{children}</div>
      <ActiveNowSidebar />
    </div>
  );
}
