import { useState } from 'react';
import './App.css';
import parrot from './assets/parrot.png';

function App() {
  const [isTranslated, setIsTranslated] = useState(false);

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
            <form className='form'>
              <div>
                {isTranslated ? (
                  <h2 className='form-labels'>Original text 👇</h2>
                ) : (
                  <label htmlFor='user-text' className='form-labels'>
                    Text to Translate 👇
                  </label>
                )}
                <textarea id='user-text'></textarea>
              </div>

              <div>
                {isTranslated ? (
                  <h2 className='form-labels'>Your Translation</h2>
                ) : (
                  <label className='form-labels'>Select Language</label>
                )}
                <div className='radios'>
                  <label htmlFor='french'>
                    <input type='radio' name='language' id='french' />
                    French
                  </label>

                  <label htmlFor='spanish'>
                    <input type='radio' name='language' id='spanish' />
                    Spanish
                  </label>

                  <label htmlFor='japanese'>
                    <input type='radio' name='language' id='japanese' />
                    Japanese
                  </label>
                </div>
              </div>

              <button></button>
            </form>
          </div>
        </section>
      </div>
    </main>
  );
}

export default App;
