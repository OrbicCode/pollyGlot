import { useState } from 'react';
import type { JSX } from 'react';
import styles from './TranslationForm.module.css';
import frFlag from '../../assets/fr-flag.png';
import spFlag from '../../assets/sp-flag.png';
import jpFlag from '../../assets/jpn-flag.png';
import type { FormData } from '../../App';

interface TranslationFormProps {
  setFormData: (data: FormData) => void;
}

export default function TranslationForm({ setFormData }: TranslationFormProps): JSX.Element {
  const [text, setText] = useState<string>('');
  const [targetLanguage, setTargetLanguage] = useState<string>('french');
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');

  function handleTextChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setText(e.target.value);
  }

  function handleRadioChange(e: React.ChangeEvent<HTMLInputElement>) {
    setTargetLanguage(e.target.value);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!text) {
      setError('Must type something to be translated');
    } else {
      setFormData({
        text,
        targetLanguage,
      });
      setError('');
      setSuccess('Translating...');
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label htmlFor='text' className={styles.sectionHeader}>
        Text to translate 👇
      </label>
      <textarea
        id='text'
        value={text}
        className={styles.textarea}
        onChange={handleTextChange}
      ></textarea>
      <fieldset className={styles.radioFieldset}>
        <legend className={styles.sectionHeader}>Select language 👇</legend>
        <ul>
          <li>
            <input
              name='language'
              value='french'
              id='french'
              type='radio'
              checked={targetLanguage === 'french'}
              onChange={(e) => handleRadioChange(e)}
            />
            <label htmlFor='french'>French</label>
            <img src={frFlag} alt='The French flag.' width={30} height={20} />
          </li>
          <li>
            <input
              name='language'
              value='spanish'
              id='spanish'
              type='radio'
              checked={targetLanguage === 'spanish'}
              onChange={(e) => handleRadioChange(e)}
            />
            <label htmlFor='spanish'>Spanish</label>
            <img src={spFlag} alt='The Spanish flag.' width={30} height={20} />
          </li>
          <li>
            <input
              name='language'
              value='japanese'
              id='japanese'
              type='radio'
              checked={targetLanguage === 'japanese'}
              onChange={(e) => handleRadioChange(e)}
            />
            <label htmlFor='japanese'>Japanese</label>
            <img src={jpFlag} alt='The Japanese flag.' width={30} height={20} />
          </li>
        </ul>
      </fieldset>
      <div>
        {error ? (
          <p className={styles.errorMessage}>{error}</p>
        ) : success ? (
          <p className={styles.success}>{success}</p>
        ) : null}
        <button>Translate</button>
      </div>
    </form>
  );
}
