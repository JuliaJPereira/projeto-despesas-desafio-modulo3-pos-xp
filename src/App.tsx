import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Despesas } from './Despesas';
import { LoginComponent } from './Login';
import './axios-configure';

const router = createBrowserRouter([
  {
    path: '/login',
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
