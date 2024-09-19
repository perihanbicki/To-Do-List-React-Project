import { v4 } from "uuid";
import axios from "axios";

const Form = ({ setTodos }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    //formdan verileri alma
    const title = e.target[0].value;
    const status = e.target[1].value;

    //input boşsa ne yapılsın?
    if (!title) {
      return alert("Lütfen başlık yazınız.");
    }
    //veri tabanına eklenecek verileri (objeyi) hazırla;
    const newTodo = {
      title: title,
      status: status,
      id: v4(),
      date: new Date().toLocaleDateString(),
    };
    //oluşturduğumuz todoyu apiye kaydet

    //AXİOS KULLANIRSAK:
    axios
      .post("http://localhost:3000/todos", newTodo)
      .then(() => setTodos((todos) => [...todos, newTodo]))
      .catch(() => alert("Üzgünüz bir problem oluştu..."));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="d-flex justify-content-center gap-3 my-5"
    >
      <input
        placeholder="Exp. React projesi yap.."
        className="form-control shadow"
        type="text"
      />

      <select className="form-select w-50">
        <option>Varsayılan</option>
        <option value="important">Önemli</option>
        <option value="daily">Günlük</option>
        <option value="job">İş</option>
      </select>

      <button type="submit" className="btn btn-primary shadow">
        Gönder
      </button>
    </form>
  );
};

export default Form;
