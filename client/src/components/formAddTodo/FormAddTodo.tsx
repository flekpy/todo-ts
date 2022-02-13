import React, { useState, useEffect } from 'react';
import TextareaAutosize from 'react-autosize-textarea';
import { useDispatch } from 'react-redux';
import styles from './form.module.scss';
import Tags from '../tags/Tags';
import { TagsContext } from '../../context/Context';
import { addNewTodo } from '../../store/actions/addNewTodoAction';
import { editTodoThunk } from '../../store/actions/editStatusTodo';
import { useTypedSelector } from '../../hooks/useTypeSelector';

interface ITags {
  tags: any[],
  activeModal?: boolean,
  setModalActive: (arg: boolean) => void
  selectTodoEdit?: {
    id?: number
    title?: string
    description?: string
    selectTags?: any[]
  }
  modalEdit?: boolean
}
interface InputState {
  id?: number | null
  title?: string | undefined
  description?: string
  selectTag?: any
}
export default function FormAddTodo({
  tags, activeModal, setModalActive, selectTodoEdit, modalEdit,
}: ITags) {
  const dispatch = useDispatch();
  const userID = useTypedSelector((state) => state.user.userData?.id);
  const inputsInitialState = {
    id: userID,
    title: selectTodoEdit?.title,
    description: selectTodoEdit?.description,
    selectTag: [],
  };
  const tagsContext = React.useContext(TagsContext);
  const [inputsValues, setInputsValues] = useState<InputState>(inputsInitialState);

  useEffect(() => {
    setInputsValues((prev) => ({
      id: userID,
      title: selectTodoEdit?.title,
      description: selectTodoEdit?.description,
      selectTag: tagsContext?.selectTags,
    }));
  }, [selectTodoEdit]);

  useEffect(() => {
    setInputsValues((prev) => ({ ...prev, selectTag: tagsContext?.selectTags }));
  }, [tagsContext]);

  const closeModal: React.ReactEventHandler = (e: any) => {
    setModalActive(false);
    tagsContext?.setSelectedTags([]);
  };

  const handleValueInput: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setInputsValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleValueTextArea: React.ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setInputsValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const addNewTodoFetch = async (e: any) => {
    e.preventDefault();
    dispatch(addNewTodo(inputsValues));
    setModalActive(false);
  };

  const editTodo = async (e: any) => {
    e.preventDefault();
    dispatch(editTodoThunk(inputsValues));
    tagsContext?.setSelectedTags([]);
    setModalActive(false);
  };

  return (
    <form onSubmit={modalEdit ? addNewTodoFetch : editTodo} className={styles.formContainer}>

      <div className={styles.divBtnContainer}>
        <button
          onClick={closeModal}
          className={styles.btnClose}
          type="button"
        >
          закрыть
        </button>
        {modalEdit ? (
          <button className={styles.btnAddTodo} type="submit">добавить</button>
        ) : (
          <button className={styles.btnAddTodo} type="submit">изменить</button>
        )}
      </div>

      <label className={styles.labelFlex} htmlFor="">
        Название
        {modalEdit ? (
          <input
            onChange={handleValueInput}
            className={styles.inputTitle}
            type="text"
            name="title"
            placeholder="добавь название..."
          />
        ) : (
          <input
            onChange={(e) => handleValueInput(e)}
            className={styles.inputTitle}
            value={inputsValues.title}
            placeholder="добавь название..."
            type="text"
            name="title"
          />
        )}
      </label>

      <label className={styles.labelFlex} htmlFor="">
        Описание
        {modalEdit ? (
          <TextareaAutosize
            onChange={handleValueTextArea}
            className={styles.inputDescription}
            placeholder="добавь описание..."
            name="description"
          />
        ) : (
          <TextareaAutosize
            value={inputsValues.description}
            onChange={handleValueTextArea}
            className={styles.inputDescription}
            placeholder="добавь описание..."
            name="description"
          />
        )}
      </label>

      <label className={styles.labelFlex}>
        Тэги
        {activeModal ? (
          <Tags
            tags={tags}
            activeModal={activeModal}
          />
        ) : null}
      </label>

    </form>
  );
}
