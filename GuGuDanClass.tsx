import * as React from "react";
import { Component } from "react"

interface State {
    first: number,
    second: number,
    value: string,
    result: string
}

class GuGuDan extends Component<{}, State> {
    state = {
        first: Math.ceil(Math.random() * 9),
        second: Math.ceil(Math.random() * 9),
        value: '',
        result: ''
    }

    onSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (parseInt(this.state.value) === this.state.first * this.state.second) {
            this.setState((prevState) => {
                return {
                    result: `Correct: ${prevState.value}`,
                    first: Math.ceil(Math.random() * 9),
                    second: Math.ceil(Math.random() * 9),
                    value: ''
                }
            })
            if (this.input) {
                this.input.focus()
            }
        } else {
            this.setState({
                result: 'Wrong',
                value: ''
            })
            if (this.input) {
                this.input.focus()
            }
        }
    }

    onCHange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            value: e.target.value
        })        
    }

    input: HTMLInputElement | null = null;

    onRefInput = (c: HTMLInputElement) => {
        this.input = c
    }

    render() {
        return (
            <>
                <div>{this.state.first} * {this.state.second} = ?</div>
                <form onSubmit={this.onSubmitForm}>
                    <input
                        ref={this.inputEl}
                        type="number"
                        value={this.state.value}
                        onChange={(e) => setValue(e.target.value)}
                    />
                </form>
                <div>{this.state.result}</div>
            </>
        )
    }
}

export default GuGuDan