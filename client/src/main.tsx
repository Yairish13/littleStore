import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './styles/normalize.css'
import './styles/variables.css'
import { configure } from "mobx"

configure({
    useProxies: "never"
})

// <Provider {...Stores}>
//    <App/>
//  </Provider>
ReactDOM.createRoot(document.getElementById('root')!).render(
    <App />
  ,
)
