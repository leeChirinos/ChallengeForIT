import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function TaskForm() {
  const [title, setTitle] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = !!id;

  // Cargar tarea si es edición
  useEffect(() => {
    if (isEditing) {
      fetch(`${import.meta.env.VITE_API_URL}/tasks`)
        .then(res => res.json())
        .then(data => {
          const task = data.find(t => t.id === parseInt(id));
          if (task) setTitle(task.title);
        })
        .catch(err => console.error('Error al obtener la tarea:', err));
    }
  }, [id, isEditing]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = `${import.meta.env.VITE_API_URL}/tasks${isEditing ? `/${id}` : ''}`;
    const method = isEditing ? 'PUT' : 'POST';

    try {
      await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title }),
      });

      navigate('/');
    } catch (error) {
      console.error('Error al guardar la tarea:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{isEditing ? 'Editar tarea' : 'Nueva tarea'}</h2>
      <input
        type="text"
        placeholder="Título de la tarea"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <button type="submit">{isEditing ? 'Actualizar' : 'Crear'}</button>
    </form>
  );
}

export default TaskForm;