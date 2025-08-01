
let tasks = [];
let nextId = 1;

exports.getAllTasks = (req, res) => {
  res.json(tasks);
};

exports.getTaskById = (req, res) => {
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  task ? res.json(task) : res.status(404).json({ error: ' ' });
};

exports.createTask = (req, res) => {
  const { title, status } = req.body;
  if (!title || !status) {
    return res.status(400).json({ error: ' ' });
  }
  const newTask = { id: nextId++, title, status };
  tasks.push(newTask);
  res.status(201).json(newTask);
};

exports.updateTask = (req, res) => {
  const { title, status } = req.body;
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  if (!task) return res.status(404).json({ error: ' ' });

  if (title) task.title = title;
  if (status) task.status = status;
  res.json(task);
};

exports.deleteTask = (req, res) => {
  const id = parseInt(req.params.id);
  const initialLength = tasks.length;
  tasks = tasks.filter(t => t.id !== id);
  if (tasks.length === initialLength) {
    return res.status(404).json({ error: ' ' });
  }
  res.status(204).end();
};
