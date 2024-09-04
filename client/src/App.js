import Header from "./components/header"
import Dials from './components/dials'
import io from 'socket.io-client';
const socket = io('10.0.0.230:3000', { transports: ['websocket'] });

function App() {
  return (
    <div className='flex-col w-full h-screen'>
      <Header socket={socket}/>
      <Dials socket={socket}/>
    </div>
  )
}
export default App;