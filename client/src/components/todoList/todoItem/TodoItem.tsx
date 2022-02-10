import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styles from './todoItem.module.scss';
import { editStatusCompleted } from '../../../store/actions/editStatusTodo';
import { deleteTodo } from '../../../store/actions/deleteTodoAction';
import { ModalMenu } from '../../modalMenu/ModalMenu';

interface AllTodo {
  todo: {
    title: string
    description: string
    Tags: any[]
    id: number
    completed: boolean
  }
  setActive: (arg: boolean) => void
  setModalEdit: (arg: boolean) => void
  setSelectTodoEdit: (arg: {title: string, description: string, selectTags: any[]}) => void
}

export const TodoItem: React.FC<AllTodo> = ({
  todo, setActive, setModalEdit, setSelectTodoEdit,
}) => {
  const dispatch = useDispatch();
  const [modalMenuActive, setModalMenu] = useState<boolean>(false);

  const handlerStatusCompleted: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    dispatch(editStatusCompleted({ id: todo.id, completed: e.target.checked }));
  };

  const handlerDeleteTodo: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    dispatch(deleteTodo(Number(e.currentTarget.id)));
  };

  const handlerEditTodo: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    setModalEdit(false);
    setActive(true);
    setModalMenu(false);
    setSelectTodoEdit({ title: todo.title, description: todo.description, selectTags: todo.Tags });
  };

  return (
    <div className={styles.todoItemContainer}>
      <div className={styles.divBtnContainer}>
        <h4 className={todo.completed ? (styles.todoTitleDone) : styles.todoTitle}>
          {todo.title}
        </h4>
        <div
          onClick={() => setModalMenu((prev) => !prev)}
          className={styles.btnEditAndDelete}
        >
          <ModalMenu modalMenuActive={modalMenuActive} setModalMenu={setModalMenu}>
            <button onClick={handlerEditTodo} className={styles.btnEdit} type="button">Изменить...</button>
            <button onClick={(e) => handlerDeleteTodo(e)} id={String(todo.id)} className={styles.btnEdit} type="button">Удалить</button>
          </ModalMenu>
        </div>
      </div>
      <h5 className={todo.completed ? styles.todoDescriptionDone : styles.todoDescription}>
        {todo.description}
      </h5>

      <div className={styles.tagAndBtnCompleted}>
        {todo.Tags ? (
          <div className={styles.tagsContainer}>
            {todo.Tags.map((tag) => (
              <div
                style={{
                  height: '20px',
                  width: '20px',
                  borderRadius: '50%',
                  backgroundColor: `${tag.color}`,
                  marginRight: '5px',
                }}
                key={tag.id}
                title={tag.name}
              />
            ))}
          </div>
        ) : null}

        <label
          className={styles.labelCheckBox}
        >
          <input
            checked={!!todo.completed}
            onChange={(e) => handlerStatusCompleted(e)}
            className={styles.inputCheckBox}
            type="checkbox"
          />
          <span className={styles.spanCheckBoxFake} />
          <span className={styles.spanCheckBoxText}>сделано</span>
        </label>
      </div>
    </div>
  );
};
