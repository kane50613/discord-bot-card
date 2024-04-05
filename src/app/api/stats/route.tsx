import { getApplication, getUser } from "@/utils/api";
import { getFont } from "@/utils/font";
import { convertSnowflakeToDate } from "@/utils/snowflake";
import removeMarkdown from "remove-markdown";
import satori from "satori";

export const runtime = "edge";

const formatter = new Intl.NumberFormat();

const dateFormater = new Intl.DateTimeFormat("zh-TW", {
  dateStyle: "short",
});

export async function GET(request: Request) {
  const [inter, noto, notoBold] = await Promise.all([
    getFont(request, "/Inter-Bold.woff"),
    getFont(request, "/NotoSansCJKtc-Medium.woff"),
    getFont(request, "/NotoSansCJKtc-Bold.woff"),
  ]);

  const { approximateGuildCount, description } = await getApplication();
  const { id, avatar, globalName, username } = await getUser();

  const guilds = approximateGuildCount || 0;

  const label = description
    ? removeMarkdown(description).split("\n")[0]
    : dateFormater.format(convertSnowflakeToDate(id));

  const image = await satori(
    <div
      lang="zh-TW"
      style={{
        background: "linear-gradient(135deg, #3a3f5c, #202332)",
        borderRadius: 7,
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
          src={
            avatar
              ? `https://cdn.discordapp.com/avatars/${id}/${avatar}.png?size=128`
              : "https://yeecord.com/img/logo.png"
          }
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
            alignContent: "space-between",
          }}
        >
          <span
            style={{
              fontSize: 24,
              fontWeight: 700,
            }}
          >
            {globalName || username}
          </span>
          <span>{label}</span>
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
            fontFamily: "Inter",
            fontSize: 36,
            fontWeight: 700,
            backgroundImage: "linear-gradient(45deg, #f35e5e, #ae4edf)",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          {formatter.format(guilds)}
        </span>
        <span
          style={{
            paddingBottom: 4,
            fontSize: 20,
          }}
        >
          個伺服器
        </span>
      </div>
    </div>,
    {
      width: 480,
      height: 180,
      fonts: [
        {
          name: "Noto Sans TC",
          weight: 500,
          data: noto,
          style: "normal",
        },
        {
          name: "Noto Sans TC",
          weight: 700,
          data: notoBold,
          style: "normal",
        },
        {
          name: "Inter",
          data: inter,
          style: "normal",
          weight: 700,
        },
      ],
    },
  );

  return new Response(image, {
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "public, immutable, no-transform, max-age=60",
    },
  });
}
