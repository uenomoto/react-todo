// 未完了のTODO

export const IncompleteTodos = ({
  incompleteTodos,
  onClickDelete,
  onClickComplete,
}) => {
  return (
    <div className="incomplete-area">
      <p className="title">未完了のTODO</p>
      {/* ↓繰り返しなのでmap文で！親タグにkey忘れずに！ */}
      <ul>
        {/* 第二引数indexを渡すと順番がわかる */}
        {incompleteTodos.map((todo, index) => {
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
  );
};
