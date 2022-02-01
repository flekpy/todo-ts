import TagItem from './tagItem/TagItem';
import styles from './tags.module.scss';

interface ITags {
  tags: any[],
  activeModal?: boolean,
}

export default function Tags({ tags, activeModal }: ITags) {
  return (
    <div className={activeModal ? (styles.tagsContainer) : ''}>
      {tags && (
        tags.map((tag) => (
          <TagItem
            activeModal={activeModal}
            tag={tag}
            key={tag.id}
          />
        ))
      )}
    </div>
  );
}
