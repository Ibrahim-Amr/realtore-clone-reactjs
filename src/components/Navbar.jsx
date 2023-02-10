import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { auth } from '../Firebase';

const Navbar = () => {
	const [userState, setUserState] = useState('Sign in');

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
			<div className='bg-white border-b shadow-sm sticky top-0 z-50 py-3'>
				<nav className='flex justify-between items-centerp px-3 max-w-6xl mx-auto'>
					<div className='logo'>
						<Link to={'/'}>
							<img
								src='https://static.rdc.moveaws.com/images/logos/rdc-logo-default.svg'
								alt='Logo'
								className='h-5 cursor-pointer'
							/>
						</Link>
					</div>
					<div className='nav-links'>
						<ul className='flex space-x-10'>
							<li>
								<NavLink
									to={'/'}
									className='py-3 text-sm font-semibold text-gray-400'>
									Home
								</NavLink>
							</li>
							<li>
								<NavLink
									to={'/offers'}
									className='py-3 text-sm font-semibold text-gray-400'>
									Offers
								</NavLink>
							</li>
							<li>
								<NavLink
									to={userState === 'Sign in' ? '/sign-in' : 'profile'}
									className='py-3 text-sm font-semibold text-gray-400'>
									{userState}
								</NavLink>
							</li>
						</ul>
					</div>
				</nav>
			</div>
		</>
	);
};

export default Navbar;
