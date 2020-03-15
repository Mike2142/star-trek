'use strict';

const e = React.createElement;

class LikeButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      liked: false
    };
  }

  render() {
    if (this.state.liked) {
      return 'You liked this.';
    }

    return e('button', {
      onClick: () => this.setState({
        liked: true
      })
    }, 'Like');
  }

}

const domContainer = document.querySelector('.button-like');
ReactDOM.render(e(LikeButton), domContainer);
ReactDOM.render(React.createElement("span", null, "\u0417\u0432\u0435\u0437\u0434\u043D\u044B\u0439 \u043F\u0443\u0442\u044C "), document.querySelector('.title2'));
console.log('Hi, i am jsx!');