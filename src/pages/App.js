
import '../styles/App.scss';
import EmployeeForm from '../components/Form';
import Header from '../components/Header';
import { Provider } from 'react-redux';
import store from '../model/store';


function App() {
  return (
    <Provider store={store}>
    <div className="App">
     
      
      <Header/>
      <EmployeeForm/>
    </div>
    </Provider>
  );
}

export default App;
