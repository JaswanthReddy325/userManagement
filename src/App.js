
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import './App.css'
import Home from './Home.js'
import Create from './Create.js'
import Update  from './Update'
import Read from './Read.js'
import 'bootstrap/dist/css/bootstrap.min.css'

function App(){
    return(
        <BrowserRouter>
           <Routes>
               <Route path="/" element={<Home />}></Route>
               <Route path="/create" element={<Create />}></Route>
               <Route path="/update/:id" element={<Update />}></Route>
               <Route path="/read/:id" element={<Read />}></Route>

              
           </Routes>
        </BrowserRouter>
    )
}
export default App