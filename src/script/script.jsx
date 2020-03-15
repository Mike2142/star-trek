'use strict';

const e = React.createElement;

class LikeButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { liked: false };
  }

  render() {
    if (this.state.liked) {
      return 'You liked this.';
    }

    return e(
      'button',
      { onClick: () => this.setState({ liked: true } ) },
      'Like'
    );
  }
}

const domContainer = document.querySelector('.button-like');
ReactDOM.render(e(LikeButton), domContainer);

ReactDOM.render(
         <span>Звездный путь </span>,
         document.querySelector('.title2')
);

console.log('Hi, i am jsx!');