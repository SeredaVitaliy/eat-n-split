import { Button } from "../App";

export function Friend({ friend, onSelection, selectedFriends }) {
  const isSelected = selectedFriends?.id === friend.id;
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
