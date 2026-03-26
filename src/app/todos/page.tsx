'use client';

import { useEffect, useState } from 'react';
import { $fc as $fcTodoId } from '../api/todos/[id]/frourio.client';
import { $fc } from '../api/todos/frourio.client';
import styles from './page.module.css';

type Todo = {
  id: string;
  title: string;
  done: boolean;
  createdAt: string;
};

export default function TodoPage(): React.ReactElement {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState('');

  // ページを開いたときにTodo一覧を取得する
  useEffect(() => {
    void fetchTodos();
  }, []);

  // Todo一覧を取得する
  async function fetchTodos(): Promise<void> {
    const res = await $fc().$get();
    setTodos(res);
  }

  // Todoを追加する
  async function createTodo(): Promise<void> {
    if (title === '') return;
    await $fc().$post({ body: { title } });
    setTitle('');
    await fetchTodos();
  }

  // Todoの完了状態を更新する
  async function toggleTodo(id: string, done: boolean): Promise<void> {
    await $fcTodoId().$patch({ params: { id }, body: { done } });
    await fetchTodos();
  }

  return (
    <div className={styles.container}>
      <div className={styles.inner}>
        {/* ヘッダー */}
        <div className={styles.header}>
          <h1 className={styles.title}>Todoリスト</h1>
          <p className={styles.subtitle}>今日やることを管理しよう</p>
        </div>

        {/* 入力フォーム */}
        <div className={styles.form}>
          <input
            className={styles.input}
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && void createTodo()}
            placeholder="Todoを入力..."
          />
          <button
            className={styles.button}
            onClick={() => void createTodo()}
            disabled={title === ''}
          >
            追加
          </button>
        </div>

        {/* Todoリスト */}
        {todos.length === 0 ? (
          <p className={styles.empty}>Todoがありません。追加してみましょう！</p>
        ) : (
          <ul className={styles.list}>
            {todos.map((todo) => (
              <li key={todo.id} className={styles.item}>
                <input
                  className={styles.checkbox}
                  type="checkbox"
                  checked={todo.done}
                  onChange={() => void toggleTodo(todo.id, !todo.done)}
                />
                <span className={todo.done ? styles.itemTitleDone : styles.itemTitle}>
                  {todo.title}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
