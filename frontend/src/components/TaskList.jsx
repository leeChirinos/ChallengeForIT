import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import TaskItem from './TaskItem';

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');

  const fetchTasks = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/tasks`);
      const data = await res.json();
      setTasks(data);
    } catch (error) {
      console.error('Error al obtener las tareas:', error);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Una vez eliminada la tarea no se va recuperar?')) return;

    try {
      await fetch(`${import.meta.env.VITE_API_URL}/tasks/${id}`, {
        method: 'DELETE',
      });
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error('Error al eliminar la tarea:', error);
    }
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'all') return true;
    return task.status === filter;
  });

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div>
      <div style={{ marginBottom: '1rem' }}>
        <button onClick={() => setFilter('all')}>Todas</button>
        <button onClick={() => setFilter('iniciada')}>Iniciadas</button>
        <button onClick={() => setFilter('en_proceso')}>En proceso</button>
        <button onClick={() => setFilter('finalizada')}>Finalizadas</button>
      </div>

      {filteredTasks.length === 0 ? (
        <p>No hay tareas para mostrar.</p>
      ) : (
        <ul>
          {filteredTasks.map((task) => (
            <TaskItem key={task.id} task={task} onDelete={handleDelete} />
          ))}
        </ul>
      )}
    </div>
  );
}

export default TaskList;
