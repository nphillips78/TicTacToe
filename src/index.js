import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
  return (
    <button 
    className="square" 
    onClick={props.onClick}>
      {props.value}
    </button>
  );
 }
  // notice that this.props is now just props - this.props has to do with state and since our new functional component is stateless, we use props as an argument without touching state 

/*class Square extends React.Component { 
  /*constructor(props) {
    super(props);
    this.state = {
      value: null,
    };
  }*/ 
  // we don't need that now that square is no longer keeping track of the game's state
  // we finna change it from a class component to a functional component that only contains a render method and doesn't have it's own state
  // a functional component takes props as input and returns what should be rendered

  /*render() {
    return (
      <button 
      className="square" 
      onClick={() => this.props.onClick()}
      >

        {this.props.value}
      </button>
    )*/ 
    //we took out the render function because we moved it all into the square function


  // the onclick prop component tells React to set up a click event listener
  // when button is clicked, react will call the onclick event handler that is stored in Square's render method
  // the event handler calls this.props.onClick, Square's onclick prop was specified by Board
  // since the Board passed onClick = {() => this.handleClick(i)} to Square , the square calls this.handleClick when clicked
  // we still have to define the handleClick method so our code will crash if we try to click a square

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true, // each time a player moves xIsNext (a boolean) changes to determine which player goes next
    };
  }

  handleClick(i) {
    const squares = this.state.squares.slice(); // we call .slice to create a copy of the squares array to modify instead of modifying the existing array
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
    });
  }

  renderSquare(i) {
    return (
      <Square
        value = {this.state.squares[i]} // value and onClick are the two props that are being passed from Board to Square
        onClick = {() => this.handleClick(i)} // the onClick prop is a function
      />
    );    
  }

  render() {
    // const status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O'); // we took this out when we added in the winner code
    const winner = calculateWinner(this.state.squares);
    let status;
    if(winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }
  

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

function calculateWinner(squares) { // we will call this helper function inside Board's render function to check if a player has won
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}


// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
