import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SignUp from './components/Welcome/SignUp/SignUp'
import Welcome from './components/Welcome/Welcome'
import SignOut from './components/SignOut/SignOut'
import Buttons from './components/Buttons'
import Currencies from './components/Directory/Currencies/Currencies'
import DeleteCoin from './components/LoggedIn/DeleteCoin/DeleteCoin'

async function createUser(userData){
  /* come back here when working on services */
  /* newUser = await create <User></User> */

}

function App() {
  const [count, setCount] = useState(0)
  const [destination,setDestination] = useState({
    deleteCoin: false,
    buyCoin: false,
    indexCoin: false
  })
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    userName:'',
    email: '',
    password:''
  })


  return (
    <>
    {/* <SignUp userData={userData} setUserData={setUserData}/> */}
    <SignOut/>
 
    {/* <Buttons destination={DeleteCoin} setDestination={setDestination }>Do you want to make changes to your crypto portfolio?</Buttons> */}
    
     <Welcome/>
     {/* <SignUp userData={userData} setUserData={setUserData} createUser={createUser}></SignUp> */}
     <Currencies></Currencies>
    </>
  )
}

export default App
