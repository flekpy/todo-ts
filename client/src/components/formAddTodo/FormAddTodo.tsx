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
  userID?: number | null
  title?: string
  description?: string
  selectTag?: any
}

export default function FormAddTodo({
  tags, activeModal, setModalActive, selectTodoEdit, modalEdit,
}: ITags) {
  const dispatch = useDispatch();
  const userID = useTypedSelector((state) => state.user.userData?.id);
  const inputsInitialState = {
    id: selectTodoEdit?.id,
    userID,
    title: selectTodoEdit?.title,
    description: selectTodoEdit?.description,
    selectTag: [],
  };
  const tagsContext = React.useContext(TagsContext);
  const [inputsValues, setInputsValues] = useState<InputState>(inputsInitialState);

  useEffect(() => {
    setInputsValues((prev) => ({
      id: selectTodoEdit?.id,
      userID,
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
    setInputsValues((prev) => ({
      id: null,
      userID,
      title: '',
      description: '',
      selectTag: [],
    }));
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
    setInputsValues((prev) => ({
      id: null,
      userID,
      title: '',
      description: '',
      selectTag: [],
    }));
    tagsContext?.setSelectedTags([]);
    setModalActive(false);
  };

  const editTodo = async (e: any) => {
    e.preventDefault();
    dispatch(editTodoThunk(inputsValues));
    setInputsValues((prev) => ({
      id: null,
      userID,
      title: '',
      description: '',
      selectTag: [],
    }));
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
          ??????????????
        </button>
        {modalEdit ? (
          <button className={styles.btnAddTodo} type="submit">????????????????</button>
        ) : (
          <button className={styles.btnAddTodo} type="submit">????????????????</button>
        )}
      </div>

      <label className={styles.labelFlex} htmlFor="">
        ????????????????
        {modalEdit ? (
          <input
            value={inputsValues.title || ''}
            onChange={handleValueInput}
            className={styles.inputTitle}
            type="text"
            name="title"
            placeholder="???????????? ????????????????..."
          />
        ) : (
          <input
            value={inputsValues.title}
            onChange={handleValueInput}
            className={styles.inputTitle}
            placeholder="???????????? ????????????????..."
            type="text"
            name="title"
          />
        )}
      </label>

      <label className={styles.labelFlex} htmlFor="">
        ????????????????
        {modalEdit ? (
          <TextareaAutosize
            value={inputsValues.description}
            onChange={handleValueTextArea}
            className={styles.inputDescription}
            placeholder="???????????? ????????????????..."
            name="description"
          />
        ) : (
          <TextareaAutosize
            value={inputsValues.description}
            onChange={handleValueTextArea}
            className={styles.inputDescription}
            placeholder="???????????? ????????????????..."
            name="description"
          />
        )}
      </label>

      <label className={styles.labelFlex}>
        ????????
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
