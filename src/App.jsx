import { useState } from "react";

import './App.css';

export const App = () => {
  // ↓インプットで入力したら未完了TODOに移動するステート
  const [todoText, setTodoText] = useState('');

  // ↓した２つのステートはtodoのmap文の部分
  const [ incompleteTodos, setIncompleteTodos ] = useState([]);
  const [ completeTodos, setCompleteTodos ] = useState([]);

  const onChangeTodoText = (e) => {
    setTodoText(e.target.value);
  }

  // if文はinputが空だったらリターンする（なんも起きない）処理
  // ↓スプレッド構文で10行目の部分をコピー、その後ろにinputで記入したvalueを追加そして更新関数のsetIncompleteTodosで追加更新！最後にinputを空にする
  const onClickAdd = () => {
    if(todoText === "") return;
    const newTodos = [...incompleteTodos, todoText];
    setIncompleteTodos(newTodos)
    setTodoText('')
  }

  // ↓削除押すと消える処理10行目の未完了の配列をコピーしてspliceメソッドで1個削除した後に更新関数で新しく消えた後のを更新。
  const onClickDelete = (index) => {
    const newTodos = [...incompleteTodos]
    newTodos.splice(index, 1);
    setIncompleteTodos(newTodos)
  }

  // ↓未完了のTODO配列をコピーして完了ボタンを押したら未完了から消えて新しく完了配列をコピーし先ほどの未完了から完了を押されて来たものを完了TODOにきて更新関数を更新！
  const onClickComplete = (index) => {
    const newIncompleteTodos = [...incompleteTodos]
    newIncompleteTodos.splice(index, 1);

    const newCompleteTodos = [...completeTodos, incompleteTodos[index]];
    setIncompleteTodos(newIncompleteTodos);
    setCompleteTodos(newCompleteTodos);
  }

  // ↓戻すボタン押したら完了TODO新しい変数に配列をコピーして戻る押された１つTODO削除、
  // 未完了TODOの配列をコピーして戻るボタンが押されたTODOが未完了TODOに追加して、更新関数にそれぞれの配列を更新！
  const onClickback = (index) => {
    const newBackCompleteTodos = [...completeTodos]
    newBackCompleteTodos.splice(index, 1);

    const newBackInCompleteTodos = [...incompleteTodos, completeTodos[index]];
    setCompleteTodos(newBackCompleteTodos)
    setIncompleteTodos(newBackInCompleteTodos)
  }

  return (
  <>
    <div className="input-area">
      <input placeholder=' TODOを追加' value={todoText} onChange={onChangeTodoText} />
      <button onClick={onClickAdd}>追加</button>
    </div>
    <div className="incomplete-area">
      <p className="title">未完了のTODO</p>
      {/* ↓繰り返しなのでmap文で！親タグにkey忘れずに！ */}
      <ul>
        {/* 第二引数indexを渡すと順番がわかる */}
        {incompleteTodos.map((todo ,index) => {
          return (
          <li key={todo} className="list-row">
            <p>{todo}</p>
            <button onClick={() => onClickComplete(index)}>完了</button>
            {/* ↓なぜアロー関数にして引数を渡しているかというと無しだと何もしてなくても実行されてしまう為 */}
            <button onClick={() => onClickDelete(index)}>削除</button>
          </li>
          );
        })}
      </ul> 
    </div>
    <div className="complete-area">
      <p className="title">完了のTODO</p>
      <ul>
        {completeTodos.map((todo, index) => {
          return (
            <li key={todo} className="list-row">
              <p>{todo}</p>
              <button onClick={() => onClickback(index)}>戻す</button>
            </li>
          )
        })}
      </ul>
    </div>
  </>
  
  );
}

