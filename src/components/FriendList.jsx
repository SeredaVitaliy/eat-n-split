import { Friend } from "./Friend";

export function FriendList({ friends, onSelection, selectedFriends }) {
  return (
    <ul>
      {friends.map((friend) => (
        <Friend
          friend={friend}
          key={friend.id}
          onSelection={onSelection}
          selectedFriends={selectedFriends}
        />
      ))}
    </ul>
  );
}
