import { useState } from 'react';
import './App.css';
import Header from './components/Header/Header';
import TranslationForm from './components/TranslationForm/TranslationForm';

export interface Data {
  text: string;
  selectedLanguage: string;
}

function App() {
  const [data, setData] = useState<Data>();
  if (data) {
    console.log(data);
  }
  return (
    <main className='mainContainer'>
      <Header />
      <section className='translationSection'>
        <div className='translationContainer'>
          <TranslationForm setData={setData} />
        </div>
      </section>
    </main>
  );
}

export default App;
