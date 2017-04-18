import React, { Component } from 'react'

class Character extends Component {

  constructor(props) {
    super(props)
  }

  onClickLike(event) {
    const is_favorite = event.target.classList.contains('empty') ? true : false
    const _id = event.target.closest('tr').dataset.id
    const fields = { is_favorite }
    this.props.updateCharacters('/characters/' + _id, _id, fields)
  }

  render() {

    const { _id, name, is_male, mass, height, birth_year, eye_color, skin_color, hair_color, is_favorite } = this.props.character

    const likeIcon = is_favorite ?
      <i className="icon red heart" onClick={this.onClickLike.bind(this)} /> :
      <i className="icon empty red heart" onClick={this.onClickLike.bind(this)} />
    const editIcon = <i className="icon red pencil " />
    const killIcon = <i className="trash red outline icon" />

    const html = (
      <tr data-id={`${_id}`}>
        <td>{name}</td>
        <td>{is_male + ''}</td>
        <td>{mass}</td>
        <td>{height}</td>
        <td>{birth_year}</td>
        <td>{eye_color}</td>
        <td>{skin_color}</td>
        <td>{hair_color}</td>
        <td><span className="content-table-row-actions">{likeIcon}{editIcon}{killIcon}</span></td>
      </tr>
    )

    return html
  }

}

export default Character
