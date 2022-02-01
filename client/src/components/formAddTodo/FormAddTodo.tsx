import React, { useState, useEffect } from 'react';
import TextareaAutosize from 'react-autosize-textarea';
import { useDispatch } from 'react-redux';
import styles from './form.module.scss';
import Tags from '../tags/Tags';
import { TagsContext } from '../../context/Context';
import { addNewTodo } from '../../store/actions/addNewTodoAction';
import { useTypedSelector } from '../../hooks/useTypeSelector';

interface ITags {
  tags: any[],
  activeModal?: boolean,
  setModalActive: (arg: boolean) => void
}
interface InputState {
  title: string
  description: string
  selectTag?: any
}

export default function FormAddTodo({ tags, activeModal, setModalActive }: ITags) {
  const dispatch = useDispatch();
  const todo = useTypedSelector((state) => state.todo);

  const inputsInitialState = {
    title: '', description: '', selectTag: [],
  };
  const tagsContext = React.useContext(TagsContext);

  const [inputsValues, setInputsValues] = useState<InputState>(inputsInitialState);

  useEffect(() => {
    setInputsValues((prev) => ({ ...prev, selectTag: tagsContext?.selectTags }));
  }, [tagsContext]);

  const closeModal: React.ReactEventHandler = (e: any) => {
    setModalActive(false);
  };

  const handleValueInput: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setInputsValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleValueTextArea: React.ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setInputsValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const addNewTodoFetch = async (e: any) => {
    e.preventDefault();
    if (inputsValues.title.length === 0 || inputsValues.description.length === 0) {
      alert('Значения не должны быть пустыми');
    }
    dispatch(addNewTodo(inputsValues));
    setModalActive(false);
  };

  return (
    <form onSubmit={addNewTodoFetch} className={styles.formContainer}>

      <div className={styles.divBtnContainer}>
        <button
          onClick={closeModal}
          className={styles.btnClose}
          type="button"
        >
          закрыть
        </button>
        <button className={styles.btnAddTodo} type="submit">добавить</button>
      </div>

      <label className={styles.labelFlex} htmlFor="">
        Название
        <input
          onChange={handleValueInput}
          className={styles.inputTitle}
          type="text"
          name="title"
          placeholder="добавь название..."
        />
      </label>

      <label className={styles.labelFlex} htmlFor="">
        Описание
        <TextareaAutosize
          onChange={handleValueTextArea}
          className={styles.inputDescription}
          placeholder="добавь описание..."
          name="description"
        />
      </label>

      <label className={styles.labelFlex}>
        Тэги
        {activeModal ? (<Tags tags={tags} activeModal={activeModal} />) : null}
      </label>

    </form>
  );
}
