import { signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import OAuth from '../components/OAuth';
import { auth } from '../Firebase';

const SignIn = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});

	const { email, password } = formData;
	let navigate = useNavigate();
	function onChange(e) {
		setFormData((prevState) => ({
			...prevState,
			[e.target.id]: e.target.value,
		}));
	}

	async function handleSubmit(e) {
		e.preventDefault();
		try {
			const userCredential = await signInWithEmailAndPassword(auth, email, password);
			const user = userCredential.user;
			if (user) {
				navigate('/');
				toast.success(`Welcome ${user.displayName}`);
			}
		} catch (err) {
			toast.error('Please enter a valid email and password');
		}
	}
	return (
		<>
			<section>
				<h1 className='text-3xl text-center mt-6 font-bold'>Sign In</h1>
				<div className='flex justify-center items-center flex-wrap px-6 py-12 max-w-6xl mx-auto'>
					{/* IMG */}
					<div className='md:w-[67%] lg:w-[50%] mb-12 md:mb-6 '>
						<img
							src='https://images.unsplash.com/flagged/photo-1564767609342-620cb19b2357?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8a2V5fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=1000&q=60'
							alt='sign-in'
							title='sign-in'
							className='w-full rounded-2xl'
						/>
					</div>
					{/* FORM */}
					<div className='w-full md:w-[67%] lg:w-[40%] lg:ml20 lg:ml-20'>
						<form onSubmit={handleSubmit}>
							<input
								className='w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded mb-6'
								type='text'
								placeholder='Email address'
								id='email'
								value={email}
								onChange={onChange}
							/>
							<div className='relative mb-6'>
								<input
									className='w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded'
									type={showPassword ? 'text' : 'password'}
									placeholder='Password'
									id='password'
									value={password}
									onChange={onChange}
								/>
								{showPassword ? (
									<AiFillEyeInvisible
										className='absolute right-3 top-3 cursor-pointer text-xl'
										onClick={() => {
											setShowPassword((prevState) => !prevState);
										}}
										title='Hide Password'
									/>
								) : (
									<AiFillEye
										className='absolute right-3 top-3 cursor-pointer text-xl'
										onClick={() => {
											setShowPassword((prevState) => !prevState);
										}}
										title='Show Password'
									/>
								)}
							</div>
							<div className='flex justify-between  whitespace-nowrap text-sm sm:text-lg'>
								<p className='mb-6'>
									Don't have an account?
									<Link
										to={'/sign-up'}
										className='text-red-600 hover:text-red-800 transition duration-200 ease-in-out ml-1'>
										Register
									</Link>
								</p>
								<Link
									to={'/forgot-password'}
									className='text-blue-600 hover:text-blue-800 transition duration-200 ease-in-out'>
									Forgot password?
								</Link>
							</div>
							<button className='w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 transition duration-150 ease-in-out text-white text-sm font-medium shadow-md hover:shadow-lg uppercase px-7 py-3 rounded-md'>
								Sign in
							</button>
							<div className='flex items-center before:flex-1 my-4 before:border-t before:border-gray-300 after:flex-1 after:border-t after:border-gray-300'>
								<p className='text-center font-semibold mx-4'>OR</p>
							</div>
						</form>
						<OAuth />
					</div>
				</div>
			</section>
		</>
	);
};

export default SignIn;
