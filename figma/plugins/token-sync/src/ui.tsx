import * as React from 'react'
import * as ReactDOM from 'react-dom'
import tokens from './tokens/tokens.json';
import './ui.css'

declare function require(path: string): any

class App extends React.Component<{}, { spacingSize: string, mode: string }> {
  textbox: HTMLInputElement

  constructor(props) {
    super(props);
    this.state = { spacingSize: '', mode: ''};
    this.handleSpacingChange = this.handleSpacingChange.bind(this);
    this.handleModeChange = this.handleModeChange.bind(this);
  }

  handleSpacingChange(event) { this.setState({ spacingSize: event.target.value }); }

  handleModeChange(event) { this.setState({ mode: event.target.value }); }

  onSyncTokens = () => {
    parent.postMessage({ pluginMessage: { type: 'sync-tokens', mode: this.state.mode } }, '*')
  }

  onCreateAutoLayout = () => {
    parent.postMessage({ pluginMessage: { type: 'auto-layout', space: this.state.spacingSize } }, '*')
  }

  onCancel = () => {
    parent.postMessage({ pluginMessage: { type: 'cancel' } }, '*')
  }

  render() {
    const sizeToken = Object.entries(tokens)
      .filter(tokenEntries => tokenEntries[1].attributes.category === 'size' && tokenEntries[1].attributes.type === 'space')
      .map(sizeTokenEntries => {
        return {
          name: sizeTokenEntries[0],
          value: sizeTokenEntries[1].value
        };
      });
    return <div>
      <img width="1rem" src="https://www.ft.com/__origami/service/image/v2/images/raw/ftlogo-v1:origami?source=origami" />
      <h2>Origami Figma Plugin</h2>

      <form>
        <label htmlFor="auto-layout">Apply An Auto Layout To Selection With Spacing</label>
        <select name="auto-layout" value={this.state.spacingSize} onChange={this.handleSpacingChange}>
          {sizeToken.map(token => <option key={`size-option-${token.name}`} value={token.value}>{token.name}</option>)}
        </select>
        <button type="submit" onClick={this.onCreateAutoLayout}>Apply Auto Layout</button>
      </form>

      <hr />

      <form>
        <label htmlFor="sync-tokens">Sync Tokens For Mode</label>
        <select name="sync-tokens" value={this.state.mode} onChange={this.handleModeChange}>
          <option key='mode-normal' value=''>normal</option>
          <option key='mode-dark' value='dark'>dark</option>
        </select>
        <button onClick={this.onSyncTokens}>Sync Tokens</button>
      </form>

      <hr />

      <button onClick={this.onCancel}>Close Plugin</button>
    </div>
  }
}

ReactDOM.render(<App />, document.getElementById('react-page'))
