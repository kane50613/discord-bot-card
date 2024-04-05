## Discord Bot Card

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fkane50613%2Fdiscord-bot-card&env=BOT_TOKEN&demo-title=Yeecord%20Card&demo-url=http%3A%2F%2Fcard.yeecord.com%2Fapi%2Fcard)

Show your discord bot stats on your website as a svg card, the data is fetched from discord API, and the card is generated with [satori](https://github.com/vercel/satori) on the fly.

![Discord Bot Card](https://card.yeecord.com/)

## Usage

1. Deploy this repository to Vercel by clicking the button above
2. Add `BOT_TOKEN` to the environment variables
3. Head to `https://your-vercel-url/api/card` to get the card

## Endpoints

- `/api/card` - Get the card in svg format
- `/api/card.jpeg` - Get the card in jpeg format
- `/api/card.webp` - Get the card in webp format
