import { useState } from 'react';
import type { JSX } from 'react';
import styles from './TranslationForm.module.css';
import frFlag from '../../assets/fr-flag.png';
import spFlag from '../../assets/sp-flag.png';
import jpFlag from '../../assets/jpn-flag.png';
import type { Data } from '../../App';

interface TranslationFormProps {
  setData: (data: Data) => void;
}

export default function TranslationForm({ setData }: TranslationFormProps): JSX.Element {
  const [text, setText] = useState<string>('');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('french');

  function handleTextChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setText(e.target.value);
  }

  function handleRadioChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSelectedLanguage(e.target.value);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setData({
      text,
      selectedLanguage,
    });
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
              checked={selectedLanguage === 'french'}
              onChange={(e) => handleRadioChange(e)}
            />
            <label>French</label>
            <img src={frFlag} alt='The French flag.' width={30} height={20} />
          </li>
          <li>
            <input
              name='language'
              value='spanish'
              id='spanish'
              type='radio'
              checked={selectedLanguage === 'spanish'}
              onChange={(e) => handleRadioChange(e)}
            />
            <label>Spanish</label>
            <img src={spFlag} alt='The Spanish flag.' width={30} height={20} />
          </li>
          <li>
            <input
              name='language'
              value='japanese'
              id='japanese'
              type='radio'
              checked={selectedLanguage === 'japanese'}
              onChange={(e) => handleRadioChange(e)}
            />
            <label>Japanese</label>
            <img src={jpFlag} alt='The Japanese flag.' width={30} height={20} />
          </li>
        </ul>
      </fieldset>
      <button>Translate</button>
    </form>
  );
}
