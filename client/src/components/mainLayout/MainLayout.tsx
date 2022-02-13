import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styles from '../../app.module.scss';
import Header from '../header/Header';
import Modal from '../modal/Modal';
import Tags from '../tags/Tags';
import { getTags } from '../../services/getTags';
import ImgBanner from '../imgBanner/ImgBanner';
import FormAddTodo from '../formAddTodo/FormAddTodo';
import { TagsContext, TagsContextInterface } from '../../context/Context';
import TodoList from '../todoList/TodoList';
import { getAllTodo } from '../../store/actions/getAllTodo';
import { useTypedSelector } from '../../hooks/useTypeSelector';
import { Logout } from '../logout/Logout';

interface ITags {
  data: any[]
  id: number
  name: string
  color: string
}

export const MainLayout: React.FC = () => {
  const dispatch = useDispatch();
  const [modalActive, setModalActive] = useState<boolean>(false);
  const [modalEdit, setModalEdit] = useState<boolean>(true);
  const [tags, setTags] = useState<ITags[]>([]);
  const [selectTags, setSelectedTags] = useState<TagsContextInterface[]>([]);
  const userID = useTypedSelector((state) => state.user.userData?.id);

  useEffect(() => {
    if (userID !== null) {
      dispatch(getAllTodo(userID));
    }
  }, [userID]);

  useEffect(() => {
    getTags().then((data) => setTags(data));
  }, []);

  return (
    <div>
      <TagsContext.Provider value={{ selectTags, setSelectedTags }}>
        <Header setActive={setModalActive} />
        {modalEdit
          ? (
            <Modal
              active={modalActive}
              setActive={setModalActive}
              setModalEdit={setModalEdit}
            >
              <FormAddTodo
                tags={tags}
                activeModal={modalActive}
                setModalActive={setModalActive}
                modalEdit={modalEdit}
              />
            </Modal>
          ) : null}

        <div className={styles.divContentContainer}>
          <div>
            <Tags tags={tags} />
            <ImgBanner />
            <Logout />
          </div>
          <TodoList
            active={modalActive}
            setActive={setModalActive}
            setModalEdit={setModalEdit}
            modalEdit={modalEdit}
            tags={tags}
          />
        </div>

      </TagsContext.Provider>
    </div>
  );
};
