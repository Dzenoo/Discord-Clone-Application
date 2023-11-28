export interface FriendItemProps {
  image: string;
  title: string;
  href: string;
}

export interface FriendsListProps {
  friends: FriendItemProps[];
}

export interface FriendsItemActionsProps {
  href: string;
}
