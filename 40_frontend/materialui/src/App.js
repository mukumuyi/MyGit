
import Button from '@mui/material/Button';
import Navbar from './components/Navbar/Navbar';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Navbar />
        <Button variant='contained' onClick={()=>{console.log("Click!")}}>HELLO WORLD</Button>
      </header>
    </div>
  );
}

export default App;
