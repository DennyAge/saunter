
import styles from './index.module.css';


interface EmptyContentProps {
    text?: string;
}
const EmptyContent = ( { text = 'Select any path' }: EmptyContentProps ) => {
  return (
    <div className={styles.empty_details}>
      <img src="/images/empty.svg" alt="empty" className={styles.empty_details_img}/>
      <h6 className={styles.empty_details_title}>{text}</h6>
    </div>
  );
};

export default EmptyContent;
