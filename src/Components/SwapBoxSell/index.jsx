"use client";
import React, { useState, useContext } from "react";
import { UM7Context } from "@/context/um7Context";
const SwapBoxSell = ({ user_id, amount }) => {
	const [fromValue, setFromValue] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const { sellUm7Tokens } = useContext(UM7Context);

	 // Update your sellUm7Tokens call to handle loading
	 const handleSellTokens = async (value) => {
        setIsLoading(true); // Start loading
        await sellUm7Tokens(value);
        setIsLoading(false); // End loading
    };

	return (
		<div className="bg-white rounded-lg p-4 shadow-md mb-10 flex items-center justify-center">
			{/* Loading screen overlay */}
            {isLoading && (
                <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-10">
                    <div className="text-white">Processing...</div>
                </div>
            )}
			<div>
				<div className="text-lg flex items-center font-bold mb-4 text-gray-600">
					Sell
				</div>
				<div className="flex flex-col gap-4">
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-2">
							<div className="text-gray-600">UM7</div>
							<input
								type="number"
								placeholder="0.0"
								className="w-full px-2 py-1 rounded text-gray-600 border border-green-300 focus:border-blue-500"
								value={fromValue}
								onChange={(e) => setFromValue(e.target.value)}
							/>
						</div>
					</div>

					<div className="flex items-center justify-between">
						<div className="flex items-center gap-2">
							<div className="text-gray-600">USDT</div>
							<input
								type="number"
								placeholder="0.0"
								className="w-full px-2 py-1 text-gray-600 rounded border border-green-300 focus:border-blue-500"
								value={fromValue}
								onChange={(e) => setFromValue(e.target.value)}
							/>
						</div>
					</div>
				</div>
				<button
					className="w-full mt-4 py-2 bg-[#ec9f15] text-white rounded"
					onClick={() => handleSellTokens(fromValue)}
				>
					Sell
				</button>
			</div>
		</div>
	);
};

export default SwapBoxSell;
