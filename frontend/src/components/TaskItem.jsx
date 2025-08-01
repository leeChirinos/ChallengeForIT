import { Link } from 'react-router-dom';

function TaskItem({ task, onDelete }) {
  return (
    <li>
      <strong>{task.title}</strong> {task.completed ? '✅' : '❌'}
      <div>
        <Link to={`/edit/${task.id}`}>Editar</Link> {' | '}
        <button onClick={() => onDelete(task.id)}>Eliminar</button>
      </div>
    </li>
  );
}

export default TaskItem;