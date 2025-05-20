
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './app.jsx';
import Home from './home.jsx';
import Update from './update.jsx';
import "./index.css";
import 'bootstrap/dist/css/bootstrap.min.css';




ReactDOM.createRoot(document.getElementById("root")).render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<App />} />
            <Route path="/update/:id" element={<Update />} />
        </Routes>
    </BrowserRouter>
);