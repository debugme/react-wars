import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getData } from '../actions/getData'

class Content extends Component {

  constructor(props) {
    super(props)
    this.ENDPOINT = '/characters'
  }

  componentWillMount() {
    this.props.getData(this.ENDPOINT)
  }

  buildMessage(message) {
    return <div className="content-info"><span className="content-info-card">{message}</span></div>
  }

  buildUpCards(data) {
    // ToDo...
    // 1. Build up a sequence of cards that flow around as the browser width changes
    return JSON.stringify(data)
  }

  render() {
    const { data } = this.props
    if (data === null)
      return this.buildMessage('Loading application...Hopefully done soon!')
    if (data.length === 0)
      return this.buildMessage('Hmmm. Interesting. Your database is empty!')
    const cards = this.buildUpCards(data)
    const html = <main className="content">{cards}</main>
    return html
  }
}

const mapStateToProps =
  state => ({ data: state.data.data })

const mapDispatchToProps =
  dispatch => bindActionCreators({ getData }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Content)
