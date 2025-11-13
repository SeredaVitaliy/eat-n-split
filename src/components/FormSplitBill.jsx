import { useState } from "react";
import { Button } from "../App";

export function FormSplitBill({ selectedFriends, onSplitBill }) {
  const [bill, setBill] = useState("");
  const [paidByUser, setPaidByUser] = useState("");
  const paidByFriend = bill ? bill - paidByUser : "";
  const [whoIsPaying, setWhoIsPaying] = useState("user");

  function handleSubmit(e) {
    e.preventDefault();

    if (!bill || !paidByUser) return;
    onSplitBill(whoIsPaying === "user" ? paidByFriend : -paidByUser);
  }

  return (
    <form className="form-split-bill" onSubmit={handleSubmit}>
      <h2>Разделить счет с {selectedFriends.name}</h2>

      <label>Сумма счета</label>
      <input
        type="text"
        value={bill}
        onChange={(e) => setBill(Number(e.target.value))}
      />

      <label> Твоя сумма</label>
      <input
        type="text"
        value={paidByUser}
        onChange={(e) =>
          setPaidByUser(
            Number(e.target.value) > bill ? paidByUser : Number(e.target.value)
          )
        }
      />

      <label> Сумма {selectedFriends.name}</label>
      <input type="text" disabled value={paidByFriend} />

      <label value={whoIsPaying}>Кто оплачивает счет </label>
      <select onChange={(e) => setWhoIsPaying(e.target.value)}>
        <option value="user">Ты</option>
        <option value="friend">{selectedFriends.name}</option>
      </select>
      <Button>Разделить счет</Button>
    </form>
  );
}
