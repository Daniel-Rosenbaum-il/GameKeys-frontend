import React, { Component } from 'react'

export class GameFilter extends Component {
    state = {
        filterBy: {
            txt: '',
            tag: 'all',
            sortBy: 'title'
        },
    }

    handleChange = ({ target }) => {
        let { value, name: field } = target
        const { filterBy } = this.state
        this.setState({ filterBy: { ...filterBy, [field]: value } }, () => {
            this.props.onSetFilter(this.state.filterBy)
            console.log(filterBy);
        })
    }
    // handleSortChange = ({ target }) => {
    //     let { value, name: field } = target
    //     const { sortBy } = this.state
    //     this.setState({ sortBy: { ...sortBy, [field]: value } }, () => {
    //         this.props.onSetFilter(this.state)
    //     })
    // }


    render() {
        const { txt } = this.state.filterBy
        return (
            <section className="game-filter mb-20">
                <div className="filter-container flex">
                    <input className="game-search" autoComplete="off" autoFocus={true}
                        type="text" name="txt" value={txt}
                        placeholder="Search for a game" onChange={this.handleChange} />
                    <select className="game-select tag" name="tag" onChange={this.handleChange}>
                        <option value="all">Tag</option>
                        <option value="action">Action</option>
                        <option value="rpg">Rpg</option>
                        <option value="strategy">Strategy</option>
                        <option value="fighting">Fighting</option>
                        <option value="racing">Racing</option>
                        <option value="simulation">Simulation</option>
                        <option value="shooter">Shooter</option>
                        <option value="classic">Classic</option>
                        <option value="multiplayer">Multiplayer</option>
                        <option value="adventure">Adventure</option>
                    </select>
                    <select className="game-select sort" name="sortBy" onChange={this.handleChange}>
                        <option value="title">Title</option>
                        <option value="rating">Top-Reviews</option>
                    </select>
                    {/* {this.props.children} */}
                </div>
            </section>
        )
    }
}