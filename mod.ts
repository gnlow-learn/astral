import { launch } from "./src/deps.ts"
import { compare } from "./src/compare.ts"

await using browser = await launch()

await using page = await browser.newPage("https://deno.land")

const dimension = {
    width: 640,
    height: 360,
}

page.setViewportSize(dimension)

const screenshot = await page.screenshot()
// await Deno.writeFile("temp/a.png", screenshot)

console.log(
    await compare(
        screenshot,
        await Deno.readFile("temp/a.png"),
    )
)
