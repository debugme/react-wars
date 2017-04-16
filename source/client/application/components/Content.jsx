import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getData } from '../actions/getData'

class Content extends Component {

  constructor(props) {
    super(props)
    this.ENDPOINT = '/characters'
  }

  format(data) {
    const names = Object.keys(data[0])
    const headings = names.map(name => [{ name, type: 'large' }])
    const rows = data.map(item => Object.values(item))
    const cols = rows[0].map((column, index) => rows.map(row => row[index]))
    return { headings, rows, cols }
  }

  render() {
    if (this.props.data === null)
      return <div>Loading...</div>
    if (this.props.data.length === 0)
      return <div>Hmm. Interesting. It looks like your database is empty</div>
    const info = this.format(this.props.data)
    const { headings, rows, cols } = info
    const stack = this.buildStack(headings, rows)
    const table = this.buildTable(headings, cols)
    const html = <main className="content">{stack}{table}</main>
    return html
  }

  buildTable(headings, cols) {
    return (
      <div className="content-table">
        {cols.map((column, index) =>
          <div className={'content-table-column ' + headings[index].type} key={'column-' + index}>
            <div className="content-table-column-name">{headings[index].name}</div>
            {column.map((value, index) => <div key={'value-' + index} className="content-table-column-cell">{value}</div>)}
          </div>)}
      </div>
    )
  }

  buildStack(headings, rows) {
    return (
      <div className="content-stack">
        <div className="content-stack-column">
          {rows.map((row, index) =>
            <div key={'row-micro-' + index} className="content-stack-column-card">
              {row.map((value, index) =>
                <span key={'value-micro' + index}>
                  <div style={{ display: headings[index].type === 'micro' ? 'block' : 'none' }}>
                    <span className="content-stack-column-card-label">{headings[index].name}:</span>
                    <span className="content-stack-column-card-value">{value}</span>
                  </div>
                </span>
              )}
            </div>)}
        </div>
      </div>
    )
  }

  componentWillMount() {
    this.props.getData(this.ENDPOINT)
  }

}

const mapStateToProps =
  state => ({ data: state.data.data })

const mapDispatchToProps =
  dispatch => bindActionCreators({ getData }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Content)
