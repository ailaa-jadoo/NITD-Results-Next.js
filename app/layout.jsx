import '@mantine/core/styles.css';
import "@/styles/globals.css";
import { fontSans } from "@/config/fonts";
import { Providers } from "./providers";
import clsx from "clsx";
import { MantineProvider, ColorSchemeScript } from '@mantine/core';

export const metadata = {
	title: {
		default: "Search",
	},
};

export default function RootLayout({ children }) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head>
			<ColorSchemeScript />
			<meta
				name="viewport"
				content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
			/>
			</head>
			<body
				className={clsx(
					"min-h-screen bg-background font-sans antialiased",
					fontSans.variable
				)}
			>
				<Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
					{/* <main className="container mx-auto max-w-7xl pt-16 px-6 flex-grow"> */}
					<MantineProvider defaultColorScheme='dark'>
						{children}
					</MantineProvider>
					{/* </main> */}
				</Providers>
			</body>
		</html>
	);
}
