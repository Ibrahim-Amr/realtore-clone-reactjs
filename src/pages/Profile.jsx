import { updateProfile } from 'firebase/auth';
import {
	collection,
	deleteDoc,
	doc,
	getDocs,
	orderBy,
	query,
	updateDoc,
	where,
} from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { auth, db } from '../Firebase';
import { FcHome } from 'react-icons/fc';
import Listitem from './Listitem';

const Profile = () => {
	const [changeName, setChangeName] = useState(false);
	const [listings, setListings] = useState(null);
	const [loading, setLoading] = useState(true);
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

	useEffect(() => {
		async function fetchUserListings() {
			const listingRef = collection(db, 'listings');
			const q = query(
				listingRef,
				where('userRef', '==', auth.currentUser.uid),
				orderBy('timestamp', 'desc')
			);
			const querySnap = await getDocs(q);
			let listings = [];
			querySnap.forEach((doc) => {
				return listings.push({
					id: doc.id,
					data: doc.data(),
				});
			});
			setListings(listings);
			setLoading(false);
		}
		fetchUserListings();
	}, [auth.currentUser.uid]);

	async function onDelete(id) {
		if (window.confirm('Are You Sure You Want to delete this?')) {
			await deleteDoc(doc(db, 'listings', id));
			const updatedListings = listings.filter(
				(listing) => listing.id !== id
			);
      setListings(updatedListings);
      toast.success('item deleted successfully')
		}
	}
	function onEdit(id) {
		navigate(`/edit-item/${id}`);
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
							className={`w-full px-4 py-2 text-xl text-gray-700  border-gray-300 rounded mb-6 ${
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
					<button className='w-full bg-blue-600 text-white uppercase px-7 py-3 text-sm font-medium rounded shadow-md hover:shadow-lg hover:bg-blue-700 transition ease-in-out duration-150'>
						<Link
							to={'/create-listing'}
							className='flex justify-center items-center'>
							<FcHome className='mr-2 text-3xl bg-red-200 rounded-full p-1 border-2' />
							sell or rent yuor home
						</Link>
					</button>
				</div>
			</section>
			<section className='max-w-6xl px-3 pt-6 mx-auto'>
				{!loading && listings.length > 0 && (
					<>
						<h2 className='text-2xl text-center font-semibold'>
							My list
						</h2>
						<ul className='sm:grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4'>
							{listings.map((list) => (
								<Listitem
									key={list.id}
									id={list.id}
									list={list.data}
									onDelete={onDelete}
									onEdit={onEdit}
								/>
							))}
						</ul>
					</>
				)}
			</section>
		</>
	);
};

export default Profile;
