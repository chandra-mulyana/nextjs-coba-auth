import { useRef } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

function Login() {
	const userNameInputRef = useRef();
	const passwordInputRef = useRef();
	const router = useRouter();

	async function submitHandler(event) {
		event.preventDefault();

		const enteredUserName = userNameInputRef.current.value;
		const enteredPassword = passwordInputRef.current.value;

		console.log(enteredUserName);
		console.log(enteredPassword);
		// provider nya : credentials
		const result = await signIn("credentials", {
			redirect: false,
			username: enteredUserName,
			password: enteredPassword,
		});
		console.log(result);

		if (!result.error) {
			router.replace("/");
		} else {
			alert("user atau password salah");
		}
	}

	return (
		<section>
			<h1>Login Page</h1>
			<form onSubmit={submitHandler}>
				<div>
					<label htmlFor="username">User Name</label>
					<input
						type="text"
						id="username"
						required
						ref={userNameInputRef}
					/>
				</div>
				<div>
					<label htmlFor="password">Password</label>
					<input
						type="password"
						id="password"
						required
						ref={passwordInputRef}
					/>
				</div>
				<div>
					<button>Login</button>
				</div>
			</form>
		</section>
	);
}

export default Login;
