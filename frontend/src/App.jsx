import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import './App.css';

function App() {
  return (
        <Router>            
      <div className="container">
        <h1> Gestor de Tareas </h1>
        <nav>
          <Link to="/">Lista de tareas</Link> | <Link to="/new">Crear tarea</Link>
        </nav>
        <Routes>
          <Route path="/" element={<TaskList />} />
          <Route path="/new" element={<TaskForm />} />
          <Route path="/edit/:id" element={<TaskForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
