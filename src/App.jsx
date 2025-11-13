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

export function App() {
  return (
    <div className="app">
      <div className="sidebar">
        <FriendList />
        <FormAddFriend />
        <Button>Добавить друга</Button>
      </div>
      <FormSplitBill />
    </div>
  );
}

function FriendList() {
  const friends = initialFriends;

  return (
    <ul>
      {friends.map((friend) => (
        <Friend friend={friend} key={friend.id} />
      ))}
    </ul>
  );
}

function Friend({ friend }) {
  return (
    <li>
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
      <Button>Выбрать</Button>
    </li>
  );
}

function Button({ children }) {
  return <button className="button">{children}</button>;
}

function FormAddFriend() {
  return (
    <form className="form-add-friend">
      <label> Имя друга</label>
      <input type="text" />
      <label> image URL</label>
      <input type="text" />
      <Button>Добавить</Button>
    </form>
  );
}

function FormSplitBill() {
  return (
    <form className="form-split-bill">
      <h2>Разделить счет с X</h2>
      <label> Сумма счета</label>
      <input type="text" />
      <label> Твоя сумма</label>
      <input type="text" />
      <label> Сумма Х</label>
      <input type="text" disabled />

      <label>Кто оплачивает счет</label>
      <select>
        <option value="user">Ты</option>
        <option value="friend">X</option>
      </select>
      <Button>Разделить счет</Button>
    </form>
  );
}
