import { collection, getDocs, limit, orderBy, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../Firebase';
import Listitem from '../pages/Listitem';
import Spinner from './Spinner';

const HomeCategorySection = ({ title, subTitle, type, value }) => {
	const [data, setData] = useState(null);

	useEffect(() => {
		async function FetchData() {
			try {
				// get referenc
				const docRef = collection(db, 'listings');
				// Create the Query
				const q = query(
					docRef,
					where(type, '==', value),
					orderBy('timestamp', 'desc'),
					limit(4)
				);
				// execute the query
				const querySnap = await getDocs(q);
				const data = [];
				querySnap.forEach((doc) => {
					return data.push({
						id: doc.id,
						data: doc.data(),
					});
				});
				console.log(data);
				setData(data);
			} catch (err) {
				console.log(err);
			}
		}
		FetchData();
	}, [type, value]);

	if (data == null) {
		return <Spinner />;
	}
	return (
		<>
			<div className='max-w-6xl px-3  mx-auto'>
				<div className='mb-6'>
					<h2 className='text-2xl font-semibold px-3'>{title}</h2>
					<Link
						to={type === 'offer' ? '/offers' : `/category/${value}`}
						className='text-blue-600 hover:text-blue-800 transition duration-150 ease-in-out px-3'>
						{subTitle}
					</Link>
					<ul className='sm:grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4'>
						{data.map((list) => (
							<Listitem key={list.id} id={list.id} list={list.data} />
						))}
					</ul>
				</div>
			</div>
		</>
	);
};

export default HomeCategorySection;
