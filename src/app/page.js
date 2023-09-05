import Image from "next/image";
import SwapBoxBuy from "@/Components/SwapBoxBuy";
import SwapBoxSend from "@/Components/SwapBoxSend";
export default function Home() {
	return (
		<div className="flex items-center justify-center h-screen bg-gray-200">
			<div className="flex w-8/12 justify-between px-4">
				<SwapBoxBuy />
				<SwapBoxSend />
			</div>
		</div>
	);
}
