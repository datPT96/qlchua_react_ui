import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import routes from '~/routes';

const router = createBrowserRouter(routes);

function App() {
    return (
        <RouterProvider router={router} />
        // <Router>
        //     <div className="App">
        //         <Routes>
        //             {routes.map((route, index) => {
        //                 let Layout = DefaultLayout;
        //                 if (route.layout) {
        //                     Layout = route.layout;
        //                 } else if (route.layout === null) {
        //                     Layout = Fragment;
        //                 }
        //                 const Page = route.component;
        //                 return (
        //                     <Route
        //                         key={index}
        //                         path={route.path}
        //                         element={
        //                             <Layout>
        //                                 <Page />
        //                             </Layout>
        //                         }
        //                     >
        //                         {/* {route?.children
        //                             .map((childRoute, index) => {
        //                                 const Page = childRoute.component;
        //                                 return <Route key={index} path={childRoute.path} element={<Page />} />;
        //                             })
        //                             .join('')} */}
        //                     </Route>
        //                 );
        //             })}
        //         </Routes>
        //     </div>
        // </Router>
    );
}

export default App;
