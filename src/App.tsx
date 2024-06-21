import './App.css';
import { Optimistic } from './Examples/Optimistic';
import { Forms } from './Examples/Forms';
import { Use } from './Examples/Use';
import { ServerComp } from './Examples/ServerComp';

function App() {
  return (
    <div className="App">
      <title> React 19 Examples </title>
      <meta name="description" content="React 19 Examples" />
      <meta name="keywords" content="react, react19, examples" />
      <header className="App-header">
        React 19 Examples
      </header>
      <main className="App-content">
      <ServerComp />
        <Optimistic />
        <Forms />
        <Use loadContext={false} />
        <Use loadContext /> 
        
      </main>
    </div>
  );
}

export default App;
