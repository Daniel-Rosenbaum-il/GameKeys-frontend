import React, { Component } from 'react'

export class GameFilter extends Component {
    state = {
        filterBy: {
            txt: '',
            type: 'all'
        }
    }

    handleChange = ({ target }) => {
        let { value, name: field } = target
        const { filterBy } = this.state
        this.setState({ filterBy: { ...filterBy, [field]: value } }, () => {
            this.props.onSetFilter(this.state.filterBy)
        })
    }

    render() {
        const { txt } = this.state.filterBy
        return (
            <section className="game-filter">
                <input className="game-search" autoComplete="off"
                    type="text" name="txt" value={txt}
                    placeholder="Search for a game" onChange={this.handleChange} />
                {/* <select className="toy-select" name="isInStock" onChange={this.handleChange}>
                    <option value="all">All</option>
                    <option value="noStock">Not-Availabel</option>
                    <option value="inStock">Availabel</option>
                </select>
                <select className="toy-select" name="type" onChange={this.handleChange}>
                    <option value="all">All</option>
                    <option value="Funny">Funny</option>
                    <option value="Kids">Kids</option>
                    <option value="Adult">Adult</option>
                    <option value="Educational">Educational</option>
                </select> */}
                {/* {this.props.children} */}
            </section>
        )
    }
}