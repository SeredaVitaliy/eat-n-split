import { useState } from "react";
import { FriendList } from "./components/FriendList";
import { FormAddFriend } from "./components/FormAddFriend";
import { FormSplitBill } from "./components/FormSplitBill";

const initialFriends = [
  {
    id: 118836,
    name: "Кларк",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -500,
  },
  {
    id: 933372,
    name: "Сара",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 1000,
  },
  {
    id: 499476,
    name: "Энтони",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

export function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}

export function App() {
  const [friends, setFriends] = useState(initialFriends);
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [selectedFriends, setSelectedFriends] = useState(null);

  function handleShowAddFriend() {
    setShowAddFriend((show) => !show);
  }

  function handleAddFriend(friend) {
    setFriends((friends) => [...friends, friend]);
    setShowAddFriend(false);
  }

  function handleSelection(friend) {
    // setSelectedFriends(friend);
    setSelectedFriends((current) =>
      current?.id === friend.id ? null : friend
    );
    setShowAddFriend(false);
  }

  function handleSplitBill(value) {
    //добавление нового массива
    setFriends((friends) =>
      friends.map((friend) =>
        friend.id === selectedFriends.id
          ? { ...friend, balance: friend.balance + value }
          : friend
      )
    );

    setSelectedFriends(null);
  }
  return (
    <div className="app">
      <div className="sidebar">
        <FriendList
          friends={friends}
          selectedFriends={selectedFriends}
          onSelection={handleSelection}
        />

        {showAddFriend && <FormAddFriend onAddFriend={handleAddFriend} />}

        <Button onClick={handleShowAddFriend}>
          {showAddFriend ? "Закрыть" : "Добавить друга"}
        </Button>
      </div>

      {selectedFriends && (
        <FormSplitBill
          selectedFriends={selectedFriends}
          onSplitBill={handleSplitBill}
        />
      )}
    </div>
  );
}
