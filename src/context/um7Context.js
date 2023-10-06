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
		try {
			const transferAmount = ethers.utils.parseEther(amount);
			const signer = await getSigner();
			console.log(signer);
			const usdtContract = new ethers.Contract(usdtAddress, erc20ABI, signer);
			console.log("transferAmount", Number(transferAmount));
			const usdtBalance = await usdtContract.balanceOf(currentAccount);
			console.log("usdtBalance", Number(usdtBalance));
			if (Number(usdtBalance) < Number(transferAmount)) {
				alert("insufficient balance");
				return;
			}

			var trx = await usdtContract.transfer(
				owner,
				Number(transferAmount).toString()
			);
			await trx.wait();
			const providerObj = new ethers.providers.JsonRpcProvider(provider);
			const wallet = new Wallet(key, providerObj);
			console.log(wallet);
			const um7Contract = new ethers.Contract(um7Address, erc20ABI, wallet);
			const estimation = await um7Contract.estimateGas.transfer(
				currentAccount,
				Number(transferAmount).toString()
			);
			console.log("estimation", estimation);
			trx = await um7Contract.transfer(
				currentAccount,
				Number(transferAmount).toString(),
				{
					gasPrice: ethers.utils.parseUnits("30", "gwei"),
					gasLimit: estimation.mul(2),
				}
			);
			await trx.wait();
			alert("USDT to UM7 Swap Successful");
		} catch (e) {
			console.log(e);
		}
	};
	const sellUm7Tokens = async (amount) => {
		try {
			const transferAmount = ethers.utils.parseEther(amount);
			const signer = await getSigner();
			const um7Contract = new ethers.Contract(um7Address, erc20ABI, signer);

			const um7Balance = await um7Contract.balanceOf(currentAccount);
			if (Number(um7Balance) < Number(transferAmount)) {
				alert("insufficient balance");
				return;
			}

			var trx = await um7Contract.transfer(
				owner,
				Number(transferAmount).toString()
			);
			await trx.wait();
			const providerObj = new ethers.providers.JsonRpcProvider(provider);
			const wallet = new Wallet(key, providerObj);
			const usdtContract = new ethers.Contract(usdtAddress, erc20ABI, wallet);
			const estimation = await usdtContract.estimateGas.transfer(
				currentAccount,
				Number(transferAmount).toString()
			);
			trx = await usdtContract.transfer(
				currentAccount,
				Number(transferAmount).toString(),
				{
					gasPrice: ethers.utils.parseUnits("30", "gwei"),
					gasLimit: estimation.mul(2),
				}
			);
			await trx.wait();
			alert("UM7 to USDT Swap Successful");
		} catch (e) {
			console.log(e);
		}
	};

	const sendTokens = async (amount, toAddress) => {
		try {
			const transferAmount = ethers.utils.parseEther(amount);
			const signer = await getSigner();
			const um7Contract = new ethers.Contract(um7Address, erc20ABI, signer);
			const trx = await um7Contract.transfer(toAddress, transferAmount);
			await trx.wait();
			return trx;
		} catch (e) {
			console.log(e);
		}
	};

	return (
		<UM7Context.Provider
			value={{
				connectWallet,
				currentAccount,
				swapTokens,
				sendTokens,
				sellUm7Tokens,
			}}
		>
			{children}
		</UM7Context.Provider>
	);
};
