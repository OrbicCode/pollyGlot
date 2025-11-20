import './App.css';
import Header from './components/Header/Header';
import TranslationForm from './components/TranslationForm/TranslationForm';

function App() {
  return (
    <main className='mainContainer'>
      <Header />
      <section className='translationSection'>
        <div className='translationContainer'>
          <TranslationForm />
        </div>
      </section>
    </main>
  );
}

export default App;
