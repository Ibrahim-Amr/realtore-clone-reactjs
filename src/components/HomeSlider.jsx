import { Swiper } from 'swiper/react';
import { SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css/bundle';
// import required modules
import { Autoplay, Navigation, Pagination, EffectFade } from 'swiper';
import { useEffect, useState } from 'react';
import { collection, getDocs, limit, orderBy, query } from 'firebase/firestore';
import { db } from '../Firebase';
import Spinner from './Spinner';
import { useNavigate } from 'react-router-dom';

const HomeSlider = () => {
	const navigate = useNavigate();
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		async function fetchData() {
			const docRef = collection(db, 'listings');
			const q = query(docRef, orderBy('timestamp', 'desc'), limit(5));
			const querySnap = await getDocs(q);
			let data = [];
			querySnap.forEach((doc) => {
				return data.push({
					id: doc.id,
					data: doc.data(),
				});
			});
			setData(data);
			setLoading(false);
		}
		fetchData();
	}, []);

	if (loading) {
		return <Spinner />;
	}
	if (data.lenght === 0) {
		return <Spinner />;
	}
	return (
		<>
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
				{data.map(({ data, id }) => (
					<SwiperSlide key={id} onClick={() => navigate(`/category/${data.type}/${id}`)}>
						<div className='relative w-full overflow-hidden h-[350px] cursor-pointer'>
							<img
								src={data.imgUrls[0]}
								alt={data.name}
								title={data.name}
								loading='lazy'
								className='object-cover w-full h-full relative'
							/>
						</div>
						<p className='text-[#f1faee] absolute top-3 left-3 font-medium max-w-[90%] bg-[#457b9d] shadow-lg opacity-90 p-2 rounded-br-2xl'>
							{data.name}
						</p>
						<p className='text-[#f1faee] absolute bottom-3 left-3 font-semibold max-w-[90%] bg-[#e64946] shadow-lg opacity-90 p-2 rounded-tr-2xl'>
							${data.discountedPrice ?? data.regularPrice}
							{data.type === 'rent' && ' / Month'}
						</p>
					</SwiperSlide>
				))}
			</Swiper>
		</>
	);
};

export default HomeSlider;
