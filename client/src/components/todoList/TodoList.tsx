import React, { useState, useEffect } from 'react';
import { useTypedSelector } from '../../hooks/useTypeSelector';
import { TodoItem } from './todoItem/TodoItem';
import styles from './todoList.module.scss';
import Modal from '../modal/Modal';
import FormAddTodo from '../formAddTodo/FormAddTodo';
import { TagsContext } from '../../context/Context';

interface IModal {
  active?: boolean,
  setActive: (arg: boolean) => void
  setModalEdit: (arg: boolean) => void
  modalEdit: boolean
  tags: any[]
}
interface SelectTag {
    title: string,
    description: string,
    selectTags: any[]
}

const TodoList: React.FC<IModal> = ({
  active, setActive, setModalEdit, modalEdit, tags,
}) => {
  const tagsContext = React.useContext(TagsContext);
  const selectTagState: SelectTag = { title: '', description: '', selectTags: [] };
  const [selectTodoEdit, setSelectTodoEdit] = useState(selectTagState);
  const arrayAllTodos = useTypedSelector((state) => state.todo.todos);

  useEffect(() => {
    tagsContext?.setSelectedTags(selectTodoEdit.selectTags.map((tag) => String(tag.id)));
  }, [selectTodoEdit]);

  return (
    <div className={styles.TodosContainer}>
      {arrayAllTodos ? (
        arrayAllTodos.map((todo) => (
          <TodoItem
            setActive={setActive}
            setModalEdit={setModalEdit}
            setSelectTodoEdit={setSelectTodoEdit}
            todo={todo}
            key={todo.id}
          />
        ))
      ) : null}

      {modalEdit ? null : (
        <Modal active={active} setActive={setActive} setModalEdit={setModalEdit}>
          <FormAddTodo
            tags={tags}
            activeModal={active}
            setModalActive={setActive}
            selectTodoEdit={selectTodoEdit}
            modalEdit={modalEdit}
          />
        </Modal>
      )}
    </div>
  );
};

export default TodoList;
