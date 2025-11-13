import { useState } from "react";

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

function Button({ children, onClick }) {
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

      {selectedFriends && <FormSplitBill selectedFriends={selectedFriends} />}
    </div>
  );
}

function FriendList({ friends, onSelection, selectedFriends }) {
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

function Friend({ friend, onSelection, selectedFriends }) {
  const isSelected = selectedFriends?.id === friend.id;
  console.log(friend);
  return (
    <li className={isSelected ? "selected" : ""}>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>

      {friend.balance < 0 && (
        <p className="red">
          Вы должны {friend.name} {Math.abs(friend.balance)}₽
        </p>
      )}
      {friend.balance > 0 && (
        <p className="green">
          {friend.name} должен Вам {Math.abs(friend.balance)}₽
        </p>
      )}
      {friend.balance === 0 && <p>Вы ничего не должны</p>}
      <Button onClick={() => onSelection(friend)}>
        {!isSelected ? "Выбрать" : "Закрыть"}
      </Button>
    </li>
  );
}

function FormAddFriend({ onAddFriend }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");

  function handleSubmit(e) {
    e.preventDefault();

    if (!name || !image) return;

    const id = crypto.randomUUID();
    const newFriend = {
      id,
      name,
      image: `${image}?=${id}`,
      balance: 0,
    };

    onAddFriend(newFriend);

    setImage("https://i.pravatar.cc/48");
    setName("");
  }

  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label> Имя друга</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label> image URL</label>
      <input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />
      <Button>Добавить</Button>
    </form>
  );
}

function FormSplitBill({ selectedFriends }) {
  return (
    <form className="form-split-bill">
      <h2>Разделить счет с {selectedFriends.name}</h2>
      <label> Сумма счета</label>
      <input type="text" />
      <label> Твоя сумма</label>
      <input type="text" />
      <label> Сумма {selectedFriends.name}</label>
      <input type="text" disabled />

      <label>Кто оплачивает счет</label>
      <select>
        <option value="user">Ты</option>
        <option value="friend">{selectedFriends.name}</option>
      </select>
      <Button>Разделить счет</Button>
    </form>
  );
}
