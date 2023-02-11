import { useState } from 'react';

const CreateListing = () => {
	const [formData, setFormData] = useState({
		type: 'rent',
		name: '',
		bedrooms: 1,
		bathrooms: 1,
		parking: false,
		furnished: false,
		address: '',
		discription: '',
		offer: false,
		regularPrice: 0,
		discountedPrice: 0,
	});
	const {
		type,
		name,
		bedrooms,
		bathrooms,
		parking,
		furnished,
		address,
		discription,
		offer,
		regularPrice,
		discountedPrice,
	} = formData;
	return (
		<main className='max-w-md mx-auto px-2'>
			<h1 className='text-3xl text-center my-6 font-bold'>Add your home</h1>
			<form className=''>
				{/* RENT AND SELL */}
				<p className='text-lg font-semibold mb-2'>Sell / Rednt</p>
				<div className='flex gap-x-5'>
					<button
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
						type='button'
						id='type'
						value={'sale'}
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
					type='text'
					id='address'
					value={address}
					placeholder='Address'
					required
					className='w-full px-4 py-2 text-xl text-gray-700 border border-gray-300 rounded focus:text-gray-700 focus:bg-white focus:border-slate-600 mb-6 resize-none'
				/>
				{/* Discription */}
				<p className='text-lg font-semibold'>Discription</p>
				<textarea
					type='text'
					id='discription'
					value={discription}
					placeholder='Discription'
					required
					className='w-full px-4 py-2 text-xl text-gray-700 border border-gray-300 rounded focus:text-gray-700 focus:bg-white focus:border-slate-600 mb-6 resize-none'
				/>
				{/* Offer */}
				<p className='text-lg font-semibold mb-2'>Offer</p>
				<div className='flex gap-x-5 mb-6'>
					<button
						type='button'
						id='offer'
						value={true}
						className={`px-7 py-3 font-medium text-sm uppercase shadow-md hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full rounded ${
							!offer ? 'bg-white text-black' : 'bg-slate-600 text-white'
						}`}>
						Yes
					</button>
					<button
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
					<p className='text-lg font-semibold'>Regular price</p>
					<div className='w-full'>
						<div className='w-full flex justify-center items-center gap-x-5'>
							<input
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
						<p className='text-lg font-semibold'>Regular price</p>
						<div className='w-full'>
							<div className='w-full flex justify-center items-center gap-x-5'>
								<input
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
						accept='.jpg,.png,.jpeg'
						multiple
						required
						className='w-full px-3 py-1.5 text-gray-700 bg-white border border-gray-300 rounded focus:border-none focus:outline-none active:border-none active:outline-none'
					/>
				</div>
				<button
					type='submit'
					className='mb-6 w-full px-7 py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm uppercase font-medium rounded shadow-md hover:shadow-lg '>
					Add
				</button>
			</form>
		</main>
	);
};

export default CreateListing;
