import { useState } from "react";

import "./App.css";
import { InputTodo } from "./component/InputTodo.jsx";
import { IncompleteTodos } from "./component/IncompleteTodos";
import { CompleteTodos } from "./component/CompleteTodos";

export const App = () => {
  // ↓インプットで入力したら未完了TODOに移動するステート
  const [todoText, setTodoText] = useState("");

  // ↓した２つのステートはtodoのmap文の部分
  const [incompleteTodos, setIncompleteTodos] = useState([]);
  const [completeTodos, setCompleteTodos] = useState([]);

  const onChangeTodoText = (e) => {
    setTodoText(e.target.value);
  };

  // if文はinputが空だったらリターンする（なんも起きない）処理
  // ↓スプレッド構文で13行目の部分をコピー、その後ろにinputで記入したvalueを追加そして更新関数のsetIncompleteTodosで追加更新！最後にinputを空にする
  const onClickAdd = () => {
    if (todoText === "") return;
    const newTodos = [...incompleteTodos, todoText];
    setIncompleteTodos(newTodos);
    setTodoText("");
  };

  // ↓削除押すと消える処理13行目の未完了の配列をコピーしてspliceメソッドで1個削除した後に更新関数で新しく消えた後のを更新。
  const onClickDelete = (index) => {
    const newTodos = [...incompleteTodos];
    newTodos.splice(index, 1);
    setIncompleteTodos(newTodos);
  };

  // ↓未完了のTODO配列をコピーして完了ボタンを押したら未完了から消えて新しく完了配列をコピーし先ほどの未完了から完了を押されて来たものを完了TODOにきて更新関数を更新！
  const onClickComplete = (index) => {
    const newIncompleteTodos = [...incompleteTodos];
    newIncompleteTodos.splice(index, 1);

    const newCompleteTodos = [...completeTodos, incompleteTodos[index]];
    setIncompleteTodos(newIncompleteTodos);
    setCompleteTodos(newCompleteTodos);
  };

  // ↓戻すボタン押したら完了TODO新しい変数に配列をコピーして戻る押された１つTODO削除、
  // 未完了TODOの配列をコピーして戻るボタンが押されたTODOが未完了TODOに追加して、更新関数にそれぞれの配列を更新！
  const onClickback = (index) => {
    const newBackCompleteTodos = [...completeTodos];
    newBackCompleteTodos.splice(index, 1);

    const newBackInCompleteTodos = [...incompleteTodos, completeTodos[index]];
    setCompleteTodos(newBackCompleteTodos);
    setIncompleteTodos(newBackInCompleteTodos);
  };

  // ↓JSX
  return (
    <>
      <InputTodo
        todoText={todoText}
        onChange={onChangeTodoText}
        onClick={onClickAdd}
        // 未完了TODOが5個になったらボタンとインプット無効化（押せなくする）
        disabled={incompleteTodos.length >= 5}
      />
      {incompleteTodos.length >= 5 && (
        <p>登録できるTODOは5個までだよ!頑張って消化しよう！</p>
      )}
      <IncompleteTodos
        incompleteTodos={incompleteTodos}
        onClickDelete={onClickDelete}
        onClickComplete={onClickComplete}
      />
      <CompleteTodos completeTodos={completeTodos} onClickback={onClickback} />
    </>
  );
};
