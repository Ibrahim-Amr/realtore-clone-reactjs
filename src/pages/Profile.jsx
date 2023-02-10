import { updateProfile } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { auth, db } from '../Firebase';

const Profile = () => {
	const [changeName, setChangeName] = useState(false);
	const [formData, setFormData] = useState({
		name: auth.currentUser.displayName,
		email: auth.currentUser.email,
	});
	const { name, email } = formData;
	const navigate = useNavigate();
	function onLogOut() {
		auth.signOut();
		navigate('/');
	}

	function onChange(e) {
		setFormData((prevState) => ({
			...prevState,
			[e.target.id]: e.target.value,
		}));
	}

	async function onSubmit() {
		try {
			if (auth.currentUser.displayName !== name) {
				// Update name in auth
				await updateProfile(auth.currentUser, {
					displayName: name,
				});

				// Update name in firestore
				const docRef = doc(db, 'users', auth.currentUser.uid);
				await updateDoc(docRef, {
					name,
				});
				toast.success('Profile details updated');
			}
		} catch (err) {
			toast.error('Could not update profile details');
		}
	}
	return (
		<>
			<section className='max-w-6xl mx-auto flex justify-center items-center flex-col'>
				<h1 className='text-3xl text-center mt-6 font-bold'>My Profile</h1>
				<div className='w-full md:w-[50%] mx-auto mt-6 px-3'>
					<form>
						<input
							type='text'
							id='name'
							value={name}
							disabled={!changeName}
							onChange={onChange}
							className={`w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded mb-6 ${
								changeName && 'bg-red-300 focus:bg-red-300 text-white'
							}`}
						/>
						{/* Email Input */}
						<input
							type='email'
							id='email'
							value={email}
							disabled
							className={`w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded mb-6 `}
						/>
						<div className='flex justify-between items-center whitespace-nowrap text-sm sm:text-lg mb-6'>
							<p className='flex items-center'>
								Do you want to change your name?{' '}
								<span
									onClick={() => {
										changeName && onSubmit();
										setChangeName((prevState) => !prevState);
									}}
									className='text-red-600 hover:text-red-800 transition ease-in-out duration-200 ml-1 cursor-pointer'>
									{changeName ? 'Apply Change' : 'Edit'}
								</span>
							</p>
							<p
								className='text-blue-600 hover:text-blue-800 transition ease-in-out duration-200  cursor-pointer'
								onClick={onLogOut}>
								Sign out
							</p>
						</div>
					</form>
				</div>
			</section>
		</>
	);
};

export default Profile;
