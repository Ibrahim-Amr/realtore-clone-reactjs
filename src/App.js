import { createHashRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import Offers from './pages/Offers';
import Profile from './pages/Profile';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ForgotPassword from './pages/ForgotPassword';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from './components/PrivateRoute';
import CreateListing from './pages/CreateListing';
import EditItem from './pages/EditItem';
import Category from './pages/Category';
import { Offline } from 'react-detect-offline';
import DetectOffline from './components/DetectOffline';
import ScrollToTop from 'react-scroll-to-top';
import CategoryType from './pages/CategoryType';
import Layout from './pages/Layout';

function App() {
	let routes = createHashRouter([
		{
			path: '/',
			element: <Layout />,
			children: [
				{
					index: true,
					element: <Home />,
				},
				{
					path: '/sign-in',
					element: <SignIn />,
				},
				{
					path: '/sign-up',
					element: <SignUp />,
				},
				{
					path: '/forgot-password',
					element: <ForgotPassword />,
				},
				{
					path: '/profile',
					element: (
						<PrivateRoute>
							<Profile />
						</PrivateRoute>
					),
				},
				{
					path: '/create-listing',
					element: (
						<PrivateRoute>
							<CreateListing />
						</PrivateRoute>
					),
				},
				{
					path: '/edit-item/:id',
					element: (
						<PrivateRoute>
							<EditItem />
						</PrivateRoute>
					),
				},
				{
					path: '/Offers',
					element: <Offers />,
				},
				{
					path: '/category/:type',
					element: <CategoryType />,
				},
				{
					path: '/category/:type/:id',
					element: <Category />,
				},
			],
		},
	]);

	return (
		<>
			<RouterProvider router={routes}></RouterProvider>;
			<ToastContainer
				position='top-right'
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme='light'
			/>
			<Offline>
				<DetectOffline />
			</Offline>
			<ScrollToTop top='200' smooth color='white' className='flex justify-center items-center' />
		</>
	);
}

export default App;
