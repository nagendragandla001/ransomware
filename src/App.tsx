
import './App.css';
import DashboardPage from './pages/Dashboard';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './utils/http';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import RecordDetailPage from './pages/RecordDetail';
import RootLayout from './pages/Root';

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [{
      index: true,
      element: <DashboardPage />
    },
    {
      path: ":id",
      element: <RecordDetailPage />
    }
    ]
  },
])

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
