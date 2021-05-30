import React, { Component } from 'react'

export class GameFilter extends Component {
    state = {
        filterBy: {
            txt: '',
            tag: 'All'
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
            <section className="game-filter mb-20">
                <div className="filter-container">
                    <input className="game-search" autoComplete="off"
                        type="text" name="txt" value={txt}
                        placeholder="Search for a game" onChange={this.handleChange} />
                    {/* <select className="toy-select" name="isInStock" onChange={this.handleChange}>
                    <option value="all">All</option>
                    <option value="noStock">Not-Availabel</option>
                    <option value="inStock">Availabel</option>
                </select>*/}
                    <select className="game-tag-select" name="tag" onChange={this.handleChange}>
                        <option value="All">All</option>
                        <option value="Action">Action</option>
                        <option value="Rpg">Rpg</option>
                        <option value="Strategy">Strategy</option>
                        <option value="Fighting">Fighting</option>
                        <option value="Racing">Racing</option>
                        <option value="Simulation">Simulation</option>
                        <option value="Strategy">Strategy</option>
                    </select>
                    {/* {this.props.children} */}
                </div>
            </section>
        )
    }
}