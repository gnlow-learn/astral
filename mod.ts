import { launch } from "jsr:@astral/astral@0.5.3"

await using browser = await launch()

await using page = await browser.newPage("https://deno.land")

const dimension = {
    width: 640,
    height: 360,
}

page.setViewportSize(dimension)

const screenshot = await page.screenshot()
await Deno.writeFile("temp/a.png", screenshot)
