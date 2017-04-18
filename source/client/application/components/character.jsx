import React, { Component } from 'react'

class Character extends Component {

  constructor(props) {
    super(props)
  }

  onClickKill(event) {
    const _id = event.target.closest('tr').dataset.id
    this.props.deleteCharacters('/characters/' + _id)
  }

  onClickFave(event) {
    const is_favorite = event.target.classList.contains('empty')
    const _id = event.target.closest('tr').dataset.id
    const fields = { is_favorite }
    this.props.updateCharacters('/characters/' + _id, _id, fields)
  }

  onClickEdit(event) {
    const _id = event.target.closest('tr').dataset.id
    const is_editable = !event.target.classList.contains('unlock')
    const fields = { is_editable }
    if (!is_editable) {
      const list = event.target.closest('tr').getElementsByTagName('input')
      for (var i = 0; i < list.length; ++i) {
        const label = list[i].dataset.label
        const value = list[i].value
        fields[label] = value
      }
    }

    this.props.updateCharacters('/characters/' + _id, _id, fields)
  }

  buildIcons(character) {
    const { is_favorite, is_editable } = character
    const faveIcon = is_favorite ?
      <i className="icon red heart" onClick={this.onClickFave.bind(this)} /> :
      <i className="icon empty red heart" onClick={this.onClickFave.bind(this)} />
    const editIcon = is_editable ?
      <i className="icon green unlock alternate" onClick={this.onClickEdit.bind(this)} /> :
      <i className="icon red lock " onClick={this.onClickEdit.bind(this)} />
    const killIcon = <i className="trash red outline icon" onClick={this.onClickKill.bind(this)} />
    return <td><span className="content-table-row-actions">{faveIcon}{editIcon}{killIcon}</span></td>
  }

  buildFields(character) {

    const input = (key, val, label) => {
      return <input data-label={label} key={key} className="ui inverted mini input content-table-wrapper-field" defaultValue={val}/>
    }
    const span = (key, val, label) => {
      return <span data-label={label} key={key}>{val}</span>
    }

    const td = (_id, label, value, index, is_editable) => {
      const key1 = `tdata:${_id}:${label}`
      const val = `${value}`
      const key2 = `field:${_id}:${label}`
      return <td key={key1}>{is_editable ? input(key2, val, label) : span(key2, val, label)}</td>
    }

    const { _id, name, is_male, mass, height, birth_year, eye_color, skin_color, hair_color, is_editable } = character
    const fields = [{name}, {is_male}, {mass}, {height}, {birth_year}, {eye_color}, {skin_color}, {hair_color}]

    return fields.map((field, index) => {
      const label = Object.keys(field)[0]
      const value = Object.values(field)[0]
      return td(_id, label, value, index, is_editable)
    })
  }

  render() {
    const { _id } = this.props.character
    const icons = this.buildIcons(this.props.character)
    const fields = this.buildFields(this.props.character)
    const html = <tr data-id={_id}>{fields}{icons}</tr>
    return html
  }

}

export default Character
