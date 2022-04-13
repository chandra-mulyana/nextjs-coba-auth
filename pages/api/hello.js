import { getSession } from "next-auth/react";

export default async function handler(req, res) {
	// Ambil Session dulu untuk memeriksa apakah user authenticated?
	const session = await getSession({ req: req });
	console.log(session);

	if (!session) {
		res.status(401).json({ message: "Not authenticated!" });
		return;
	}

	res.status(200).json({ name: "John Doe" });
}
