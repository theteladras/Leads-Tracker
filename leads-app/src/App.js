import React, { PureComponent } from "react";
import Login from "./Screens/Login";
import Signup from "./Screens/Signup";
import Main from "./Screens/Main";

class App extends PureComponent {
  state = {
    content: null,
    choice: 0
  };

  componentDidMount() {
    let obj = localStorage.getItem("login_data");
    if (obj !== "null") {
      this.setState({ choice: 2, content: JSON.parse(obj) });
    }
  }

  renderIt = () => {
    let arr = [
      <Login
        changeScreen={(x, content) => this.changeScreen(x, content)}
        content={this.state.content}
      />,
      <Signup
        changeScreen={(x, content) => this.changeScreen(x, content)}
        content={this.state.content}
      />,
      <Main
        changeScreen={(x, content) => this.changeScreen(x, content)}
        content={this.state.content}
      />
    ];
    return arr[this.state.choice];
  };
  changeScreen = (x, content) => {
    this.setState({ content, choice: x });
  };
  render() {
    return this.renderIt();
  }
}

export default App;
