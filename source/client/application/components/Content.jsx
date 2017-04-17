import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { readCharacters } from '../actions/readCharacters'

class Content extends Component {

  constructor(props) {
    super(props)
    this.ENDPOINT = '/characters'
  }

  componentWillMount() {
    this.props.readCharacters(this.ENDPOINT)
  }

  generateTable(characters) {
    const cols = Object.keys(characters[0]).slice(1)
    const rows = characters.map(character => Object.values(character))
    const tableCols = cols.map(col => <th key={col}>{col}</th>)
    const tableRows = rows.map(row => (<tr key={`tr-${row[0]}`}>{row.slice(1).map((cell, index) => <td key={`td-${row[0]}-${index}`}>{cell + ''}</td>)}</tr>))

    const htmlFragment = (
      <div className="content-table-wrapper">
        <table className="ui selectable inverted table">
          <thead><tr>{tableCols}</tr></thead>
          <tbody>{tableRows}</tbody>
        </table>
      </div>
    )

    return htmlFragment
  }

  render() {
    const { characters } = this.props
    if (characters === null)
      return <div></div>
    if (characters.length === 0)
      return <div className="content-info"><span className="content-info-card">Hmmm. Interesting. Your database is empty!</span></div>
    const table = this.generateTable(characters)
    const html = <main className="content">{table}</main>
    return html
  }
}

const mapStateToProps =
  state => ({ characters: state.characters.characters })

const mapDispatchToProps =
  dispatch => bindActionCreators({ readCharacters }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Content)
