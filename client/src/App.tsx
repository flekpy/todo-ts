import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styles from './app.module.scss';
import Header from './components/header/Header';
import Modal from './components/modal/Modal';
import Tags from './components/tags/Tags';
import { getTags } from './services/getTags';
import ImgBanner from './components/imgBanner/ImgBanner';
import FormAddTodo from './components/formAddTodo/FormAddTodo';
import { TagsContext, TagsContextInterface } from './context/Context';
import TodoList from './components/todoList/TodoList';
import { getAllTodo } from './store/actions/getAllTodo';

interface ITags {
  data: any[]
  id: number
  name: string
  color: string
}

function App() {
  const dispatch = useDispatch();
  const [modalActive, setModalActive] = useState<boolean>(false);
  const [modalEdit, setModalEdit] = useState<boolean>(true);
  const [tags, setTags] = useState<ITags[]>([]);
  const [selectTags, setSelectedTags] = useState<TagsContextInterface[]>([]);

  useEffect(() => {
    getTags().then((data) => setTags(data));
    dispatch(getAllTodo(1));
  }, []);

  return (
    <div className={styles.appContainer}>
      <div className={styles.appContentContainer}>
        <TagsContext.Provider value={{ selectTags, setSelectedTags }}>

          <Header setActive={setModalActive} />
          {modalEdit
            ? (
              <Modal active={modalActive} setActive={setModalActive} setModalEdit={setModalEdit}>
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
    </div>
  );
}

export default App;
