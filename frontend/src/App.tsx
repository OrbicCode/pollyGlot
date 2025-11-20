import { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header/Header';
import TranslationForm from './components/TranslationForm/TranslationForm';
import TranslationResult from './components/TranslationResult/TranslationResult';

export interface FormData {
  text: string;
  targetLanguage: string;
}

function App() {
  const [formData, setFormData] = useState<FormData>();
  const [translation, setTranslation] = useState<string | null>();
  const [isTranslated, setIsTranslated] = useState<boolean>(false);

  useEffect(() => {
    async function createTranslation() {
      if (formData) {
        const { text, targetLanguage } = formData;
        try {
          const response = await fetch('http://localhost:3000/translation', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              text: text,
              targetLanguage: targetLanguage,
            }),
          });

          if (!response.ok) {
            throw new Error('Network response was not ok');
          }

          const data = await response.json();
          setTranslation(data.translation);
          setIsTranslated(true);
        } catch (error) {
          console.error('Error: ', error);
        }
      }
    }

    createTranslation();
  }, [formData]);
  return (
    <main className='mainContainer'>
      <Header />
      <section className='translationSection'>
        <div className='translationContainer'>
          {isTranslated ? (
            <TranslationResult
              translation={translation}
              formData={formData}
              setIsTranslated={setIsTranslated}
            />
          ) : (
            <TranslationForm setFormData={setFormData} />
          )}
        </div>
      </section>
    </main>
  );
}

export default App;
