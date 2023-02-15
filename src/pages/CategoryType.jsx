import { collection, getDocs, limit, orderBy, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Spinner from '../components/Spinner';
import { db } from '../Firebase';
import Listitem from './Listitem';

const CategoryType = () => {
	const { type } = useParams();
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [number, setNumber] = useState(8);

	useEffect(() => {
		async function FetchData() {
			try {
				// get referenc
				const docRef = collection(db, 'listings');
				// Create the Query
				const q = query(
					docRef,
					where('type', '==', type),
					orderBy('timestamp', 'desc'),
					limit(number)
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
				setData(data);
				setLoading(false);
			} catch (err) {
				setLoading(false);
				console.log(err);
			}
		}
		FetchData();
	}, [number, type]);

	return (
		<>
			<main className='max-w-6xl px-3 pt-6 mx-auto'>
				<h2 className='text-3xl text-center w-full mb-6 font-bold'>Places for {type}</h2>
				{loading ? (
					<Spinner />
				) : data && data.length > 0 ? (
					<>
						<ul className='sm:grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4'>
							{data.map((list) => (
								<Listitem key={list.id} id={list.id} list={list.data} />
							))}
						</ul>
						<div className='flex justify-center items-center'>
							<button
								className='form-control text-center mt-6 mb-6  px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0focus:text-gray-700 focus:bg-white hover:border-slate-600 focus:outline-none'
								onClick={() => setNumber((prevState) => prevState + 4)}>
								Load More
							</button>
						</div>
					</>
				) : (
					<p>there are no current places for {type}</p>
				)}
			</main>
		</>
	);
};

export default CategoryType;
