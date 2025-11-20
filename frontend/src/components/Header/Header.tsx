import styles from './Header.module.css';
import parrot from '../../assets/parrot.png';

export default function Header() {
  return (
    <header className={styles.container}>
      <div className={styles.contentContainer}>
        <img src={parrot} width={95} height={85} alt="A colourful parrot flapping it's wings." />
        <div>
          <h1>PollyGlot</h1>
          <p className={styles.subTitle}>Perfect Translation Every Time</p>
        </div>
      </div>
    </header>
  );
}
