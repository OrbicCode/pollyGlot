import styles from './TranslationResult.module.css';
import type { FormData } from '../../App';

interface TranslationResultProps {
  translation: string | null | undefined;
  formData: FormData | undefined;
  setIsTranslated: (boolean: boolean) => void;
}

export default function TranslationResult({
  translation,
  formData,
  setIsTranslated,
}: TranslationResultProps) {
  function handleClick() {
    setIsTranslated(false);
  }

  return (
    <div className={styles.container}>
      <div>
        <h2>Original text 👇</h2>
        <p className={styles.originalText}>{formData && formData.text}</p>
      </div>
      <div>
        <h2>Your translation 👇</h2>
        <p className={styles.result}>{translation && translation}</p>
      </div>
      <button onClick={handleClick}>Start Over</button>
    </div>
  );
}
