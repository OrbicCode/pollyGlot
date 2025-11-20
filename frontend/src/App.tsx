import './App.css';
import Header from './components/Header/Header';

function App() {
  return (
    <main className='mainContainer'>
      <Header />
      <section className='translationSection'>
        <div className='translationContainer'></div>
      </section>
    </main>
  );
}

export default App;
