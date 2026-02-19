<template>
  <div class="todos-page">
    <div class="todos-layout">
      <div class="todos-container">
        <h1 class="todos-title">Todos</h1>

        <form class="todo-input-row" @submit.prevent="addTodo">
          <input
            v-model="newTodo"
            type="text"
            placeholder="Add a todo..."
            class="todo-input"
            autofocus
          />
          <button type="submit" class="todo-add-btn" :disabled="!newTodo.trim()">Add</button>
        </form>

        <div class="tabs">
          <button
            :class="['tab', { active: tab === 'active' }]"
            @click="tab = 'active'"
          >Active <span class="tab-count">{{ activeTodos.length }}</span></button>
          <button
            :class="['tab', { active: tab === 'completed' }]"
            @click="tab = 'completed'"
          >Completed <span class="tab-count">{{ completedTodos.length }}</span></button>
        </div>

        <TransitionGroup name="list" tag="ul" class="todo-list">
          <li
            v-for="todo in visibleTodos"
            :key="todo.id"
            :class="['todo-item', { completed: todo.done }]"
          >
            <label class="todo-label">
              <input
                type="checkbox"
                :checked="todo.done"
                @change="toggleTodo(todo.id)"
                class="todo-checkbox"
              />
              <span class="checkmark"></span>
              <span class="todo-text">{{ todo.text }}</span>
            </label>
            <button class="todo-delete" @click="deleteTodo(todo.id)" title="Delete">&times;</button>
          </li>
        </TransitionGroup>

        <p v-if="visibleTodos.length === 0" class="empty-state">
          {{ tab === 'active' ? 'No todos yet — add one above.' : 'No completed todos.' }}
        </p>

        <button
          v-if="tab === 'completed' && completedTodos.length"
          class="clear-btn"
          @click="clearCompleted"
        >Clear completed</button>
      </div>

      <div class="notepad-container">
        <h1 class="notepad-title">Notepad</h1>
        <textarea
          v-model="noteContent"
          class="notepad-textarea"
          placeholder="Write something down..."
        ></textarea>
        <p class="notepad-status">{{ saveStatus }}</p>
      </div>
    </div>
  </div>
</template>

<script>
const STORAGE_KEY = 'contextify-todos'
const NOTEPAD_KEY = 'contextify-notepad'

function loadTodos() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []
  } catch {
    return []
  }
}

function saveTodos(todos) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
}

function loadNotepad() {
  return localStorage.getItem(NOTEPAD_KEY) || ''
}

function saveNotepad(content) {
  localStorage.setItem(NOTEPAD_KEY, content)
}

export default {
  name: 'TodosView',
  data() {
    return {
      todos: loadTodos(),
      newTodo: '',
      tab: 'active',
      noteContent: loadNotepad(),
      saveStatus: 'Saved',
      saveTimeout: null,
    }
  },
  computed: {
    activeTodos() {
      return this.todos.filter(t => !t.done)
    },
    completedTodos() {
      return this.todos.filter(t => t.done)
    },
    visibleTodos() {
      return this.tab === 'active' ? this.activeTodos : this.completedTodos
    },
  },
  watch: {
    todos: {
      deep: true,
      handler(val) {
        saveTodos(val)
      },
    },
    noteContent(val) {
      this.saveStatus = 'Saving...'
      clearTimeout(this.saveTimeout)
      this.saveTimeout = setTimeout(() => {
        saveNotepad(val)
        this.saveStatus = 'Saved'
      }, 400)
    },
  },
  methods: {
    addTodo() {
      const text = this.newTodo.trim()
      if (!text) return
      this.todos.unshift({ id: Date.now(), text, done: false })
      this.newTodo = ''
    },
    toggleTodo(id) {
      const todo = this.todos.find(t => t.id === id)
      if (todo) todo.done = !todo.done
    },
    deleteTodo(id) {
      this.todos = this.todos.filter(t => t.id !== id)
    },
    clearCompleted() {
      this.todos = this.todos.filter(t => !t.done)
    },
  },
}
</script>

<style scoped>
.todos-page {
  min-height: 100vh;
  padding: 100px 24px 60px;
  background: #fafafa;
}

.todos-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  max-width: 1100px;
  margin: 0 auto;
  align-items: start;
}

.todos-container {
  max-width: 560px;
  width: 100%;
}

.todos-title {
  font-size: 2rem;
  font-weight: 800;
  color: #1a1a1a;
  margin-bottom: 24px;
}

/* Input row */
.todo-input-row {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.todo-input {
  flex: 1;
  padding: 12px 16px;
  font-size: 1rem;
  border: 2px solid #e8e8e8;
  border-radius: 10px;
  outline: none;
  transition: border-color 0.2s;
  font-family: inherit;
}

.todo-input:focus {
  border-color: #DE483A;
}

.todo-add-btn {
  padding: 12px 24px;
  font-size: 1rem;
  font-weight: 600;
  color: #fff;
  background: #DE483A;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: background 0.2s, transform 0.15s;
}

.todo-add-btn:hover:not(:disabled) {
  background: #c93c30;
  transform: translateY(-1px);
}

.todo-add-btn:disabled {
  opacity: 0.45;
  cursor: default;
}

/* Tabs */
.tabs {
  display: flex;
  gap: 6px;
  margin-bottom: 16px;
}

.tab {
  padding: 8px 18px;
  font-size: 0.9rem;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  background: #e8e8e8;
  color: #555;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
}

.tab.active {
  background: #1a1a1a;
  color: #fff;
}

.tab-count {
  margin-left: 4px;
  font-weight: 400;
  opacity: 0.7;
}

/* List */
.todo-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.todo-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 16px;
  margin-bottom: 8px;
  background: #fff;
  border-radius: 10px;
  border: 1px solid #eee;
  transition: box-shadow 0.2s, opacity 0.3s;
}

.todo-item:hover {
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
}

.todo-item.completed .todo-text {
  text-decoration: line-through;
  color: #aaa;
}

/* Custom checkbox */
.todo-label {
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  flex: 1;
  min-width: 0;
}

.todo-checkbox {
  display: none;
}

.checkmark {
  width: 22px;
  height: 22px;
  min-width: 22px;
  border: 2px solid #ccc;
  border-radius: 6px;
  transition: background 0.2s, border-color 0.2s;
  position: relative;
}

.todo-checkbox:checked + .checkmark {
  background: #DE483A;
  border-color: #DE483A;
}

.todo-checkbox:checked + .checkmark::after {
  content: '';
  position: absolute;
  left: 6px;
  top: 2px;
  width: 6px;
  height: 11px;
  border: solid #fff;
  border-width: 0 2.5px 2.5px 0;
  transform: rotate(45deg);
}

.todo-text {
  font-size: 1rem;
  color: #1a1a1a;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* Delete button */
.todo-delete {
  font-size: 1.3rem;
  color: #ccc;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0 4px;
  line-height: 1;
  transition: color 0.2s;
}

.todo-delete:hover {
  color: #DE483A;
}

/* Empty state */
.empty-state {
  text-align: center;
  color: #aaa;
  padding: 32px 0;
  font-size: 0.95rem;
}

/* Clear button */
.clear-btn {
  display: block;
  margin: 12px auto 0;
  padding: 8px 20px;
  font-size: 0.85rem;
  font-weight: 600;
  color: #DE483A;
  background: none;
  border: 1.5px solid #DE483A;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
}

.clear-btn:hover {
  background: #DE483A;
  color: #fff;
}

/* Transitions */
.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}

.list-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.list-leave-to {
  opacity: 0;
  transform: translateX(20px);
}

/* Notepad */
.notepad-container {
  max-width: 560px;
  width: 100%;
}

.notepad-title {
  font-size: 2rem;
  font-weight: 800;
  color: #1a1a1a;
  margin-bottom: 24px;
}

.notepad-textarea {
  width: 100%;
  min-height: 400px;
  padding: 16px;
  font-size: 1rem;
  font-family: inherit;
  line-height: 1.7;
  border: 2px solid #e8e8e8;
  border-radius: 10px;
  background: #fff;
  color: #1a1a1a;
  outline: none;
  resize: vertical;
  transition: border-color 0.2s;
  box-sizing: border-box;
}

.notepad-textarea:focus {
  border-color: #DE483A;
}

.notepad-status {
  text-align: right;
  font-size: 0.8rem;
  color: #aaa;
  margin-top: 8px;
}

@media (max-width: 860px) {
  .todos-layout {
    grid-template-columns: 1fr;
    max-width: 560px;
  }
}

@media (max-width: 600px) {
  .todos-page {
    padding: 80px 16px 40px;
  }

  .todos-title,
  .notepad-title {
    font-size: 1.6rem;
  }

  .todo-add-btn {
    padding: 12px 16px;
  }

  .notepad-textarea {
    min-height: 280px;
  }
}
</style>
