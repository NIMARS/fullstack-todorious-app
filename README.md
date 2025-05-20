# 📝 Todorious. Todo App — Fullstack React App

> Стандартное TO-DO (доп. с фильтрацией, сортировкой, drag-and-drop и синхронизацией с сервером)

---

## 🚀 Функциональность (дополняется)

- ✅ Создание, редактирование и удаление задач
- 🎯 Установка приоритета задачи (`common`, `rare`, `ultraimportant`🧠 )
- 🔍 Поиск по задачам
- 🗂️ Фильтрация по статусу и приоритету
- 📊 Сортировка (по приоритету, алфавиту, дате и статусу готовности)
- 🔃 Drag-and-drop для изменения порядка
- 💾 Локальное и серверное хранилище
- 🧠 Автосохранение фильтров и состояний

---

## 🛠️ Технологии (дополняется)

- **Frontend**: React, React Hooks, JSX, CSS
- **Backend**: Node.js, Express *(пока что так)*
- **Хранилище**: `localStorage` + REST API
- **Drag & Drop**: `react-beautiful-dnd`
*(заменяеем при react старее/новее 18.3)*

---

## 📦 Установка и запуск (возможно)

0. **Клонируй репозиторий (возможно):**

```bash
git clone https://github.com/NIMARS/fullstack-todorious-app.git 
cd fullstack-todorious-app
```

1. **Установи зависимости:**

```bash
npm install
```

2. **Запусти фронтенд:**

```bash
npm start
```

3. **(Опционально) Запусти backend-сервер::**

```bash
npm run server
```

   💡 Сервер работает (возможно на <http://localhost:3001/tasks>)

## 🖼️ Структура проекта (обновляется часто)

```bash
📁 src/
├── components/
│   ├── AddTaskForm.js
│   ├── TaskControls.js
│   ├── TaskItem.js
│   ├── TaskList.js
│   └── Task.js              
├── hooks/
│   └── useTasks.js
├── utils/
│   └── taskHelper.js
├── styles/
│   └── App.css
├── index.js
├── App.js
├── api.js  
└── assets/
```

## 📌 Пример задачи

```json
{
  "text": "Feed that enormous cat with gun!!11!",
  "completed": false,
  "priority": "ultraimportant"
}
```

## 💡 Возможности расширения

- Авторизация (JWT)
- Синхронизация между пользователями
- Поддержка проектов / списков задач
- Подключение к Firebase или MongoDB
- Темная тема 🌙

## 👨‍💻 Автор

> Роман NIMARS — fullstack-разработчик

## 📄 Лицензия

MIT License
