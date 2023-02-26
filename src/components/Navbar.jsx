import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { auth } from '../Firebase';
import { GrMenu } from 'react-icons/gr';
import { AiOutlineClose } from 'react-icons/ai';

const Navbar = () => {
	const [userState, setUserState] = useState('Sign in');
	const [windowScroll, setWindowScroll] = useState(0);
	const [open, setOpen] = useState(false);

	window.addEventListener('scroll', () => {
		setWindowScroll(window.scrollY);
	});

	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			if (user) {
				setUserState('Profile');
			} else {
				setUserState('Sign in');
			}
		});
	}, [auth]);
	return (
		<>
			{/* ${windowScroll > 50 ? 'bg-white' : 'bg-white'} */}
			<div className={`shadow-sm sticky top-0 left-0 z-40 py-3 text-black bg-white`}>
				<nav className='flex flex-col md:flex-row justify-center items-center md:justify-between md:items-centerp px-3 max-w-6xl mx-auto '>
					<div className='logo md:mb-0  w-full md:w-fit flex justify-center p-3 md:p-0 z-40'>
						<Link to={'/'}>
							<img
								src='https://www.realtytrac.com/assets/logos/realty-trac-logo-red.svg'
								alt='Logo'
								className='h-5 cursor-pointer'
							/>
						</Link>
					</div>
					{/* Menu */}
					<div
						className='text-3xl absolute right-8 top-5 cursor-pointer md:hidden z-40'
						onClick={() => setOpen((prevState) => !prevState)}>
						{open ? <AiOutlineClose /> : <GrMenu />}
					</div>
					{/* Links */}

					<ul
						className={`flex flex-col justify-center items-start md:flex-row gap-10 w-full md:w-fit absolute md:static bg-white p-5  md:p-0 md:flex  left-0  md:pl-0 pl-9 transition-all bottom-0 duration-500 ease-in translate-y-full md:translate-y-0 md:opacity-100
						${open ? 'bottom-0 ' : 'bottom-[300px] opacity-0 z-10'}`}>
						<li
							className='hover:text-gray-500 duration-500'
							onClick={() => setOpen((prevState) => !prevState)}>
							<NavLink to={'/'} className='py-3 text-sm font-bold'>
								Home
							</NavLink>
						</li>
						<li
							className='hover:text-gray-500 duration-500'
							onClick={() => setOpen((prevState) => !prevState)}>
							<NavLink to={'/offers'} className='py-3 text-sm font-bold'>
								Offers
							</NavLink>
						</li>
						<li
							className='hover:text-gray-500 duration-500'
							onClick={() => setOpen((prevState) => !prevState)}>
							<NavLink
								to={userState === 'Sign in' ? '/sign-in' : 'profile'}
								className='py-3 text-sm font-bold'>
								{userState}
							</NavLink>
						</li>
					</ul>
				</nav>
			</div>
		</>
	);
};

export default Navbar;
