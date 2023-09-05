"use client";
import React, { useContext } from "react";
import Link from "next/link";
import { UM7Context } from "@/context/um7Context";

const Navbar = () => {
	const { connectWallet, currentAccount } = useContext(UM7Context);
	
	return (
		<header className="flex justify-between items-center">
			<nav className="text-left">
				<Link href={"/"}>
					<h4 className="text-2xl font-bold">UM7 Buy and Send</h4>
				</Link>
			</nav>
			{currentAccount && (
				<div className="flex items-center gap-2">
					<div className="text-green-600">Account:</div>
					<div className="text-green-600">{currentAccount}</div>
				</div>
			)}
			{!currentAccount && (
				<button
					className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
					onClick={connectWallet}
				>
					Connect Wallet
				</button>
			)}
			{currentAccount && (
				<button
					className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
					onClick={connectWallet}
				>
					Connected
				</button>
			)}
		</header>
	);
};

export default Navbar;
