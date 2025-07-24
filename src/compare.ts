import pixelmatch from "https://esm.sh/pixelmatch@7.1.0"
import sharp from "npm:sharp@0.34.3"

const process =
(buf: Uint8Array<ArrayBufferLike>) =>
    sharp(buf).ensureAlpha().png().raw().toBuffer()

export const compare =
async (
    a0: Uint8Array<ArrayBufferLike>,
    b0: Uint8Array<ArrayBufferLike>,
    option?: Parameters<typeof pixelmatch>[5],
) => {
    const { width, height } = await sharp(a0).metadata()
    return pixelmatch(
        await process(a0),
        await process(b0),
        void 0,
        width,
        height,
        option,
    )
}
