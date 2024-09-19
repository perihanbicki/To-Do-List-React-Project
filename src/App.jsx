import { useEffect, useState } from "react";
import Form from "./components/Form";
import Loader from "./components/Loader";
import ListItem from "./components/ListItem";
import axios from "axios";
import { Collapse } from "bootstrap";

axios.defaults.baseURL = `http://localhost:3000/todos`;

function App() {
  const [todos, setTodos] = useState(null);
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState();
  //bileşenin ekrana basılma olayını izle
  useEffect(() => {
    //apiden todo verilerini al

    axios
      .get("http://localhost:3000/todos", {
        timeout: 3000,
        timeoutErrorMessage: "zaman aşımı",
        params: {
          _per_page: 10,
          _page: page,
        },
      })
      .then((res) => {
        setMaxPage(res.data.pages);
        setTodos(res.data.data);
      });
  }, [page]);

  return (
    <div className="container p-3 p-md-5">
      <h2 className="text-center">
        Server <span className="text-warning">CRUD</span>
      </h2>
      <Form setTodos={setTodos} />

      <ul className="list-group">
        {/* veriler apiden gelene kadar loading bas */}
        {!todos && <Loader />}

        {todos?.map((todo) => (
          <ListItem key={todo.id} todo={todo} setTodos={setTodos} />
        ))}
      </ul>
      <div className="d-flex justify-content-between my-5">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="btn btn-primary"
        >
          {"< Geri"}
        </button>
        <span>{page}</span>
        <button
          disabled={page === maxPage}
          onClick={() => setPage(page + 1)}
          className="btn btn-primary"
        >
          {"İleri >"}
        </button>
      </div>
    </div>
  );
}

export default App;
