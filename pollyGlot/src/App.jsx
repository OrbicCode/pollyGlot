import { useState } from 'react';
import './App.css';
import parrot from './assets/parrot.png';
import frFlag from './assets/fr-flag.png';
import spFlag from './assets/sp-flag.png';
import jpFlag from './assets/jpn-flag.png';

function App() {
  const [isTranslated, setIsTranslated] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [selectedRadio, setSelectedRadio] = useState('');
  const [translation, setTranslation] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    if (isTranslated === false) {
      setIsTranslated(true);
      try {
        const response = await fetch(
          'https://openai-api-worker.orbiccode.workers.dev/',
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              text: inputValue,
              language: selectedRadio,
            }),
          }
        );
        const data = await response.json();
        setTranslation(data);
      } catch (err) {
        console.error('Translation error:', err);
      }
    }

    if (isTranslated === true) {
      setIsTranslated(false);
      setInputValue('');
      setTranslation(null);
    }
  }

  return (
    <main className='container-main'>
      <div className='container-polly'>
        <header className='header'>
          <div className='header-content '>
            <div className='parrot-container'>
              <img src={parrot}></img>
            </div>
            <div className='header-text'>
              <h1>pollyGlot</h1>
              <p>Perfect Translation Every Time</p>
            </div>
          </div>
        </header>
        <section className='section-translator'>
          <div className='container-translator'>
            <form onSubmit={handleSubmit} className='form'>
              <div className='form-section-1'>
                {isTranslated ? (
                  <h2 className='form-labels'>Original text 👇</h2>
                ) : (
                  <label htmlFor='user-text' className='form-labels'>
                    Text to Translate 👇
                  </label>
                )}
                {isTranslated ? (
                  <div>
                    <p className='translation'>{inputValue}</p>
                  </div>
                ) : (
                  <textarea
                    id='user-text'
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className='user-textarea'
                  ></textarea>
                )}
              </div>

              <div>
                {isTranslated ? (
                  <h2 className='form-labels'>Your Translation 👇</h2>
                ) : (
                  <label className='form-labels'>Select Language 👇</label>
                )}
                {isTranslated ? (
                  <div>
                    <p className='translation'>
                      {translation && translation.translation}
                    </p>
                  </div>
                ) : (
                  <div className='radios'>
                    <label htmlFor='french' className='radio-label'>
                      <input
                        type='radio'
                        name='language'
                        id='french'
                        value='french'
                        onChange={(e) => setSelectedRadio(e.target.value)}
                      />
                      French
                      <span>
                        <img src={frFlag} />
                      </span>
                    </label>

                    <label htmlFor='spanish' className='radio-label'>
                      <input
                        type='radio'
                        name='language'
                        id='spanish'
                        value='spanish'
                        onChange={(e) => setSelectedRadio(e.target.value)}
                      />
                      Spanish
                      <span>
                        <img src={spFlag} />
                      </span>
                    </label>

                    <label htmlFor='japanese' className='radio-label'>
                      <input
                        type='radio'
                        name='language'
                        id='japanese'
                        value='japanese'
                        onChange={(e) => setSelectedRadio(e.target.value)}
                      />
                      Japanese{' '}
                      <span>
                        <img src={jpFlag} />
                      </span>
                    </label>
                  </div>
                )}
              </div>

              <button>{isTranslated ? 'Start Over' : 'Translate'}</button>
            </form>
          </div>
        </section>
      </div>
    </main>
  );
}

export default App;
