import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Offers from './pages/Offers';
import Profile from './pages/Profile';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ForgotPassword from './pages/ForgotPassword';
import Navbar from './components/Navbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from './components/PrivateRoute';
import CreateListing from './pages/CreateListing';
import EditItem from './pages/EditItem';
import Category from './pages/Category';
import { Offline } from 'react-detect-offline';
import DetectOffline from './components/DetectOffline';
import ScrollToTop from 'react-scroll-to-top';

function App() {
	return (
		<>
			<Router>
				<Navbar />
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/sign-in' element={<SignIn />} />
					<Route path='/sign-up' element={<SignUp />} />
					<Route path='/forgot-password' element={<ForgotPassword />} />
					<Route path='/profile' element={<PrivateRoute />}>
						<Route path='/profile' element={<Profile />} />
					</Route>
					<Route path='/create-listing' element={<PrivateRoute />}>
						<Route path='/create-listing' element={<CreateListing />} />
					</Route>
					<Route path='/edit-item/:id' element={<PrivateRoute />}>
						<Route path='/edit-item/:id' element={<EditItem />} />
					</Route>
					<Route path='/Offers' element={<Offers />} />
					<Route path='/category/:type/:id' element={<Category />} />
				</Routes>
			</Router>
			{/* Toast */}
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
