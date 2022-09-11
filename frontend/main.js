const baseUrl = "http://localhost:5500";
const list = document.querySelector(".todos");
// 新規作成用のフォームを

// フォームのDOMを取得
const editTodo = document.querySelector(".edit");


//  form の DOM
const addTodo = document.querySelector(".add");

// 追加
addTodo.addEventListener("submit", async (e) => {
  e.preventDefault();
  const values = {
    name: addTodo.name.value.trim(),
    description: addTodo.description.value.trim(),
  };
  const data = await CreateTodo(values);

  if (!data.status) {
    return console.error(`CreateTodo Error`);
  }

  // ok
  return console.log("ok");
});

const CreateTodo = async (values) => {
  console.log(values, "values");
  const res = await axios.post(`${baseUrl}/todo/add`, values);
  return await res.data;
};

const EditTodo = async (values) => {
  console.log(values, "values");
  const res = await axios.put(`${baseUrl}/todo/values`, values);
  return await res.data;
};

// タスク一覧を呼び出す
const GetTodo = async () => {
  try {
    //  OK
    const res = await axios.get(baseUrl);
    const data = await res.data;
    let temp = "";
    data.todo.forEach((todo) => {
      const html = `
            <li>
                <h3>${todo.name}</h3>
                <span>${todo.description}</span>


                <input type ='button' value=${todo.id} onClick="DeleteTodo(event)" >削除</input>
            </li>
            `;
      temp += html;
    });
    list.innerHTML = temp;
  } catch (err) {
    //  NG
    console.error(`[GetTodo Error]`, err);
  }
};

const DeleteTodo = async (event) => {
  // todoのid
  const todoID = event.target.value;

  // API(Node.js側)にリクエスト

  try {
    axios.delete(`${baseUrl}/todo?=${todoID}`);

  } catch (err) {
    console.error(err);
  }
}

const main = () => {
  GetTodo();
};

main();
