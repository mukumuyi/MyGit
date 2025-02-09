import React from "react";
import ReactDOM from "react-dom";
import { createRoot } from 'react-dom/client';
import Timeline from "./components/Timeline";
import Trial from "./components/Trial"

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
// root.render(<Trial tab="home" />);
root.render(<Timeline tab="home" />);
// ReactDOM.render(<Timeline />, document.getElementById("app"));
// ReactDOM.render(<Svg width = "1350" height = "650" />, document.getElementById("timeline"));
