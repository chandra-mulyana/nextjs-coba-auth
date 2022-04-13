import { getSession } from "next-auth/react";
import Link from "next/link";

function HalamanBelakang() {
	return (
		<>
			<h1>Halaman Belakang</h1>
			<Link href="/" passHref>
				<button>Ke Halaman Depan</button>
			</Link>
		</>
	);
}

// Pemeriksaan dilakukan di Server Side.
// Dengan seperti ini, jika user not authenticated
// Maka tidak akan render halaman ini, ini lebih efisien
export async function getServerSideProps(context) {
	// session bernilai NULL jika user not authenticated
	const session = await getSession({ req: context.req });

	// jika bernilai NULL, redirect ke halaman login
	if (!session) {
		return {
			redirect: {
				destination: "/auth/login",
				permanent: false,
			},
		};
	}

	return {
		props: { session },
	};
}

export default HalamanBelakang;
