// 入力する場所
export const InputTodo = ({ onChange, onClick, todoText, disabled }) => {
  return (
    <div className="input-area">
      <input
        disabled={disabled}
        placeholder=" TODOを追加"
        value={todoText}
        onChange={onChange}
      />
      <button disabled={disabled} onClick={onClick}>
        追加
      </button>
    </div>
  );
};
