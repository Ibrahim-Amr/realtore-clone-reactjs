import { FcGoogle } from 'react-icons/fc';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth, db } from '../Firebase';
import { toast } from 'react-toastify';
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const OAuth = () => {
	let navigate = useNavigate();
	async function googleSignIn() {
		try {
			const provider = new GoogleAuthProvider();
			const userCredential = await signInWithPopup(auth, provider);
			const user = userCredential.user;
			// Check for user in db
			const docRef = doc(db, 'users', user.uid);
			const docSnap = await getDoc(docRef);

			if (!docSnap.exists()) {
				await setDoc(docRef, {
					name: user.displayName,
					email: user.email,
					timestamp: serverTimestamp(),
				});
			}
			navigate('/');
			toast.success(`Welcome ${user.displayName}`, {
				position: 'top-right',
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: 'light',
			});
		} catch (err) {
			toast.error('Could not authorize with Google', {
				position: 'top-right',
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: 'light',
			});
		}
	}
	return (
		<>
			<button
				onClick={googleSignIn}
				className='w-full flex items-center justify-center bg-red-600 hover:bg-red-700 active:bg-red-800 transition duration-150 ease-in-out text-white text-sm font-medium shadow-md hover:shadow-lg uppercase px-7 py-3 rounded-md'>
				<FcGoogle className='text-2xl bg-white rounded-full mr-2' />
				continue with google
			</button>
		</>
	);
};

export default OAuth;
