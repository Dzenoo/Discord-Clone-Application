import { redirect } from "next/navigation";

const NotFoundPage = () => {
  redirect("/123");
};

export default NotFoundPage;
