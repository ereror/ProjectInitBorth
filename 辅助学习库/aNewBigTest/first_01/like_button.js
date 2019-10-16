'use strict';

const e = React.createElement;

class LikeButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { liked: false };
  }

  render() {
    if (this.state.liked) {
      return 'You liked this.' + this.props.name;
    }

    return e(
      'button',
      { onClick: () => this.setState({ liked: true }) },
      'Like'
    );
  }
}

// const domContainer = document.querySelector('#like_button_container');

// ReactDOM.render(e(LikeButton), domContainer);
// 
document.querySelectorAll('.linkbtn').forEach(v => {
  const name = v.dataset.name
  ReactDOM.render(e(LikeButton, {name: name}),v)
})