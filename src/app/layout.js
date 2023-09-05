"use client";
import "./globals.css";
// import { Inter } from "next/font/google";
import Navbar from "../Components/NavBar";
// const inter = Inter({ subsets: ["latin"] });
import { UM7Provider } from "../context/um7Context";
import {
	EthereumClient,
	w3mConnectors,
	w3mProvider,
} from "@web3modal/ethereum";
import { Web3Modal } from "@web3modal/react";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { polygon, sepolia, mainnet } from "wagmi/chains";
const chains = [polygon, sepolia, mainnet];
const projectId = "90bf105ef4aa4e1e16a2d0284385ed7a";

const { publicClient } = configureChains(chains, [w3mProvider({ projectId })]);
const wagmiConfig = createConfig({
	autoConnect: true,
	connectors: w3mConnectors({ projectId, chains }),
	publicClient,
});
const ethereumClient = new EthereumClient(wagmiConfig, chains);

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body >
				<WagmiConfig config={wagmiConfig}>
					<UM7Provider>
						<Navbar />
						{children}
					</UM7Provider>
				</WagmiConfig>
				<Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
			</body>
		</html>
	);
}
