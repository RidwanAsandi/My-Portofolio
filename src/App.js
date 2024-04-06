import "./App.css";
import ReactGA from "react-ga";
import $ from "jquery";
import { Component } from "react";
import Header from "./Components/Header.js"
import About from "./Components/About.js";
import Resume from "./Components/Resume.js";
import Contact from "./Components/Contact.js";
import Portofolio from "./Components/Portofolio.js";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      foo: "bar",
      resumeData: {},
    };

    ReactGA.initialize("UA-110570651-1");
    ReactGA.pageview(window.location.pathname);
  }

  getResumeData() {
    $.ajax({
      url: "./resumeData.json",
      dataType: "json",
      cache: false,
      success: function (data) {
        this.setState({
          resumeData: data,
        });
      }.bind(this),
      error: function(xhr, status, err) {
        console.log(err);
        alert(err);
      }
    });
  }

  componentDidMount() {
    this.getResumeData();
  }

  render() {
    return (
      <div className="App">
        <Header data={this.state.resumeData.main}/>
        <About data={this.state.resumeData.main}/>
        <Resume data={this.state.resumeData.resume}/>
        <Portofolio data={this.state.resumeData.portfolio}/>
        <Contact data={this.state.resumeData.main}/>
      </div>
    )
  }
}

export default App;
