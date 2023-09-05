"use client";
import React, { useEffect, useState, useContext } from "react";
import { useWeb3Modal } from "@web3modal/react";
import { useAccount } from "wagmi";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import { erc20ABI } from "wagmi";
import { usdtAddress, um7Address, owner } from "./constants";
const { Wallet } = require("ethers");
const key = process.env.NEXT_PUBLIC_PRIVATE_KEY;
const provider = process.env.NEXT_PUBLIC_PROVIDER;
const getSigner = async () => {
	try {
		const web3Modal = new Web3Modal();
		const connection = await web3Modal.connect();
		const provider = new ethers.providers.Web3Provider(connection);
		const signer = provider.getSigner();
		return signer;
	} catch (error) {
		console.log("Something went wrong while connecting with contract", error);
	}
};

export const UM7Context = React.createContext();
export const UM7Provider = ({ children }) => {
	const { open } = useWeb3Modal();
	const { address, isConnected } = useAccount();
	const [currentAccount, setCurrentAccount] = useState("");

	const checkIfWalletConnected = async () => {
		try {
			if (isConnected) {
				setCurrentAccount(address.toLowerCase());
			} else {
				setCurrentAccount("");
			}
		} catch (error) {
			console.log("Something wrong while connecting to wallet");
		}
	};

	useEffect(() => {
		checkIfWalletConnected();
	}, [address]);

	useEffect(() => {
		if (!currentAccount) return;
	}, [currentAccount]);

	const connectWallet = async () => {
		try {
			await open();
		} catch (error) {
			console.log("Error while connecting to wallet");
		}
	};

	const swapTokens = async (amount) => {
		console.log("swapTokens");
		const transferAmount = ethers.utils.parseEther(amount);
		const signer = await getSigner();
		const usdtContract = new ethers.Contract(usdtAddress, erc20ABI, signer);

		const usdtBalance = await usdtContract.balanceOf(currentAccount);
		if (Number(usdtBalance) * 10 ** 12 < transferAmount) {
			alert("insufficient balance");
			return;
		}

		var trx = await usdtContract.transfer(owner, Number(amount) * 10 ** 6);
		await trx.wait();
		const providerObj = new ethers.providers.JsonRpcProvider(provider);
		const wallet = new Wallet(key, providerObj);
		const um7Contract = new ethers.Contract(um7Address, erc20ABI, wallet);
		trx = await um7Contract.transfer(currentAccount, transferAmount);
		await trx.wait();
		alert("Swap Successful");
	};

	const sendTokens = async (amount, toAddress) => {
		console.log("sendTokens");
		const transferAmount = ethers.utils.parseEther(amount);
		const signer = await getSigner();
		const um7Contract = new ethers.Contract(um7Address, erc20ABI, signer);
		const trx = await um7Contract.transfer(toAddress, transferAmount);
        console.log(trx);
		await trx.wait();
		return trx;
	};

	return (
		<UM7Context.Provider
			value={{ connectWallet, currentAccount, swapTokens, sendTokens }}
		>
			{children}
		</UM7Context.Provider>
	);
};
