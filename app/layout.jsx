import "@/styles/globals.css";
import { fontSans } from "@/config/fonts";
import { Providers } from "./providers";
import { Link } from "@nextui-org/link";
import clsx from "clsx";

export const metadata = {
	title: {
		default: "Search",
	},
};

export const revalidate = 3600

export default function RootLayout({ children }) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head />
			<body
				className={clsx(
					"min-h-screen bg-background font-sans antialiased",
					fontSans.variable
				)}
			>
				<Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
					{/* <main className="container mx-auto max-w-7xl pt-16 px-6 flex-grow"> */}
					{children}
					{/* </main> */}
				</Providers>
			</body>
		</html>
	);
}
