// 完了のTODO

export const CompleteTodos = ({ completeTodos, onClickback }) => {
  return (
    <div className="complete-area">
      <p className="title">完了のTODO</p>
      <ul>
        {completeTodos.map((todo, index) => {
          return (
            <li key={todo} className="list-row">
              <p>{todo}</p>
              <button onClick={() => onClickback(index)}>戻す</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
