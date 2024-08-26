import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App';
import reportWebVitals from './reportWebVitals';
// import EventMouse from './EventMouse';
// import EventCompare from './EventCompare';
// import EventObj from './EventObj';
// import EventPoint from './EventPoint'
// import EventKey from './EventKey';
// import EventArgs from './EventArgs';
// import EventArgs2 from './EventArgs2';
// import EventPropagation from './EventPropagation';
// import EventOnce from './EventOnce';
import EventPassive from './EventPassive';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <App /> */}
    {/* <EventMouse alt="ロゴ画像" 
     beforSrc="https://www.web-deli.com/image/linkbanner_l.gif"
     afterSrc="https://www.web-deli.com/image/home_chara.gif" /> 
     */}
     {/* <EventCompare /> */}
     {/* <EventObj  /> */}
     {/* <EventPoint /> */}
     {/* <EventKey /> */}
     {/* <EventArgs /> */}
     {/* <EventArgs2 /> */}
     {/* <EventPropagation /> */}
     {/* <EventOnce /> */}
     <EventPassive />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
