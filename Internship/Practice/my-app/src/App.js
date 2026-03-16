//import logo from './logo.svg';
import './App.css';
import Home from './components/Home';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Home name="Sumit" age={22} city="Delhi" />
      </header>
    </div>
  );
}
export default App;
