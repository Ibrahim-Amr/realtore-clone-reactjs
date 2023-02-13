import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { db } from '../Firebase';

const Contact = ({ userRef, categoryData }) => {
	const [landLord, setLandLord] = useState(null);
	const [message, setMesssage] = useState('');
	useEffect(() => {
		async function getLandLord() {
			const docRef = doc(db, 'users', userRef);
			const docSnap = await getDoc(docRef);
			if (docSnap.exists()) {
				setLandLord(docSnap.data());
			} else {
				toast.error('could not get landlord data');
			}
		}

		getLandLord();
	}, [userRef]);
	return (
		<>
			{landLord !== null && (
				<div className='flex flex-col w-full'>
					<p className='my-y font-semibold truncate'>
						Contact {landLord.name} for the:{' '}
						{categoryData.name.toLowerCase()}
					</p>
					<div className='my-6'>
						<textarea
							name='message'
							id='message'
							rows='2'
							value={message}
							onChange={(e) => setMesssage(e.target.value)}
							className='w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded resize-none focus:text-gray-700 focus:border-slate-600 focus:outline-none active:outline-none'></textarea>
					</div>
					<a
						href={`mailto:${landLord.email}?Subject=${categoryData.name}&body=${message}`}
						target='_blank'
						rel='noreferrer'>
						<button
							type='button'
							className='px-7 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm uppercase shadow-md hover:shadow-lg transition duration-150 ease-in-out w-full text-center'>
							Send message
						</button>
					</a>
				</div>
			)}
		</>
	);
};

export default Contact;
