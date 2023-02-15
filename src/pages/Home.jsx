import HomeCategorySection from '../components/HomeCategorySection';
import HomeSlider from '../components/HomeSlider';

const Home = () => {
	return (
		<>
			<HomeSlider />
			<HomeCategorySection
				title={'Recent Offers'}
				subTitle={'Show more offers'}
				type={'offer'}
				value={true}
			/>
			<HomeCategorySection
				title={'Places for rent'}
				subTitle={'Show more places for rent'}
				type={'type'}
				value={'rent'}
			/>
			<HomeCategorySection
				title={'Places for sale'}
				subTitle={'Show more places for sale'}
				type={'type'}
				value={'sale'}
			/>
		</>
	);
};

export default Home;
