"use client";
import React, { useContext } from "react";
import Link from "next/link";
import { UM7Context } from "@/context/um7Context";

const Navbar = () => {
	const { connectWallet, currentAccount } = useContext(UM7Context);

	return (
		<div className="bg-gray-100 flex flex-col">
			<header className="bg-blue-500 text-white p-4 flex justify-between items-center">
				<div className="text-2xl font-bold">
					<Link href={"/"}>UM7</Link>
				</div>
				{currentAccount && (
					<div className="flex items-center gap-2">
						<div className="hidden md:block">Account:</div>
						<div className="text-sm md:text-base">
							{currentAccount.slice(0, 6) + "..."}
						</div>
					</div>
				)}
				{currentAccount ? (
					<button
						className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
						onClick={connectWallet}
					>
						Connected
					</button>
				) : (
					<button
						className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
						onClick={connectWallet}
					>
						Connect Wallet
					</button>
				)}
			</header>
		</div>
	);
};

export default Navbar;
