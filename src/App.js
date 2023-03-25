import logo from './logo.jpeg';
import './login.css';

function Header(){
  return(
  <div className="App">
  <div className='body'></div>
  <div className='hrline'></div>
  <div className='logpage'>
  <h1 className='instruct'>Login to continue</h1>
    <div className='Email'>
      <input type="text" placeholder='Email' required ></input>    
    </div>
  
    
    <div className='Password'>
      
      <input type="password" placeholder='Password'  id="Password" required ></input>  
    </div>
    
    <div className='forgot'>
      <h1>Forgot password?</h1>
    </div>
    <div className='logbutton'>
      <div className='submit'>
      <h1>Login</h1>
      </div> 
    </div>
    <div>
      <h1 className='mem'>Not a member? <div>Register</div></h1>
 </div>       
  </div>
  <header className="App-header">
    <img src={logo} className="App-logo" alt="logo" />
  </header> 
</div>
  );
}

function App() {
  return<Header/>;
}



export default App;
