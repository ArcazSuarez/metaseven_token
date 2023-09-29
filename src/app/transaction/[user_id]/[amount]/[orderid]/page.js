"use client";
import SwapBoxBuy from "@/Components/SwapBoxBuy";
import SwapBoxSend from "@/Components/SwapBoxSend";
export default function Transaction({ params }) {
	const { user_id, amount, orderid } = params;
	return (
		<div className="flex items-center justify-center h-screen bg-gray-200">
			<div className="flex w-8/12 justify-between px-4">
				<SwapBoxBuy user_id={user_id} amount={amount} orderid={orderid} />
				<SwapBoxSend user_id={user_id} amount={amount} orderid={orderid} />
			</div>
		</div>
	);
}
