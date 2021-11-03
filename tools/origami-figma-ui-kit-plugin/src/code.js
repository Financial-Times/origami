import { hexToFigmaRGB } from '@figma-plugin/helpers';
import tokens from '@financial-times/style-dictionary-design-tokens/dist/figma/tokens.json';
import darkTokens from '@financial-times/style-dictionary-design-tokens/dist/figma/tokens-dark.json';


// This plugin will open a window to prompt the user to enter a number, and
// it will then create that many rectangles on the screen.

// This file holds the main code for the plugins. It has access to the *document*.
// You can access browser APIs in the <script> tag inside "ui.html" which has a
// full browser environment (see documentation).

// This shows the HTML page in "ui.html".
figma.showUI(__html__);

// Calls to "parent.postMessage" from within the HTML page will trigger this
// callback. The callback will be passed the "pluginMessage" property of the
// posted message.
figma.ui.onmessage = async msg => {
  if (msg.type === 'cancel') {
    figma.closePlugin();
  }
  if (msg.type === 'auto-layout') {
    figma.currentPage.selection.forEach(layer => {
      layer.layoutMode = "HORIZONTAL";
      layer.primaryAxisAlignItems = "SPACE_BETWEEN";
      layer.itemSpacing = parseInt(msg.space, 10);
    });
  }

  if (msg.type !== 'sync-tokens') {
    return;
  }

  const selectedTokens = msg.mode === 'dark' ? darkTokens : tokens;

  for (const [name, meta] of Object.entries(selectedTokens)) {
    if (meta.attributes.category !== 'color') {
      continue;
    }
    const existingId = figma.root.getPluginData(name);
    const style = existingId ? figma.getStyleById(existingId) || figma.createPaintStyle() : figma.createPaintStyle();

    const value = meta.value;
    style.name = name;
    style.paints = [{ color: hexToFigmaRGB(value), type: 'SOLID' }];

    figma.root.setPluginData(name, style.id);
  }

  for (const [name, meta] of Object.entries(selectedTokens)) {
    if (meta.attributes.category !== 'size' || meta.attributes.type !== 'font') {
      continue;
    }

    const lineHeightToken = Object.values(selectedTokens).find(t =>
      t.attributes.category === 'size' &&
      t.attributes.type === 'line-height' &&
      t.attributes.item === meta.attributes.item &&
      t.attributes.subitem === meta.attributes.subitem
    );

    await figma.loadFontAsync({ family: "Metric", style: "Regular" });
    await figma.loadFontAsync({ family: "Roboto", style: "Regular" });

    const existingId = figma.root.getPluginData(name);
    const style = existingId ? figma.getStyleById(existingId) || figma.createTextStyle() : figma.createTextStyle();

    const value = meta.value;
    style.name = name;
    style.fontSize = parseInt(value, 10);
    style.fontName = { family: "Metric", style: "Regular" };
    style.lineHeight = {
      value: parseInt(lineHeightToken.value, 10),
      unit: 'PIXELS'
    };


    figma.root.setPluginData(name, style.id);
  }


  const nodes = [];
  let x = 0;
  let height = 0;
  let width = 0;
  const spacingFrameName = 'origami-spacing-frame-id';
  const existingSpacingFrameId = figma.root.getPluginData(spacingFrameName);
  const spacingFrame = existingSpacingFrameId ? figma.getNodeById(existingSpacingFrameId) || figma.createFrame() : figma.createFrame();
  spacingFrame.name = 'spacing';
  figma.root.setPluginData(spacingFrameName, spacingFrame.id);

  for (const [name, meta] of Object.entries(selectedTokens)) {
    if (meta.attributes.category !== 'size' || meta.attributes.type !== 'space') {
      continue;
    }

    const existingId = figma.root.getPluginData(name);
    const rect = existingId ? figma.getNodeById(existingId) || figma.createRectangle() : figma.createRectangle();

    const value = meta.value;

    rect.name = name;
    rect.x = x;
    rect.resize(parseInt(value, 10), parseInt(value, 10));
    rect.fills = [{ type: 'SOLID', color: { r: 1, g: 0.5, b: 0 } }];
    spacingFrame.appendChild(rect);
    nodes.push(rect);
    x += parseInt(value, 10) + 16;
    height = Math.max(height, parseInt(value, 10));

    figma.root.setPluginData(name, rect.id);
  }

  width = x - 16;
  spacingFrame.resize(width, height);
};
