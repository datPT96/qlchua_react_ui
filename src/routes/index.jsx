import Admin from '~/pages/Admin';
import LoginPage from '~/pages/LoginPage';
import RegisterPage from '~/pages/RegisterPage';
import { DefaultAdminLayuout } from '~/component/Layouts';
import ListMember from '~/component/Admin/components/ListMembers';
import DashboardAdmin from '~/component/Admin/components/DashboardAdmin';
import { PageNotFound } from '~/pages/ErrorPages';
import loadAdmin from '~/component/Admin/components/loadAdmin';
import UserDetail from '~/component/Admin/components/UserDetail';
import HomePage from '~/component/Home/components/HomePage';

const routes = [
    {
        path: '/qlchua_react_ui',
        element: <HomePage />,
        // errorElement: <PageNotFound />,
    },
    {
        path: '/qlchua_react_ui/admin',
        element: (
            <DefaultAdminLayuout>
                <Admin />
            </DefaultAdminLayuout>
        ),
        loader: loadAdmin,
        children: [
            {
                index: true,
                element: <DashboardAdmin />,
            },
            {
                path: 'phat-tu',
                element: <ListMember />,
            },
            {
                path: 'phat-tu/:id',
                element: <UserDetail />,
            },
        ],
    },
    {
        path: '/qlchua_react_ui/login',
        element: <LoginPage />,
        // layout: null,
    },
    {
        path: '/qlchua_react_ui/register',
        element: <RegisterPage />,
        // layout: RegisterLayout,
    },
    {
        path: '*',
        element: <PageNotFound />,
    },
];

export default routes;
