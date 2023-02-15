import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../Firebase';
import Spinner from '../components/Spinner';
import { FaShare, FaMapMarkerAlt, FaBed, FaBath, FaParking, FaChair } from 'react-icons/fa';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css/bundle';
// import required modules
import { Autoplay, Navigation, Pagination, EffectFade } from 'swiper';
import { toast } from 'react-toastify';
import Contact from '../components/Contact';
// Leaflet
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

const Category = () => {
	const { id } = useParams();
	const [categoryData, setCategoryData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [contactLandLord, setContactLandLord] = useState(false);

	useEffect(() => {
		async function getData() {
			const docRef = doc(db, 'listings', id);
			const docSnap = await getDoc(docRef);
			if (docSnap.exists()) {
				setCategoryData(docSnap.data());
				setLoading(false);
			}
		}

		getData();
	}, [id]);

	if (loading) {
		return <Spinner />;
	}
	return (
		<>
			<main className='relative'>
				<Swiper
					slidesPerView={1}
					navigation={true}
					pagination={{
						type: 'progressbar',
					}}
					effect='fade'
					autoplay={{ delay: 3000 }}
					modules={[Pagination, Navigation, Autoplay, EffectFade]}
					className='mySwiper'>
					{categoryData.imgUrls.map((url, index) => (
						<SwiperSlide key={index}>
							<div className='relative w-full overflow-hidden h-[350px]'>
								<img
									src={url}
									alt=''
									loading='lazy'
									className='object-cover w-full h-full'
								/>
							</div>
						</SwiperSlide>
					))}
				</Swiper>
				<div
					onClick={() => {
						navigator.clipboard.writeText(window.location.href);
						toast.success('link copied', {
							autoClose: 500,
						});
					}}
					className='absolute top-[5%] right-[3%] cursor-pointer border-2 border-gray-400 bg-white rounded-full w-12 h-12 flex justify-center items-center z-10'>
					<FaShare className='text-lg text-slate-500' />
				</div>
				<div className='flex flex-col lg:flex-row max-w-6xl lg:mx-auto m-4 p-4 rounded-lg shadow-lg bg-white lg:space-x-5'>
					<div className='w-full min-h-[200px] lg:min-h-[400px] overflow-hidden'>
						{/* Title */}
						<p className='text-base  sm:text-2xl font-bold mb-3 text-blue-900'>
							{categoryData.name} - $
							{categoryData.offer
								? categoryData.discountedPrice
										.toString()
										.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
								: categoryData.regularPrice
										.toString()
										.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
							{categoryData.type === 'rent' && ' / Month'}
						</p>
						{/* Adress */}
						<div className='mb-6'>
							<p className='text-sm sm:text-base flex justify-start items-center font-semibold'>
								<FaMapMarkerAlt className='text-green-700 mr-1' />
								{categoryData.address}
							</p>
						</div>
						{/* Type / Discount */}
						<div className='flex justify-start items-center gap-4 w-[75%] mb-6'>
							<p className='capitalize bg-red-800 w-full max-w-[200px] rounded-md p-1 text-white text-center font-semibold shadow-md'>
								{categoryData.type}
							</p>
							{categoryData.offer && (
								<p className='bg-green-800 w-full max-w-[200px] rounded-md p-1 text-white text-center font-semibold shadow-md'>
									${+categoryData.regularPrice - +categoryData.discountedPrice} Discount
								</p>
							)}
						</div>
						{/* description */}
						<p className='font-semibold my-3 mb-6'>
							Description: <span className='font-normal  '>{categoryData.description}</span>
						</p>
						{/* Icons / details */}
						<ul className='flex items-center md:justify-center gap-3 lg:gap-10 text-sm sm:text-base font-semibold mb-6'>
							<li className='flex justify-start items-center gap-1 whitespace-nowrap '>
								<FaBed className='text-lg' />
								<span>
									{categoryData.bedrooms === '1'
										? `${categoryData.bedrooms} Bed`
										: `${categoryData.bedrooms} Beds`}
								</span>
							</li>
							<li className='flex justify-start items-center gap-1 whitespace-nowrap mr-1'>
								<FaBath className='text-lg' />
								<span>
									{categoryData.bathrooms === '1'
										? `${categoryData.bathrooms} Bath`
										: `${categoryData.bathrooms} Baths`}
								</span>
							</li>
							<li className='flex justify-start items-center gap-1 whitespace-nowrap mr-1'>
								<FaParking className='text-lg' />
								<span className='capitalize'>
									{categoryData.parking === true ? `Parking spot` : `No Parking`}
								</span>
							</li>
							<li className='flex justify-start items-center gap-1 whitespace-nowrap mr-1'>
								<FaChair className='text-lg' />
								<span className='capitalize'>
									{categoryData.furnished === true ? `furnished` : `No furnished `}
								</span>
							</li>
						</ul>
						{/* Form */}
						{contactLandLord && (
							<Contact userRef={categoryData.userRef} categoryData={categoryData} />
						)}

						{categoryData.userRef !== auth.currentUser.uid && !contactLandLord && (
							<div className='flex justify-center items-center'>
								<button
									className='px-7 py-3 bg-blue-600 text-white font-medium text-sm uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg flex-wrap transition duration-150 ease-in-out w-[60%] lg:w-[80%]'
									onClick={() => {
										setContactLandLord(true);
									}}>
									Contact Landlord
								</button>
							</div>
						)}
					</div>
					<div className='w-full h-[400px] lg:h-[450px] z-10 overflow-x-hidden mt-6'>
						<MapContainer
							center={[51.505, -0.09]}
							zoom={13}
							scrollWheelZoom={true}
							style={{ height: '100%', width: '100%' }}>
							<TileLayer
								attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
								url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
							/>
							<Marker position={[51.505, -0.09]}>
								<Popup>{categoryData.address}</Popup>
							</Marker>
						</MapContainer>
					</div>
				</div>
			</main>
		</>
	);
};

export default Category;
