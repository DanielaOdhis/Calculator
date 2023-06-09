import React, { useState } from 'react';
import './App.css';

export default function App() {
  const [calc, setCalc] = useState('');
  const [result, setResult] = useState('');

  const operators = ['/', '*', '+', '-', '.', '%'];

  const CreateDigits = () => {
    const digits = [];
    for (let i = 1; i < 10; i++) {
      digits.push(<button key={i} onClick={() => updateCalc(i)}>{i}</button>);
    }
    return digits;
  };

  const updateCalc = (value) => {
    if (
      (operators.includes(value) && calc === '') ||
      (operators.includes(value) && operators.includes(calc.slice(-1)))
    ) {
      return;
    }
    setCalc((prevCalc) => prevCalc + value);
  };

  const deleteLast = () => {
    if (calc === '') {
      return;
    } else {
      const value = calc.slice(0, -1);
      setCalc(value);
    }
  };

  const calculate = () => {
    try {
      let evalCalc = calc.replace(/%/g, '/100');
  
      const expression = new Function('return ' + evalCalc);
      setResult(expression().toString());
    } catch (error) {
      setResult('Error');
    }
  };

  const clearCalculation = () => {
    setCalc('');
    setResult('');
  };

  return (
    <div className='app'>
      <div className='calc'>
        <h1>Calculator</h1>
        <div className='display'>
          <div>{calc || 0}</div>
          <span>{result ? result : ''}</span>
        </div>
        <div className='operators'>
          <button onClick={clearCalculation}>C</button>
          <button onClick={() => updateCalc('+')}>+</button>
          <button onClick={() => updateCalc('-')}>-</button>
          <button onClick={() => updateCalc('*')}>x</button>
        </div>
        <div className='digits'>
          {CreateDigits()}
          <button onClick={() => updateCalc('0')}>0</button>
          <button onClick={() => updateCalc('.')}>.</button>
          <button onClick={() => updateCalc('/')}>/</button>
          <button onClick={() => updateCalc('%')}>%</button>
          <button onClick={deleteLast}>DEL</button>
          <button onClick={calculate}>=</button>
        </div>
      </div>
    </div>
  );
}
