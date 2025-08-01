import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function TaskForm() {
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState('iniciada');
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      
      fetch(`${import.meta.env.VITE_API_URL}/tasks/${id}`)
        .then(res => res.json())
        .then(data => {
          setTitle(data.title);
          setStatus(data.status);
        })
        .catch(err => console.error('Error al cargar tarea:', err));
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return alert('El título es obligatorio');

    try {
      if (id) {
        
        await fetch(`${import.meta.env.VITE_API_URL}/tasks/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title, status }),
        });
      } else {
       
        await fetch(`${import.meta.env.VITE_API_URL}/tasks`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title, status }),
        });
      }
      navigate('/');
    } catch (error) {
      console.error('Error guardando tarea:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nombre :
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Nombre de tarea"
          required
        />
      </label>

      <label>
        Estado:
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="iniciada">Iniciada</option>
          <option value="en_proceso">En proceso</option>
          <option value="finalizada">Finalizada</option>
        </select>
      </label>

      <button type="submit">{id ? 'Actualizar tarea' : 'Crear tarea'}</button>
    </form>
  );
}

export default TaskForm;
