import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Character from 'Character'
import { readCharacters } from 'ReadAction'

class Content extends Component {

  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.props.readCharacters('/characters')
  }

  generateTable(characters) {
    const keys = Object.keys(characters[0]).filter(key => !['_id', 'is_favorite'].includes(key))
    const cols = [...keys, 'actions']
    const tableCols = <tr>{cols.map(col => <th key={col}>{col}</th>)}</tr>
    const tableRows = characters.map((character) => <Character key={character._id} character={character}></Character>)
    const htmlFragment = (
      <div className="content-table-wrapper">
        <table className="ui selectable inverted table">
          <thead>{tableCols}</thead>
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
