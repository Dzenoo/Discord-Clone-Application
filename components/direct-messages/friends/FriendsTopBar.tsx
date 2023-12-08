"use client";
import Button from "@/components/shared/form/Button";
import Input, { InputElement } from "@/components/shared/form/Input";
import useForm from "@/library/hooks/useForm";
import Tab from "@/components/shared/ui/Tab";
import { Chat } from "@mui/icons-material";
import { useState } from "react";
import { addFriend } from "@/library/actions/user.actions";
import { ToastContainer, toast } from "react-toastify";
import { getUserAuthId } from "@/library/functions";

type CurrentTopBar = "online" | "blocked" | "add-friend" | "";

export const FriendsTopBarData: {
  id: string;
  filter: CurrentTopBar;
  title: string;
}[] = [
  {
    id: "b0",
    title: "All",
    filter: "",
  },
  {
    id: "b1",
    title: "Online",
    filter: "online",
  },
  {
    id: "b3",
    title: "Add Friend",
    filter: "add-friend",
  },
];

const FriendsTopBar: React.FC = () => {
  const { formState, inputChangeHandler } = useForm(
    {
      add_friend: {
        value: "",
        isValid: false,
      },
    },
    false
  );
  const [currentTab, setcurrentTab] = useState<CurrentTopBar>("");
  const userId = getUserAuthId();

  function handleTabClick(title: CurrentTopBar) {
    setcurrentTab(title);
  }

  async function addFriendHandler(event: React.FormEvent) {
    event.preventDefault();

    if (formState.isValid === false) {
      return;
    }

    try {
      const response = await addFriend(
        userId,
        formState.inputs.add_friend.value,
        `/${userId}`
      );

      if (response.message === "Friend added.") {
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <ToastContainer />
      <div className="flex flex-col gap-6">
        <div className="flex gap-6 items-center">
          <div className="flex gap-3 items-center border-r pr-3">
            <div>
              <Chat style={{ color: "#fff" }} />
            </div>
            <div>
              <h2 className="text-lg text-white">Friends</h2>
            </div>
          </div>
          <ul className="flex gap-3 items-center">
            {FriendsTopBarData.map(({ id, filter, title }) => {
              if (filter === "add-friend") {
                return (
                  <Button
                    key={id}
                    variant="primary"
                    type="button"
                    onClick={() => handleTabClick(filter)}
                  >
                    Add Friend
                  </Button>
                );
              } else {
                return (
                  <Tab
                    key={id}
                    title={title}
                    onClick={() => handleTabClick(filter)}
                  />
                );
              }
            })}
          </ul>
        </div>
        {currentTab === "add-friend" ? (
          <div className="pb-7 flex flex-col gap-3">
            <div>
              <h2 className="text-lg text-white">Add Friend</h2>
              <p className="text-xs text-gray-400">
                You can add friends with their Discord username
              </p>
            </div>
            <form
              className="flex items-center gap-3"
              onSubmit={addFriendHandler}
            >
              <div className="basis-full">
                <Input
                  elementType={InputElement.INPUT}
                  id={"add_friend"}
                  type={"text"}
                  placeholder={"Enter username"}
                  validators={[]}
                  onInputChange={inputChangeHandler}
                  initialValidity={true}
                />
              </div>
              <div className="basis-40 mt-3">
                <Button variant="primary" type="submit">
                  Add Friend
                </Button>
              </div>
            </form>
          </div>
        ) : (
          <div>
            <input type="text" placeholder="Search" className="inputs" />
          </div>
        )}
      </div>
    </>
  );
};

export default FriendsTopBar;
