let tasks = [];
let idCounter = 1;

const getTasks = (req, res) => {
  res.json(tasks);
};

const createTask = (req, res) => {
  const { title } = req.body;
  if (!title) return res.status(400).json({ error: 'Falta el título' });

  const newTask = { id: idCounter++, title, completed: false };
  tasks.push(newTask);
  res.status(201).json(newTask);
};

const updateTask = (req, res) => {
  const { id } = req.params;
  const { title, completed } = req.body;

  const task = tasks.find(t => t.id === parseInt(id));
  if (!task) return res.status(404).json({ error: 'Tarea no encontrada' });

  if (title !== undefined) task.title = title;
  if (completed !== undefined) task.completed = completed;

  res.json(task);
};

const deleteTask = (req, res) => {
  const { id } = req.params;
  const index = tasks.findIndex(t => t.id === parseInt(id));
  if (index === -1) return res.status(404).json({ error: 'Tarea no encontrada' });

  const deleted = tasks.splice(index, 1);
  res.json(deleted[0]);
};

module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask
};
