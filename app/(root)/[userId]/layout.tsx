import DirectMessagesSidebar from "@/components/direct-messages/navigation/DirectMessagesSidebar";
import "../../globals.css";

export default function DirectMessagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex">
      <DirectMessagesSidebar />
      {children}
    </main>
  );
}
