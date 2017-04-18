import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Character from 'Character'
import { readCharacters } from 'ReadAction'
import { updateCharacters } from 'UpdateAction'
import { deleteCharacters } from 'DeleteAction'

class Content extends Component {

  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.props.readCharacters('/characters')
  }

  onClickMake() {
    console.log('ToDo...Allow User to add a new character')
  }

  toTitleCase(value){
    // http://stackoverflow.com/questions/21792367/replace-underscores-with-spaces-and-capitalize-words
    return value.replace(/(?:_| |\b)(\w)/g, ($1) =>  $1.toUpperCase().replace('_',' '))
  }

  generateTable(characters) {
    const list = []
    for (let _id in characters)
      list.push(characters[_id])

    if (list.length === 0)
      return (
        <div className="content-table-wrapper">
          <table className="ui selectable inverted table"></table>
        </div>
      )

    const makeAction = <th><i className="add user icon content-table-actions" onClick={this.onClickMake.bind(this)}></i></th>
    const byWantedFields = key => !['_id', 'is_favorite', 'is_editable'].includes(key)
    const cols = Object.keys(list[0]).filter(byWantedFields)
    const tableCols = <tr>{cols.map(col => <th key={col}>{this.toTitleCase(col)}</th>)}{makeAction}</tr>
    const tableRows = list.map((character) =>
      <Character key={character._id}
                 character={character}
                 updateCharacters={this.props.updateCharacters}
                 deleteCharacters={this.props.deleteCharacters} />)

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
    const {characters} = this.props
    if (characters === null)
      return <div></div>
    if (Object.keys(characters).length === 0)
      return <div className="content-info"><span className="content-info-card">Hmmm. Interesting. Your database is empty!</span></div>
    const table = this.generateTable(characters)
    const html = <main className="content">{table}</main>
    return html
  }
}

const mapStateToProps =
  state => ({characters: state.characters.characters })

const mapDispatchToProps =
  dispatch => bindActionCreators({readCharacters, updateCharacters, deleteCharacters }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Content)
