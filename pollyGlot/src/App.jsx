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
            <form>
              <div>
                {isTranslated ? (
                  <h2>Original text 👇</h2>
                ) : (
                  <label htmlFor='user-text'>Text to Translate 👇</label>
                )}
                <textarea id='user-text'></textarea>
              </div>

              <div>
                {isTranslated ? (
                  <h2>Your Translation</h2>
                ) : (
                  <label>Select Language</label>
                )}
                <div>
                  <input type='radio' name='language' id='french' />
                  <label htmlFor='french'>French</label>
                  <input type='radio' name='language' id='spanish' />
                  <label htmlFor='spanish'> Spanish</label>
                  <input type='radio' name='language' id='japanese' />
                  <label htmlFor='japanese'> Japanese</label>
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
