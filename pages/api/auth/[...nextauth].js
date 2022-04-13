import NextAuth from "next-auth/next";
import CredentialProvider from "next-auth/providers/credentials";

export default NextAuth({
	providers: [
		CredentialProvider({
			name: "credentials",
			credentials: {
				username: {
					label: "User Name",
					type: "text",
					placeholder: "Isi alamat Email",
				},
				password: { label: "Password", type: "password" },
			},
			authorize: (credentials) => {
				// disini nanti dimasukan pencarian ke database, untuk sementara di hardcode
				if (
					credentials.username === "admin" &&
					credentials.password === "test"
				) {
					return {
						name: "Wakanda",
						email: "wakanda@test.com",
					};
				}

				// Jika login nya gagal
				return null;
			},
		}),
	],
	callback: {
		jwt: ({ token, user }) => {
			// first time jwt call back is run, user object is available
			if (user) {
				token.id = user.id;
			}
			return token;
		},
		session: ({ session, token }) => {
			if (token) {
				session.id = token.id;
			}
			return session;
		},
	},
	secret: "konci",
	jwt: {
		secret: "konci",
		encryption: true,
	},
});
