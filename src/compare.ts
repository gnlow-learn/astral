import pixelmatch from "https://esm.sh/pixelmatch@7.1.0"
import sharp from "npm:sharp@0.34.3"
import { PNG } from "https://esm.sh/pngjs@7.0.0"

const process =
(img: sharp.Sharp) =>
    img.ensureAlpha().png().raw().toBuffer()

export const compare =
async (
    a0: Uint8Array<ArrayBufferLike>,
    b0: Uint8Array<ArrayBufferLike>,
    option?: Parameters<typeof pixelmatch>[5],
) => {
    const a = await process(sharp(a0))
    const { width, height } = await sharp(a0).metadata()

    const b = await process(sharp(b0)
        .resize(width, height, { fit: "fill" })
    )

    const diff = new PNG({ width, height })
    
    const count = pixelmatch(
        a,
        b,
        diff.data,
        width,
        height,
        option,
    )

    return {
        diff: PNG.sync.write(diff),
        count,
    }
}
