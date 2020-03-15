'use strict';

let planetList = [//{ name: 'луна', distance: '3 дня',},
{
  name: 'солнце',
  distance: '4 месяца'
}, {
  name: 'меркурий',
  distance: '5 месяцев'
}, {
  name: 'венера',
  distance: '5 месяцев'
}, {
  name: 'марс',
  distance: '8 месяцев'
}, {
  name: 'юпитер',
  distance: '5 лет'
}, {
  name: 'сатурн',
  distance: '7 лет'
}, {
  name: 'уран',
  distance: '9 лет'
}, {
  name: 'нептун',
  distance: '12 лет'
}]; /// vanilla реализация ///
// for ( let planet in planetList) {
//   let planetName = planetList[planet].name
//   let planetImageUrl = planetList[planet].image
//   let slideContents = ` <div class = '${planetName} planet'> ${planetName} </div> `;
//   let slider = document.querySelector('.slider');
//   slider.insertAdjacentHTML('beforeend', slideContents);
// }

function moveSlider(direction) {
  let buttons = document.querySelectorAll('button');
  let slider = document.querySelector('.slider');
  let windowWidth = window.innerWidth;
  let maxScrollLeft = slider.scrollWidth - slider.clientWidth;

  if (direction == 'left') {
    if (slider.scrollLeft != 0) {
      animationLeft();
      buttons.forEach(hideButtons);

      function hideButtons(button) {
        button.classList.add('hidden');
      }

      slider.scrollLeft -= windowWidth;
    }
  } else {
    if (slider.scrollLeft != maxScrollLeft) {
      animationRight();
      buttons.forEach(hideButtons);

      function hideButtons(button) {
        button.classList.add('hidden');
      }

      slider.scrollLeft += windowWidth;
    }
  }

  window.setTimeout(function () {
    buttons.forEach(showButtons);
  }, 600);

  function showButtons(button) {
    button.classList.remove('hidden');
  }

  function animationRight() {
    let stars1 = document.querySelector('.stars1');
    stars1.classList.add('fly-left1');
    window.setTimeout(function () {
      stars1.classList.remove('fly-left1');
    }, 600);
    let stars2 = document.querySelector('.stars2');
    stars2.classList.add('fly-left2');
    window.setTimeout(function () {
      stars2.classList.remove('fly-left2');
    }, 600);
    let stars3 = document.querySelector('.stars3');
    stars3.classList.add('fly-left3');
    window.setTimeout(function () {
      stars3.classList.remove('fly-left3');
    }, 600);
  }

  function animationLeft() {
    let stars1 = document.querySelector('.stars1');
    stars1.classList.add('fly-right1');
    window.setTimeout(function () {
      stars1.classList.remove('fly-right1');
    }, 600);
    let stars2 = document.querySelector('.stars2');
    stars2.classList.add('fly-right2');
    window.setTimeout(function () {
      stars2.classList.remove('fly-right2');
    }, 600);
    let stars3 = document.querySelector('.stars3');
    stars3.classList.add('fly-right3');
    window.setTimeout(function () {
      stars3.classList.remove('fly-right3');
    }, 600);
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      text: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    return React.createElement("div", {
      className: 'slider-inner'
    }, React.createElement("h3", {
      className: "app__planet-header"
    }, "\u0417\u0432\u0435\u0437\u0434\u043D\u044B\u0439 \u043C\u0430\u0440\u0448\u0440\u0443\u0442"), React.createElement("h3", {
      className: "app__planet-header"
    }, "\u0414\u043E\u0431\u0430\u0432\u044C \u043F\u043B\u0430\u043D\u0435\u0442\u0443 \u0438\u043B\u0438 \u0437\u0432\u0435\u0437\u0434\u0443 \u0441\u043E\u043B\u043D\u0435\u0447\u043D\u043E\u0439 \u0441\u0438\u0441\u0442\u0435\u043C\u044B"), React.createElement("form", {
      onSubmit: this.handleSubmit
    }, React.createElement("input", {
      className: "app__planet-input",
      id: "planet-input",
      onChange: this.handleChange,
      value: this.state.text,
      autocomplete: "off"
    }), React.createElement("button", {
      className: "app__button-add"
    }, "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C"), React.createElement("span", {
      className: "app__planet-count",
      htmlFor: "planet-input"
    }, "\u041A\u043E\u0441\u043C\u0438\u0447\u0435\u0441\u043A\u0438\u0435 \u0442\u0435\u043B\u0430: ", this.state.items.length + 2)), React.createElement(Slider, {
      items: this.state.items
    }), React.createElement("div", {
      className: "button-wrapper"
    }, React.createElement("button", {
      className: "button-control",
      onClick: () => moveSlider('left')
    }, " < "), React.createElement("button", {
      className: "button-control",
      onClick: () => moveSlider('right')
    }, " > ")));
  }

  handleChange(e) {
    this.setState({
      text: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    if (this.state.text.length === 0) {
      return;
    }

    let planetName = this.state.text;
    planetName = planetName.toLowerCase();
    let distance;

    for (let planet in planetList) {
      let planetValues = Object.values(planetList[planet]);

      if (planetValues.includes(planetName)) {
        distance = planetList[planet].distance;
        let planetNameCapitalized = planetName.charAt(0).toUpperCase() + planetName.slice(1);
        const newItem = {
          text: planetNameCapitalized,
          dist: distance,
          img: planetName,
          id: Date.now()
        };
        this.setState(state => ({
          items: state.items.concat(newItem),
          text: ''
        }));
        let addButton = document.querySelector('.app__button-add');
        addButton.innerHTML = 'Планета добавлена';
        window.setTimeout(function () {
          addButton.innerHTML = 'Добавить';
        }, 1000);
        delete planetList[planet];
        return;
      }
    }

    let addButton = document.querySelector('.app__button-add');
    addButton.innerHTML = 'Планета не найдена';
    window.setTimeout(function () {
      addButton.innerHTML = 'Добавить';
    }, 1000);
  }

}

class Slider extends React.Component {
  render() {
    return React.createElement("div", {
      className: 'slider'
    }, React.createElement("div", {
      className: 'planet '
    }, React.createElement("img", {
      className: 'planet__image',
      src: 'build/images/земля.png'
    }), React.createElement("span", {
      className: 'planet__name'
    }, " \u0417\u0435\u043C\u043B\u044F "), React.createElement("span", {
      className: 'planet__distance'
    })), React.createElement("div", {
      className: 'planet '
    }, React.createElement("img", {
      className: 'planet__image',
      src: 'build/images/луна.png'
    }), React.createElement("span", {
      className: 'planet__name'
    }, " \u041B\u0443\u043D\u0430 "), React.createElement("span", {
      className: 'planet__distance'
    }, "  3 \u0434\u043D\u044F \u043F\u043E\u043B\u0435\u0442\u0430 \u043E\u0442 \u0417\u0435\u043C\u043B\u0438 ")), this.props.items.map(item => React.createElement("div", {
      className: 'planet ' + item.text,
      key: item.id
    }, React.createElement("img", {
      className: 'planet__image',
      src: 'build/images/' + item.img + '.png'
    }), React.createElement("span", {
      className: 'planet__name'
    }, " ", item.text, " "), React.createElement("span", {
      className: 'planet__distance'
    }, " ", item.dist + ' полета от Земли', " "))));
  }

}

ReactDOM.render(React.createElement(App, null), document.querySelector('.app'));
//# sourceMappingURL=script.js.map
