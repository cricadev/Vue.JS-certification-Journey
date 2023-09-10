import Node from '../nodes/node/Node.js';
import VoidElements from '../config/VoidElements.js';
import NodeTypeEnum from '../nodes/node/NodeTypeEnum.js';
import * as Entities from 'entities';
/**
 * Utility for converting an element to string.
 */
export default class XMLSerializer {
    /**
     * Constructor.
     *
     * @param [options] Options.
     * @param [options.includeShadowRoots] Include shadow roots.
     * @param [options.escapeEntities] Escape text.
     */
    constructor(options) {
        this._options = {
            includeShadowRoots: false,
            escapeEntities: true
        };
        if (options) {
            if (options.includeShadowRoots !== undefined) {
                this._options.includeShadowRoots = options.includeShadowRoots;
            }
            if (options.escapeEntities !== undefined) {
                this._options.escapeEntities = options.escapeEntities;
            }
        }
    }
    /**
     * Renders an element as HTML.
     *
     * @param root Root element.
     * @returns Result.
     */
    serializeToString(root) {
        switch (root.nodeType) {
            case NodeTypeEnum.elementNode:
                const element = root;
                const tagName = element.tagName.toLowerCase();
                if (VoidElements[element.tagName]) {
                    return `<${tagName}${this._getAttributes(element)}>`;
                }
                const childNodes = tagName === 'template'
                    ? root.content._childNodes
                    : root._childNodes;
                let innerHTML = '';
                for (const node of childNodes) {
                    innerHTML += this.serializeToString(node);
                }
                if (this._options.includeShadowRoots && element.shadowRoot) {
                    innerHTML += `<template shadowrootmode="${element.shadowRoot.mode}">`;
                    for (const node of element.shadowRoot._childNodes) {
                        innerHTML += this.serializeToString(node);
                    }
                    innerHTML += '</template>';
                }
                return `<${tagName}${this._getAttributes(element)}>${innerHTML}</${tagName}>`;
            case Node.DOCUMENT_FRAGMENT_NODE:
            case Node.DOCUMENT_NODE:
                let html = '';
                for (const node of root._childNodes) {
                    html += this.serializeToString(node);
                }
                return html;
            case NodeTypeEnum.commentNode:
                return `<!--${root.textContent}-->`;
            case NodeTypeEnum.processingInstructionNode:
                // TODO: Add support for processing instructions.
                return `<!--?${root.target} ${root.textContent}?-->`;
            case NodeTypeEnum.textNode:
                return this._options.escapeEntities
                    ? Entities.escapeText(root.textContent)
                    : root.textContent;
            case NodeTypeEnum.documentTypeNode:
                const doctype = root;
                const identifier = doctype.publicId ? ' PUBLIC' : doctype.systemId ? ' SYSTEM' : '';
                const publicId = doctype.publicId ? ` "${doctype.publicId}"` : '';
                const systemId = doctype.systemId ? ` "${doctype.systemId}"` : '';
                return `<!DOCTYPE ${doctype.name}${identifier}${publicId}${systemId}>`;
        }
        return '';
    }
    /**
     * Returns attributes as a string.
     *
     * @param element Element.
     * @returns Attributes.
     */
    _getAttributes(element) {
        let attributeString = '';
        if (!element.attributes.getNamedItem('is') && element._isValue) {
            attributeString += ' is="' + element._isValue + '"';
        }
        for (let i = 0, max = element.attributes.length; i < max; i++) {
            const attribute = element.attributes[i];
            if (attribute.value !== null) {
                const escapedValue = this._options.escapeEntities
                    ? Entities.escapeText(attribute.value)
                    : attribute.value;
                attributeString += ' ' + attribute.name + '="' + escapedValue + '"';
            }
        }
        return attributeString;
    }
}
//# sourceMappingURL=XMLSerializer.js.map