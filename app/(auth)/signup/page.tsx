import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import SignupCard from "@/components/auth/signup/SignupCard";

const SignupPage = async () => {
  const session = await getServerSession(authOptions);

  if (session) redirect("/123");

  return (
    <section className="flex justify-center items-center h-screen overflow-x-hidden">
      <SignupCard />
    </section>
  );
};

export default SignupPage;
