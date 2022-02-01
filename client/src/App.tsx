import { useState, useEffect } from 'react';
import styles from './app.module.scss';
import Header from './components/header/Header';
import Modal from './components/modal/Modal';
import Tags from './components/tags/Tags';
import { getTags } from './services/getTags';
import ImgBanner from './components/imgBanner/ImgBanner';
import FormAddTodo from './components/formAddTodo/FormAddTodo';
import { TagsContext, TagsContextInterface } from './context/Context';
import TodoList from './components/todoList/TodoList';

interface ITags {
  data: any[]
  id: number
  name: string
  color: string
}

function App() {
  const [modalActive, setModalActive] = useState<boolean>(false);
  const [tags, setTags] = useState<ITags[]>([]);
  const [selectTags, setSelectedTags] = useState<TagsContextInterface[]>([]);

  useEffect(() => {
    getTags().then((data) => setTags(data));
  }, []);

  // const user = useTypedSelector((state) => state.user);
  return (
    <div className={styles.appContainer}>
      <div className={styles.appContentContainer}>
        <TagsContext.Provider value={{ selectTags, setSelectedTags }}>

          <Header setActive={setModalActive} />
          {modalActive
            && (
              <Modal active={modalActive} setActive={setModalActive}>
                <FormAddTodo
                  tags={tags}
                  activeModal={modalActive}
                  setModalActive={setModalActive}
                />
              </Modal>
            )}

          <div className={styles.divContentContainer}>
            <div>
              <Tags tags={tags} />
              <ImgBanner />
            </div>
            <TodoList />
          </div>

        </TagsContext.Provider>
      </div>
    </div>
  );
}

export default App;
