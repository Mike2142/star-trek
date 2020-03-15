'use strict';

let planetList = [
  //{ name: 'луна', distance: '3 дня',},
  { name: 'солнце', distance: '4 месяца',},
  { name: 'меркурий', distance: '5 месяцев',},
  { name: 'венера', distance: '5 месяцев',},
  { name: 'марс', distance: '8 месяцев',},
  { name: 'юпитер', distance: '5 лет',},
  { name: 'сатурн', distance: '7 лет',},
  { name: 'уран', distance: '9 лет',},
  { name: 'нептун', distance: '12 лет',},

 ];

/// vanilla реализация ///

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

  if ( direction == 'left'){

    if (slider.scrollLeft != 0) {

      animationLeft()      

      buttons.forEach( hideButtons );
      function hideButtons(button) {
      button.classList.add('hidden');
      }
      slider.scrollLeft -= windowWidth
     }

  } else {

    if (slider.scrollLeft != maxScrollLeft) {

      animationRight()


      buttons.forEach( hideButtons );
      function hideButtons(button) {
      button.classList.add('hidden');
      }
      slider.scrollLeft += windowWidth


    }


  }

  window.setTimeout( function() { buttons.forEach( showButtons ) } , 600 )
  function showButtons(button) {
    button.classList.remove('hidden');
  }

  function animationRight() {
    let stars1 = document.querySelector('.stars1')
    stars1.classList.add('fly-left1')
    window.setTimeout( function() { stars1.classList.remove('fly-left1') } , 600 )

    let stars2 = document.querySelector('.stars2')
    stars2.classList.add('fly-left2')
    window.setTimeout( function() { stars2.classList.remove('fly-left2') } , 600 )


    let stars3 = document.querySelector('.stars3')
    stars3.classList.add('fly-left3')
    window.setTimeout( function() { stars3.classList.remove('fly-left3') } , 600 )


  }

    function animationLeft() {
    let stars1 = document.querySelector('.stars1')
    stars1.classList.add('fly-right1')
    window.setTimeout( function() { stars1.classList.remove('fly-right1') } , 600 )

    let stars2 = document.querySelector('.stars2')
    stars2.classList.add('fly-right2')
    window.setTimeout( function() { stars2.classList.remove('fly-right2') } , 600 )


    let stars3 = document.querySelector('.stars3')
    stars3.classList.add('fly-right3')
    window.setTimeout( function() { stars3.classList.remove('fly-right3') } , 600 )


  }


}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { items: [], text: '' };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    return (
      <div className='slider-inner'>
        <h3 className="app__planet-header" >Звездный маршрут</h3>
        <h3 className="app__planet-header" >Добавь планету или звезду солнечной системы</h3>
        <form onSubmit={this.handleSubmit}>
          <input className="app__planet-input"
            id="planet-input"
            onChange={this.handleChange}
            value={this.state.text}
            autocomplete="off"
          />
          <button className="app__button-add">
            Добавить
          </button>
          <span className="app__planet-count" htmlFor="planet-input">
            Космические тела: {this.state.items.length + 2}
          </span>
        </form>
        <Slider items={this.state.items} />
        <div className="button-wrapper">
          <button className="button-control" onClick={() => moveSlider('left')}> &#60; </button>
          <button className="button-control" onClick={() => moveSlider('right')}> &#62; </button>
        </div>
      </div>
    );
  }

  handleChange(e) {
    this.setState({ text: e.target.value});
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
      if ( planetValues.includes(planetName) ) {

        distance = planetList[planet].distance;
        let planetNameCapitalized = planetName.charAt(0).toUpperCase() + planetName.slice(1)

        const newItem = {
          text: planetNameCapitalized,
          dist: distance,
          img: planetName,
          id: Date.now(),
        };
        this.setState(state => ({
          items: state.items.concat(newItem),
          text: ''
        }));

        let addButton = document.querySelector('.app__button-add');
        addButton.innerHTML = 'Планета добавлена';
        window.setTimeout( function(){ addButton.innerHTML = 'Добавить'; }, 1000);

        delete planetList[planet]
        return
      }
    }

    let addButton = document.querySelector('.app__button-add');
    addButton.innerHTML = 'Планета не найдена';
    window.setTimeout( function(){ addButton.innerHTML = 'Добавить'; }, 1000);

  }
}

class Slider extends React.Component {
  render() {
    return (
      <div className='slider'>
        <div className = 'planet '>
          <img className = 'planet__image' src = 'build/images/земля.png'></img>
          <span className = 'planet__name' > Земля </span>
          <span className = 'planet__distance' ></span>
        </div>
        <div className = 'planet '>
          <img className = 'planet__image' src = 'build/images/луна.png'></img>
          <span className = 'planet__name' > Луна </span>
          <span className = 'planet__distance' >  3 дня полета от Земли </span>
        </div>
        {this.props.items.map(item => (
          <div className = {'planet ' + item.text} key={item.id}>
            <img className = 'planet__image' src = {'build/images/'+ item.img + '.png'}></img>
            <span className = 'planet__name' > {item.text} </span>
            <span className = 'planet__distance' > {item.dist + ' полета от Земли'} </span>
          </div>
        ))}
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.querySelector('.app')
);