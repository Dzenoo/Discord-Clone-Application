"use client";

import Button from "@/components/shared/form/Button";
import Input from "@/components/shared/form/Input";
import useForm from "@/library/hooks/useForm";
import { InputElement } from "@/types/inputs";

const InviteToServerForm: React.FC = () => {
  const { formState, inputChangeHandler } = useForm(
    {
      search_friends: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  return (
    <div className="flex flex-col gap-7 w-96">
      <div>
        <h2 className="text-xl text-white font-bold">
          Invite Friends to server name server
        </h2>
        <Input
          elementType={InputElement.INPUT}
          id={"search_friends"}
          type={"text"}
          placeholder={"Search for friends"}
          validators={[]}
          onInputChange={inputChangeHandler}
          initialValidity={true}
        />
      </div>
      <div className="h-40 overflow-y-scroll">
        {[
          {
            id: "f1",
            name: "John Doe",
            image: "/images/machine-mining.jpg",
          },
          {
            id: "f2",
            name: "John Doe",
            image: "/images/machine-mining.jpg",
          },
          {
            id: "f3",
            name: "John Doe",
            image: "/images/machine-mining.jpg",
          },
        ].map((friend: { id: string; name: string; image: string }) => (
          <div
            key={friend.id}
            className="flex items-center gap-3 py-2 border-gray-600 transition-colors hover:bg-[#313339] px-3 rounded-md"
          >
            <div className="w-8 h-8 rounded-full overflow-hidden">
              <img
                src={friend.image}
                alt={friend.name}
                className="w-full h-full"
              />
            </div>
            <div className="flex-1">
              <h3 className="text-white font-bold">{friend.name}</h3>
            </div>
            <div>
              <Button variant="primary" type="button">
                Invite
              </Button>
            </div>
          </div>
        ))}
      </div>
      <div className="pb-6 flex flex-col gap-3">
        <div>
          <p className="uppercase text-xs text-gray-400 font-bold">
            Or send a server invite link to a friend
          </p>
        </div>
        <div className="flex gap-3">
          <input readOnly className="inputs basis-full" value="chatcord/123" />
          <div>
            <Button variant="primary" type="button">
              Copy
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InviteToServerForm;
