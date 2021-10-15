import * as React from 'react'
import * as ReactDOM from 'react-dom'
import tokens from './tokens/tokens.json';
import './ui.css'

declare function require(path: string): any

class App extends React.Component<{}, { value: string }> {
  textbox: HTMLInputElement

  constructor(props) {
    super(props);
    this.state = { value: '' };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) { this.setState({ value: event.target.value }); }

  onSyncTokens = () => {
    parent.postMessage({ pluginMessage: { type: 'sync-tokens' } }, '*')
  }

  onCreateAutoLayout = () => {
    parent.postMessage({ pluginMessage: { type: 'auto-layout', space: this.state.value } }, '*')
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
      <select value={this.state.value} onChange={this.handleChange}>
        {sizeToken.map(token => <option key={`size-option-${token.name}`} value={token.value}>{token.name}</option>)}
      </select>
      <button id="create-auto-Layout" onClick={this.onCreateAutoLayout}>Create Auto Layout</button>
      <button id="sync-tokens" onClick={this.onSyncTokens}>Sync Tokens</button>
      <button onClick={this.onCancel}>Cancel</button>
    </div>
  }
}

ReactDOM.render(<App />, document.getElementById('react-page'))
