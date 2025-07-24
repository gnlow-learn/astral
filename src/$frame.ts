import { ElementHandle, Page } from "../src/deps.ts"

export const $frame =
(selector: string) =>
(page: Page) => {
    const celestial = page.unsafelyGetCelestialBindings()

    return celestial.DOM.getDocument({ depth: 0 })
        .then(doc => celestial.DOM.querySelector({
            nodeId: doc.root.nodeId,
            selector,
        }))
        .then(node => celestial.DOM.describeNode({ nodeId: node.nodeId }))
        .then(desc => celestial.DOM.resolveNode({
            backendNodeId: desc.node.contentDocument!.backendNodeId,
        }))
        .then(obj => celestial.DOM.requestNode({ objectId: obj.object.objectId! }))
        .then(doc => new ElementHandle(doc.nodeId, celestial, page))
}
