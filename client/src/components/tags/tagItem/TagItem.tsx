import React, { useEffect, useState } from 'react';
import styles from './tagItem.module.scss';
import { TagsContext } from '../../../context/Context';

interface Tag {
  tag: {
    name: string
    color: string
    id: string
  }
  activeModal?: boolean
}

export default function TagItem({ tag, activeModal }: Tag) {
  const [tagStatusActive, setTagStatusActive] = useState<boolean>(false);
  console.log(tagStatusActive);

  const tagsContext = React.useContext(TagsContext);
  console.log(tagsContext, 'tagsContext');

  useEffect(() => {
    tagsContext?.setSelectedTags([]);
  }, []);

  const handlerSelectTag: React.ReactEventHandler = (e: any) => {
    if (tagsContext?.selectTags.find((tag) => tag === e.target.id)) {
      tagsContext?.setSelectedTags((prev: string[]) => (
        prev.filter((tag) => tag !== e.target.id)
      ));
      setTagStatusActive(false);
    } else {
      tagsContext?.setSelectedTags((prev: string[]) => [...prev, e.target.id]);
      setTagStatusActive(true);
    }
  };

  return (
    <div
      onClick={handlerSelectTag}
      id={tag.id}
      className={activeModal ? (tagStatusActive ? styles.tagItemContainerActiveTag
        : styles.tagItemContainerActiveModal) : styles.tagItemContainer}
      title={tag.name}
    >
      <div
        style={{
          height: '25px', width: '25px', borderRadius: '50%', backgroundColor: `${tag.color}`,
        }}
        id={tag.id}
        title={tag.name}
      />
      <div
        id={tag.id}
        className={styles.tagName}
        title={tag.name}
      >
        {tag.name}
      </div>
    </div>
  );
}
