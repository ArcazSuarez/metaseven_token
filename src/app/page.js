import SwapBoxBuy from "@/Components/SwapBoxBuy";
import SwapBoxSend from "@/Components/SwapBoxSend";
import SwapBoxSell from "@/Components/SwapBoxSell";
export default function Home() {
	return (
		<div className="flex items-center justify-center min-h-screen bg-[#16181d]">
			<div className="mx-auto p-4">
				<div className="flex flex-col sm:flex-row sm:justify-center gap-10">
					<div>
						<SwapBoxSend />
					</div>
				</div>
			</div>
		</div>
	);
}
