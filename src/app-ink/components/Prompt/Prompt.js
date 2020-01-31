import React from "react";
import { Box } from "ink";
import TextInput from "ink-text-input";

class Prompt extends React.Component {
  constructor() {
    super();

    this.state = {
      value: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    const { cash } = this.props;
    const cashValue = (cash / 10).toFixed(1);
    return (
      <Box>
        <Box marginRight={1}>Cash: {cashValue}></Box>

        <TextInput
          value={this.state.value}
          onChange={this.handleChange}
          onSubmit={this.handleSubmit}
        />
      </Box>
    );
  }

  handleChange(value) {
    this.setState({ value });
  }

  handleSubmit(value) {
    this.setState({ value: "" });
    this.props.onCommand(value);
  }
}

export default Prompt;
