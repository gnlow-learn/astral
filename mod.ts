import { launch } from "jsr:@astral/astral@0.5.3"
import pixelmatch from "https://esm.sh/pixelmatch@7.1.0"
import sharp from "npm:sharp@0.34.3"

await using browser = await launch()

await using page = await browser.newPage("https://deno.land")

const dimension = {
    width: 640,
    height: 360,
}

page.setViewportSize(dimension)

const screenshot = await page.screenshot()
// await Deno.writeFile("temp/a.png", screenshot)

const process =
(buf: Uint8Array<ArrayBufferLike>) =>
    sharp(buf).ensureAlpha().png().raw().toBuffer()

console.log(
    pixelmatch(
        await process(screenshot),
        await process(await Deno.readFile("temp/a.png")),
        void 0,
        640,
        360,
    )
)
