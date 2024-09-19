import { createBrowserRouter, Outlet } from 'react-router-dom'

import { AppLayout } from '@/pages/_layouts/app'
import { Clients } from '@/pages/app/clients/clients'
import { CreateClient } from '@/pages/app/clients/create'
import { UpdateClient } from '@/pages/app/clients/update'
import { Dashboard } from '@/pages/app/dashboard/dashboard'

import { NotFound } from './pages/404'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    errorElement: <NotFound />,
    children: [
      { path: '/', element: <Dashboard /> },
      {
        path: '/clients',
        element: <Outlet />,
        children: [
          { index: true, element: <Clients /> },
          { path: '/clients/create', element: <CreateClient /> },
          { path: '/clients/:id', element: <UpdateClient /> },
        ],
      },
    ],
  },
])
