import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Despesas } from './Despesas';
import { LoginComponent } from './Login';

const router = createBrowserRouter([
  {
    path: '/',
    element: <LoginComponent />,
  },
  {
    path: '/despesas',
    element: <Despesas />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
