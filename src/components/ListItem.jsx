import formatDate from "../helpers/formatDate";
import getStatus from "../helpers/getStatus";
import axios from "axios";
import Content from "./Content";
import { useState } from "react";
import EditMode from "./EditMode";

const ListItem = ({ todo, setTodos }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  //silme butonuna tıklanında çalışacak

  const handleDelete = () => {
    //veriyi apiden sil
    axios
      .delete(`/http://localhost:3000/todos/${todo.id}`)
      //veriyi stateden yani ekrandan sil
      .then(() =>
        setTodos((todos) => todos.filter((item) => item.id !== todo.id))
      );
  };

  //Form gönderilince çalışır
  const handleEdit = (e) => {
    e.preveventDefault();

    //inputlardaki verileri al
    const newStatus = e.target[0].value;
    const newTitle = e.target[1].value;

    // apide edit yapılınca oluşacak yeni todoyu güncelle
    axios
      .patch(`/todos/${todo.id}`, { title: newTitle, status: newStatus })
      //api isteği başarılı olursa arayüzü güncelle
      .then(() => {
        //arayüzü güncelle statedeki eski todoyu kaldır yerine yenisini koy

        const updated = { ...todo, status: newStatus, title: newTitle };

        //dizideki eski todoyu kaldır yerine yenisini koy
        const newTodos = todos.map((todo) =>
          todo.id === updated.id ? updated : todo
        );
        //statei güncelle
        setTodos(newTodos);
      });

    //düzenleme modunu kapat
    setIsEditMode(false);
  };

  return (
    <li className="relative p-3 list-group-item d-flex justify-content-between align-items-center">
      {!isEditMode ? (
        <Content
          todo={todo}
          setIsEditMode={setIsEditMode}
          handleDelete={handleDelete}
        />
      ) : (
        <EditMode
          todo={todo}
          setIsEditMode={setIsEditMode}
          handleEdit={handleEdit}
        />
      )}
      <span className="date">{formatDate(todo.date)}</span>
    </li>
  );
};

export default ListItem;
