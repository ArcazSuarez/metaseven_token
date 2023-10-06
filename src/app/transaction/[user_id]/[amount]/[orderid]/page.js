"use client";
import SwapBoxBuy from "@/Components/SwapBoxBuy";
import SwapBoxSend from "@/Components/SwapBoxSend";
import SwapBoxSell from "@/Components/SwapBoxSell";
export default function Transaction({ params }) {
	const { user_id, amount, orderid } = params;
	return (
		<div className="grid grid-cols-1 mx-auto sm:grid-cols-3 items-center justify-center h-screen bg-gray-200">
			<SwapBoxBuy user_id={user_id} amount={amount} orderid={orderid} />
			<SwapBoxSell user_id={user_id} amount={amount} orderid={orderid} />
			<SwapBoxSend user_id={user_id} amount={amount} orderid={orderid} />
		</div>
	);
}
