import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import 'pretty-checkbox/dist/pretty-checkbox.min.css';
import 'bootstrap/dist/css/bootstrap.min.css'   // Bootstrap CSS
import './assets/styles/style.css'              // تنسيقاتك الخاصة
import './assets/styles/pretty-checkbox.min.css'
// ملاحظة: لا حاجة لاستيراد bootstrap JS لأننا سنستخدم react-bootstrap

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

