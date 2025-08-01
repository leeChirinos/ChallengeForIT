
import { Link } from 'react-router-dom';

function TaskItem({ task, onDelete }) {
  return (
    <li style={{ marginBottom: '0.5rem' }}>
      <strong>{task.title}</strong> - Estado: <em>{task.status}</em>
      <button
        style={{ marginLeft: '1rem' }}
        onClick={() => onDelete(task.id)}
      >
        Eliminar
      </button>
      <Link to={`/edit/${task.id}`} style={{ marginLeft: '0.5rem', textDecoration: 'none' }}>
        <button>Modificar</button>
      </Link>
    </li>
  );
}

export default TaskItem;

