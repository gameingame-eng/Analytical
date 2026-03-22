import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import { useFrappeAuth } from 'frappe-react-sdk';
import {
	Card,
	CardHeader,
	CardTitle,
	CardContent,
	Tabs,
	TabsList,
	TabsTrigger,
	TabsContent,
} from '@frappe-ui-react-starter/design-system';
import User from './pages/user';

const AuthScreen = ({ isSubmitting, error, onSubmit }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleSubmit = async (event) => {
		event.preventDefault();
		await onSubmit(email, password);
	};

	return (
		<main className="min-h-screen bg-slate-950 px-6 py-12 text-slate-50">
			<div className="mx-auto flex w-full max-w-5xl flex-col gap-10 lg:flex-row lg:items-center">
				<section className="flex-1 space-y-5">
					<p className="text-sm uppercase tracking-[0.28em] text-cyan-300">
						Analytical
					</p>
					<h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
						Sign in with your Frappe account to open the dashboard workspace.
					</h1>
					<p className="max-w-xl text-base text-slate-300 sm:text-lg">
						This frontend uses the real Frappe session. Enter the email and
						password for an existing account on the site to continue.
					</p>
				</section>

				<section className="w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900/90 p-8 shadow-2xl shadow-slate-950/40">
					<form className="space-y-5" onSubmit={handleSubmit}>
						<div className="space-y-2">
							<label className="text-sm font-medium text-slate-200" htmlFor="email">
								Email
							</label>
							<input
								id="email"
								type="email"
								value={email}
								onChange={(event) => setEmail(event.target.value)}
								className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-50 outline-none transition focus:border-cyan-400"
								autoComplete="email"
								required
							/>
						</div>

						<div className="space-y-2">
							<label className="text-sm font-medium text-slate-200" htmlFor="password">
								Password
							</label>
							<input
								id="password"
								type="password"
								value={password}
								onChange={(event) => setPassword(event.target.value)}
								className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-50 outline-none transition focus:border-cyan-400"
								autoComplete="current-password"
								required
							/>
						</div>

						{error ? (
							<p className="rounded-xl border border-rose-500/40 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
								{error}
							</p>
						) : null}

						<button
							type="submit"
							className="w-full rounded-xl bg-cyan-400 px-4 py-3 font-medium text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:bg-cyan-400/60"
							disabled={isSubmitting}
						>
							{isSubmitting ? 'Signing in...' : 'Sign in'}
						</button>
					</form>
				</section>
			</div>
		</main>
	);
};

function App() {
	const { currentUser, isLoading, login, logout, getUserCookie } = useFrappeAuth();
	const [loginError, setLoginError] = useState('');
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleLogin = async (email, password) => {
		setLoginError('');
		setIsSubmitting(true);

		try {
			await login(email, password);
		} catch (error) {
			setLoginError(
				error?.message || 'Sign in failed. Check your Frappe email and password.'
			);
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleAuthError = async () => {
		await getUserCookie();
		setLoginError('Your session expired. Sign in again to continue.');
	};

	if (isLoading) {
		return (
			<main className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-slate-50">
				<p className="text-base text-slate-300">Checking session...</p>
			</main>
		);
	}

	if (!currentUser) {
		return (
			<AuthScreen
				isSubmitting={isSubmitting}
				error={loginError}
				onSubmit={handleLogin}
			/>
		);
	}

	return (
		<main className="max-w-7xl m-auto min-h-screen flex flex-col items-center gap-8 p-8">
			<header className="flex w-full flex-col items-center gap-8">
				<div className="flex w-full max-w-4xl items-center justify-between rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
					<div>
						<p className="text-xs uppercase tracking-[0.2em] text-slate-500">
							Signed in as
						</p>
						<p className="text-sm font-medium text-slate-900">{currentUser}</p>
					</div>
					<button
						type="button"
						onClick={logout}
						className="rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:text-slate-950"
					>
						Log out
					</button>
				</div>
				<div className="flex gap-5">
					<a href="https://vite.dev" target="_blank">
						<img
							src={viteLogo}
							className="logo h-16 w-16"
							alt="Vite logo"
						/>
					</a>
					<a href="https://react.dev" target="_blank">
						<img
							src={reactLogo}
							className="logo react h-16 w-16"
							alt="React logo"
						/>
					</a>
				</div>
				<h1 className="text-4xl font-bold">Frappe UI React Starter</h1>
			</header>

			<section className="w-full max-w-4xl">
				<h2 className="text-2xl font-semibold mb-4 text-center">
					Component Demos
				</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
					<Card className="w-full">
						<CardHeader>
							<CardTitle>Card Component</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="text-gray-600">
								This is a demo of the Card component from our
								design system. It includes a header, title, and
								content area.
							</p>
						</CardContent>
					</Card>

					<Card className="w-full">
						<CardHeader>
							<CardTitle>Tabs Component</CardTitle>
						</CardHeader>
						<CardContent showTestButton={false}>
							<Tabs defaultValue="tab1" className="w-full">
								<TabsList>
									<TabsTrigger value="tab1">
										Features
									</TabsTrigger>
									<TabsTrigger value="tab2">
										Getting Started
									</TabsTrigger>
									<TabsTrigger value="tab3">
										About
									</TabsTrigger>
								</TabsList>
								<TabsContent value="tab1">
									<p className="text-gray-600">
										Lorem ipsum dolor sit amet, consectetur
										adipiscing elit. Sed do eiusmod tempor
										incididunt.
									</p>
								</TabsContent>
								<TabsContent value="tab2">
									<p className="text-gray-600">
										Ut enim ad minim veniam, quis nostrud
										exercitation ullamco laboris nisi ut
										aliquip ex ea commodo consequat.
									</p>
								</TabsContent>
								<TabsContent value="tab3">
									<p className="text-gray-600">
										Duis aute irure dolor in reprehenderit
										in voluptate velit esse cillum dolore eu
										fugiat nulla pariatur.
									</p>
								</TabsContent>
							</Tabs>
						</CardContent>
					</Card>
				</div>
			</section>

			<section className="w-full max-w-4xl">
				<h2 className="text-2xl font-semibold mb-4 text-center">
					User Page Demo
				</h2>
				<User onAuthError={handleAuthError} />
			</section>
		</main>
	);
}

export default App;
