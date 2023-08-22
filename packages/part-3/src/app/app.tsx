// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.css';

import { Route, Routes, Link } from 'react-router-dom';
import { Question1, Question2, Question3 } from './pages';

const questions: { component: JSX.Element; path: string }[] = [
  { path: '/question-1', component: <Question1 /> },
  {
    path: '/question-2',
    component: <Question2 />,
  },
  {
    path: '/question-3',
    component: <Question3 />,
  },
];

export function App() {
  return (
    <div>
      {/* <NxWelcome title="part-3" /> */}

      {/* START: routes */}
      {/* These routes and navigation have been generated for you */}
      {/* Feel free to move and update them to fit your needs */}
      <div role="navigation">
        <ul>
          {questions.map((q) => (
            <li key={q.path}>
              <Link to={q.path}>{q.path}</Link>
            </li>
          ))}
        </ul>
      </div>
      <Routes>
        {questions.map((q) => (
          <Route key={q.path} path={q.path} element={q.component} />
        ))}
      </Routes>
      {/* END: routes */}
    </div>
  );
}

export default App;
