import { ImageResponse } from "@vercel/og";
import { get } from "@vercel/edge-config";

export const config = {
	runtime: "edge",
};

const formatter = new Intl.NumberFormat();

const interPromise = fetch(
	new URL("../../assets/Inter-Bold.ttf", import.meta.url),
).then((r) => r.arrayBuffer());

export default async function () {
	const inter = await interPromise;

	const guilds = process.env.EDGE_CONFIG ? await get("guilds") : 123456;

	return new ImageResponse(
		(
			<div
				lang="zh-TW"
				style={{
					fontFamily: "noto",
					background: "linear-gradient(135deg, #3a3f5c, #202332)",
					borderRadius: 5,
					color: "white",
					width: "100%",
					height: "100%",
					display: "flex",
					textAlign: "center",
					padding: 16,
					flexDirection: "column",
					gap: 16,
				}}
			>
				<div
					style={{
						display: "flex",
						gap: 16,
					}}
				>
					<img
						alt="Logo"
						src="https://yeecord.com/img/logo.png"
						width={56}
						height={56}
						style={{
							borderRadius: 50,
						}}
					/>
					<div
						style={{
							display: "flex",
							flexDirection: "column",
						}}
					>
						<span
							style={{
								fontSize: 24,
								fontWeight: 700,
							}}
						>
							YEE式機器龍#9027
						</span>
						<span
							style={{
								color: "#c4c4c4",
							}}
						>
							萬中選一的 Discord 機器人
						</span>
					</div>
				</div>
				<span>正在服務</span>
				<div
					style={{
						display: "flex",
						alignItems: "flex-end",
						gap: 16,
						marginTop: 8,
					}}
				>
					<span
						style={{
							fontSize: 36,
							fontWeight: 700,
							backgroundImage:
								"linear-gradient(45deg, #f35e5e, #ae4edf)",
							backgroundClip: "text",
							color: "transparent",
						}}
					>
						{formatter.format(guilds)}
					</span>
					<span
						style={{
							paddingBottom: 4,
						}}
					>
						個伺服器
					</span>
				</div>
			</div>
		),
		{
			width: 480,
			height: 180,
			fonts: [
				{
					name: "Inter",
					data: inter,
					style: "normal",
					weight: 700,
				},
			],
			headers: {
				"content-type": "image/png",
				"cache-control": "public, immutable, no-transform, max-age=60",
			},
		},
	);
}
