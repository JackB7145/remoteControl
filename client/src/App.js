import {useState, useEffect} from 'react';
import bright from "./assets/bright.png"
import volume from "./assets/volume.png"
import click from "./assets/click.png"
import Header from "./components/header"
import Dials from './components/dials'
function App() {
  return (
    <div className='flex-col w-full h-screen'>
      <Header />
      <Dials />
    </div>
  )
}
export default App;