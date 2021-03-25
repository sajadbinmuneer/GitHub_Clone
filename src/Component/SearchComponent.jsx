import React, { Component } from "react";
class SearchComponent extends Component {
  state = {
    term: "",
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleVoice = e => {
    window.SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    // eslint-disable-next-line no-undef
    let recognition = new SpeechRecognition();
    recognition.addEventListener("result", e => {
      let transcript = e.results[0][0].transcript.replace(/\s/g, "");
      this.setState({ term: transcript });
      e.preventDefault();
      this.handleSubmit();
    });

    recognition.start();
  };
  handleSubmit = (e) => {
    this.props.onTermSubmit(this.state.term);
  };

  render() {
    return (
      <fragment>
        <section className="col-md-4 mx-auto my-4">
          <article>
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <input
                  className="form-control"
                  name="term"
                  value={this.state.term}
                  onChange={this.handleChange}
                  type="text"
                  placeholder="search github user"
                />
                <span className="microphone" onClick={this.handleVoice}>
                <i className="fa fa-microphone" aria-hidden="true"></i>
                </span>
              </div>
            </form>
          </article>
        </section>
      </fragment>
    );
  }
}

export default SearchComponent;
