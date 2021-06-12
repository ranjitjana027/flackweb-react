import styles from '../stylesheets/utils/loader.module.scss';

export function Loader(){
  return (
    <div className={styles.loader}>
        <div></div>
        <div></div>
        <div></div>
    </div>
  );
}

export function ThreeDotsLoader(){
  return (
    <div className={styles.threeDots}>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}
