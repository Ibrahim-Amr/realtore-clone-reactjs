import { RiWifiOffLine } from 'react-icons/ri';
const DetectOffline = () => {
	return (
		<>
			<div className='flex justify-start items-center gap-3 bg-red-300 w-fit px-3 py-3  border-gray-500 shadow-md fixed bottom-5 right-5'>
				<RiWifiOffLine className='bg-white h-12 w-12 text-3xl p-2 text-red-600 rounded-full ' />
				<div>
					<p className='text-black/75 font-semibold'>You're offline.</p>
					<p className='text-gray-700'>Sorry! internet is disconnected.</p>
				</div>
			</div>
		</>
	);
};

export default DetectOffline;
