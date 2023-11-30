"use client";
import { useRouter } from "next/navigation";

const NotFoundPage = () => {
  const router = useRouter();

  router.push("/123");
};

export default NotFoundPage;
