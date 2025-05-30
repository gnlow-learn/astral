import { launch } from "jsr:@astral/astral@0.5.3"

await using browser = await launch()

await using page = await browser.newPage("https://deno.land")

const screenshot = await page.screenshot()
await Deno.writeFile("temp/a.png", screenshot)
