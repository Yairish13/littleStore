import { FC } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import DynamicRoutes from './components/DynamicRoutes/DynamicRoutes';
import rootStore from './stores/root.store';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import PrivateRoute from './components/PrivateRoute';
import UsersPage from './pages/UsersPage';
import ProductsPage from './pages/ProductsPage';

const routes = [
  { path: '/signin', element: <SignInPage rootStore={rootStore} /> },
  { path: '/signup', element: <SignUpPage rootStore={rootStore} /> },
  {
    path: '/users/*',
    element: (
      <PrivateRoute rootStore={rootStore}>
        <UsersPage rootStore={rootStore} />
      </PrivateRoute>
    ),
  },
  { path: '/', element: <ProductsPage /> },
];

const App: FC = () => (
  <Router>
    <Layout rootStore={rootStore}>
      <DynamicRoutes routes={routes} />
    </Layout>
  </Router>
);

export default App;
