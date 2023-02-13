import { doc, getDoc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Spinner from '../components/Spinner';
import { auth, db, storage } from '../Firebase';
import { v4 as uuidv4 } from 'uuid';

const EditItem = () => {
	const navigate = useNavigate();
	const [geolocationEnabled, setGeolocationEnabled] = useState(false);
	const [loading, setLoading] = useState(false);
	const [fitechData, setFitechData] = useState(null);
	const [formData, setFormData] = useState({
		type: 'rent',
		name: '',
		bedrooms: 1,
		bathrooms: 1,
		parking: false,
		furnished: false,
		address: '',
		description: '',
		offer: false,
		regularPrice: 0,
		discountedPrice: 0,
		latitude: 0,
		longitude: 0,
		images: {},
	});
	const {
		type,
		name,
		bedrooms,
		bathrooms,
		parking,
		address,
		furnished,
		description,
		offer,
		regularPrice,
		discountedPrice,
		latitude,
		longitude,
		images,
	} = formData;

	useEffect(() => {
		if (fitechData && fitechData.userRef !== auth.currentUser.uid) {
			toast.error("you can't not edit this");
			navigate('/ ');
		}
	}, [fitechData, navigate]);
	const { id } = useParams();
	// this useEffect is fetching edited item data
	useEffect(() => {
		setLoading(true);
		async function fetchList() {
			// Getting the id from the params
			const docRef = doc(db, 'listings', id);
			const docSnap = await getDoc(docRef);
			if (docSnap.exists()) {
				setFitechData({ ...docSnap.data() });
				setFormData({ ...docSnap.data() });
				setLoading(false);
				console.log(fitechData);
			} else {
				navigate('/');
				toast.error('Item does not exist');
			}
		}

		fetchList();
	}, [id, navigate]);

	function onChange(e) {
		let boolean = null;
		if (e.target.value === 'true') {
			boolean = true;
		}
		if (e.target.value === 'false') {
			boolean = false;
		}
		// Files
		if (e.target.files) {
			setFormData((prevState) => ({
				...prevState,
				images: e.target.files,
			}));
		}
		// Text/Boolean/Number
		if (!e.target.files) {
			setFormData((prevState) => ({
				...prevState,
				[e.target.id]: boolean ?? e.target.value,
			}));
		}
	}

	async function handleSubmit(e) {
		e.preventDefault();
		setLoading(true);
		if (+discountedPrice >= +regularPrice) {
			setLoading(false);
			toast.error('Discounted Price needs to be less than regular price');
			return;
		}
		if (images.length > 6) {
			toast.error('Maximum 6 images are allowed');
			return;
		}
		let geolocation = {};
		// let location;
		if (!geolocationEnabled) {
			geolocation.lat = latitude;
			geolocation.lng = longitude;
		}

		// STORE IMAGE
		async function storeImage(image) {
			return new Promise((resolve, reject) => {
				const filename = `${auth.currentUser.uid}-${
					image.name
				}-${uuidv4()}`;
				const storageRef = ref(storage, filename);
				const uploadTask = uploadBytesResumable(storageRef, image);
				uploadTask.on(
					'state_changed',
					(snapshot) => {
						// Observe state change events such as progress, pause, and resume
						// Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
						const progress =
							(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
						console.log('Upload is ' + progress + '% done');
						switch (snapshot.state) {
							case 'paused':
								console.log('Upload is paused');
								break;
							case 'running':
								console.log('Upload is running');
								break;
							default:
						}
					},
					(error) => {
						// Handle unsuccessful uploads
						reject(error);
					},
					() => {
						// Handle successful uploads on complete
						// For instance, get the download URL: https://firebasestorage.googleapis.com/...
						getDownloadURL(uploadTask.snapshot.ref).then(
							(downloadURL) => {
								resolve(downloadURL);
							}
						);
					}
				);
			});
		}

		const imgUrls = await Promise.all(
			[...images].map((image) => storeImage(image))
		).catch((error) => {
			setLoading(false);
			toast.error('Images not uploaded');
			return;
		});

		const formDataCopy = {
			...formData,
			imgUrls,
			geolocation,
			timestamp: serverTimestamp(),
			userRef: auth.currentUser.uid,
		};
		delete formDataCopy.images;
		!formDataCopy.offer && delete formDataCopy.discountedPrice;
		geolocationEnabled && delete formDataCopy.latitude;
		geolocationEnabled && delete formDataCopy.longitude;
		const docRef = doc(db, 'listings', id);

		await updateDoc(docRef, formDataCopy);
		setLoading(false);
		toast.success('edit successfully');
		navigate(`/category/${formDataCopy.type}/${docRef.id}`);
	}

	if (loading) {
		return <Spinner />;
	}
	return (
		<main className='max-w-md mx-auto px-2'>
			<h1 className='text-3xl text-center my-6 font-bold'>Edit Item</h1>
			<form onSubmit={handleSubmit}>
				{/* RENT AND SELL */}
				<p className='text-lg font-semibold mb-2'>Sell / Rednt</p>
				<div className='flex gap-x-5'>
					<button
						onClick={onChange}
						type='button'
						id='type'
						value={'sale'}
						className={`px-7 py-3 font-medium text-sm uppercase shadow-md hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full rounded ${
							type === 'rent'
								? 'bg-white text-black'
								: 'bg-slate-600 text-white'
						}`}>
						sell
					</button>
					<button
						onClick={onChange}
						type='button'
						id='type'
						value={'rent'}
						className={`px-7 py-3 font-medium text-sm uppercase shadow-md hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full rounded ${
							type === 'sale'
								? 'bg-white text-black'
								: 'bg-slate-600 text-white'
						}`}>
						rent
					</button>
				</div>
				{/* Name Field */}
				<p className='text-lg font-semibold mt-6'>Name</p>
				<input
					onChange={onChange}
					type='text'
					id='name'
					value={name}
					placeholder='Name'
					maxLength='32'
					minLength='10'
					required
					className='w-full px-4 py-2 text-xl text-gray-700 border border-gray-300 rounded focus:text-gray-700 focus:bg-white focus:border-slate-600 mb-6'
				/>
				{/* Beds / baths */}
				<div className='flex gap-x-5 mb-6'>
					<div className='w-full'>
						<p className='text-lg font-semibold'>Beds</p>
						<input
							onChange={onChange}
							type='number'
							id='bedrooms'
							value={bedrooms}
							min='1'
							max='50'
							required
							className='px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded focus:text-gray-700 focus:bg-white focus:border-slate-600 text-center w-full'
						/>
					</div>
					<div className='w-full'>
						<p className='text-lg font-semibold'>Baths</p>
						<input
							onChange={onChange}
							type='number'
							id='bathrooms'
							value={bathrooms}
							min='1'
							max='50'
							required
							className='px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded focus:text-gray-700 focus:bg-white focus:border-slate-600 text-center w-full'
						/>
					</div>
				</div>
				{/* Parking */}
				<p className='text-lg font-semibold mb-2'>Parking spot</p>
				<div className='flex gap-x-5'>
					<button
						onClick={onChange}
						type='button'
						id='parking'
						value={true}
						className={`px-7 py-3 font-medium text-sm uppercase shadow-md hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full rounded ${
							!parking
								? 'bg-white text-black'
								: 'bg-slate-600 text-white'
						}`}>
						Yes
					</button>
					<button
						onClick={onChange}
						type='button'
						id='parking'
						value={false}
						className={`px-7 py-3 font-medium text-sm uppercase shadow-md hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full rounded ${
							parking ? 'bg-white text-black' : 'bg-slate-600 text-white'
						}`}>
						No
					</button>
				</div>
				{/* Furnished */}
				<p className='text-lg font-semibold mb-2'>Furnished</p>
				<div className='flex gap-x-5'>
					<button
						onClick={onChange}
						type='button'
						id='furnished'
						value={true}
						className={`px-7 py-3 font-medium text-sm uppercase shadow-md hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full rounded ${
							!furnished
								? 'bg-white text-black'
								: 'bg-slate-600 text-white'
						}`}>
						Yes
					</button>
					<button
						onClick={onChange}
						type='button'
						id='furnished'
						value={false}
						className={`px-7 py-3 font-medium text-sm uppercase shadow-md hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full rounded ${
							furnished
								? 'bg-white text-black'
								: 'bg-slate-600 text-white'
						}`}>
						No
					</button>
				</div>
				{/* Address */}
				<p className='text-lg font-semibold mt-6'>Address</p>
				<textarea
					onChange={onChange}
					type='text'
					id='address'
					value={address}
					placeholder='Address'
					required
					className='w-full px-4 py-2 text-xl text-gray-700 border border-gray-300 rounded focus:text-gray-700 focus:bg-white focus:border-slate-600 mb-6 resize-none'
				/>
				{/* Longitude &  Latitude */}
				{!geolocationEnabled && (
					<div className='flex gap-x-5 mb-6'>
						<div className='w-full'>
							<p className='text-lg font-semibold'>Latitude</p>
							<input
								type='number'
								id='latitude'
								value={latitude}
								min='-90'
								max='90'
								required
								onChange={onChange}
								className='px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded focus:text-gray-700 focus:bg-white focus:border-slate-600 text-center w-full'
							/>
						</div>
						<div className='w-full'>
							<p className='text-lg font-semibold'>Longitude</p>
							<input
								type='number'
								id='longitude'
								value={longitude}
								min='-180'
								max='180'
								required
								onChange={onChange}
								className='px-4 py-2 text-xl  text-gray-700 bg-white border border-gray-300 rounded focus:text-gray-700 focus:bg-white focus:border-slate-600 text-center w-full'
							/>
						</div>
					</div>
				)}
				{/* description */}
				<p className='text-lg font-semibold'>description</p>
				<textarea
					onChange={onChange}
					type='text'
					id='description'
					value={description}
					placeholder='description'
					required
					className='w-full px-4 py-2 text-xl text-gray-700 border border-gray-300 rounded focus:text-gray-700 focus:bg-white focus:border-slate-600 mb-6 resize-none'
				/>
				{/* Offer */}
				<p className='text-lg font-semibold mb-2'>Offer</p>
				<div className='flex gap-x-5 mb-6'>
					<button
						onClick={onChange}
						type='button'
						id='offer'
						value={true}
						className={`px-7 py-3 font-medium text-sm uppercase shadow-md hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full rounded ${
							!offer ? 'bg-white text-black' : 'bg-slate-600 text-white'
						}`}>
						Yes
					</button>
					<button
						onClick={onChange}
						type='button'
						id='offer'
						value={false}
						className={`px-7 py-3 font-medium text-sm uppercase shadow-md hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full rounded ${
							offer ? 'bg-white text-black' : 'bg-slate-600 text-white'
						}`}>
						No
					</button>
				</div>
				{/* Price  */}
				<div className='mb-6'>
					<p className='text-lg font-semibold'>Regular Price</p>
					<div className='w-full'>
						<div className='w-full flex justify-center items-center gap-x-5'>
							<input
								onChange={onChange}
								type='number'
								id='regularPrice'
								value={regularPrice}
								min='50'
								max='400000000'
								required
								className='px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded focus:text-gray-700 focus:bg-white focus:border-slate-600 text-center w-full'
							/>
							{type === 'rent' && (
								<p className='text-xl w-full whitespace-nowrap px-4 py-2 bg-white'>
									$ / Month
								</p>
							)}
						</div>
					</div>
				</div>
				{/* Discounted Price */}
				{offer && (
					<div className='mb-6'>
						<p className='text-lg font-semibold'>Discounted Price</p>
						<div className='w-full'>
							<div className='w-full flex justify-center items-center gap-x-5'>
								<input
									onChange={onChange}
									type='number'
									id='discountedPrice'
									value={discountedPrice}
									min='50'
									max='400000000'
									required={offer}
									className='px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded focus:text-gray-700 focus:bg-white focus:border-slate-600 text-center w-full'
								/>
								{type === 'rent' && (
									<p className='text-xl w-full whitespace-nowrap px-4 py-2 bg-white'>
										$ / Month
									</p>
								)}
							</div>
						</div>
					</div>
				)}
				{/* Images Upload */}
				<div className='mb-6'>
					<p className='text-lg font-semibold'>Images</p>
					<p className='text-gray-600'>
						The first image will be the cover (max 6)
					</p>
					<input
						type='file'
						id='images'
						onChange={onChange}
						accept='.jpg,.png,.jpeg'
						multiple
						required
						className='w-full px-3 py-1.5 text-gray-700 bg-white border border-gray-300 rounded focus:border-none focus:outline-none active:border-none active:outline-none'
					/>
				</div>
				<button
					type='submit'
					className='mb-6 w-full px-7 py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm uppercase font-medium rounded shadow-md hover:shadow-lg tracking-wider'>
					Edit
				</button>
			</form>
		</main>
	);
};

export default EditItem;
