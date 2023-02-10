import { FcGoogle } from 'react-icons/fc';

const OAuth = () => {
	return (
		<>
			<button className='w-full flex items-center justify-center bg-red-600 hover:bg-red-700 active:bg-red-800 transition duration-150 ease-in-out text-white text-sm font-medium shadow-md hover:shadow-lg uppercase px-7 py-3 rounded-md'>
				<FcGoogle className='text-2xl bg-white rounded-full mr-2' />
				continue with google
			</button>
		</>
	);
};

export default OAuth;
