"use client";

import Image from "next/image";
import Link from "next/link";
import { Edit } from "@mui/icons-material";
import { useEffect, useState } from "react";

const DirectMessagesProfile: React.FC = () => {
  const [isOpenedProfileCard, setIsOpenedProfileCard] = useState<
    boolean | undefined
  >(false);

  useEffect(() => {
    const body = document.querySelector("body")! as HTMLBodyElement;

    body.addEventListener("click", handleExitProfileCard);

    return () => {
      body.removeEventListener("click", handleExitProfileCard);
    };
  }, [isOpenedProfileCard]);

  function handleExitProfileCard(): void {
    setIsOpenedProfileCard(false);
  }

  function handleToggleProfileCard(): void {
    setIsOpenedProfileCard((prevState) => !prevState);
  }

  return (
    <div
      className="p-3 rounded-md bg-[#191919] bottom-0 flex items-center gap-3 cursor-pointer transition-all relative hover:bg-[#313339]"
      onClick={handleToggleProfileCard}
    >
      <div
        className={`absolute bottom-[4.3rem] right-0 left-0 shadow-md bg-[#222222] rounded-md h-fit max-w-3xl w-full animate_opacity ${
          isOpenedProfileCard ? "block" : "hidden"
        }`}
      >
        <div className="h-12 bg-blue-600 rounded-t">
          <Image
            src="/images/machine-mining.jpg"
            alt="profile_image"
            className="rounded-full w-20 h-20 border-4 border-gray-900 relative left-3 top-3"
            width={100}
            height={100}
          />
          <Link
            href="/userId"
            className="absolute right-[3px] top-[3px] bg-blue-900 rounded-full p-[6px]"
          >
            <Edit fontSize="medium" style={{ color: "#fff", fontSize: "24px" }}>
              Edit Profile
            </Edit>
          </Link>
        </div>
        <div className="bg-[#191919] rounded-md mt-16 mb-3 mx-3 p-3">
          <div className="border-b border-gray-600 pb-3">
            <h2 className="text-white">dz3n00</h2>
            <p className="text-xs text-gray-300">dz3n00</p>
          </div>
          <div className="py-3 border-b border-gray-600">
            <h2 className="text-gray-300 section_subtitle">
              Chatcord member since
            </h2>
            <p className="mt-3 text-xs text-gray-300">Jun 11 2022</p>
          </div>
        </div>
      </div>
      <div>
        <img
          src="/images/machine-mining.jpg"
          alt="img"
          className="w-9 h-9 rounded-full"
        />
      </div>
      <div>
        <h2 className="text-white">dz3n00</h2>
        <p className="text-xs text-gray-300">dz3n00</p>
      </div>
    </div>
  );
};

export default DirectMessagesProfile;
