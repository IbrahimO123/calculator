import "./App.css";
import Wrapper from "./components/Wrapper";
import Screen from "./components/Screen";
import ButtonBox from "./components/ButtonBox";
import Button from "./components/Button";
import React, { useState } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";


const btnValues = [
  ["C", "+-", "%", "/"],
  [7, 8, 9, "X"],
  [4, 5, 6, "-"],
  [1, 2, 3, "+"],
  [0, ".", "="],
];

const math = (a, b, signs) =>
  signs === "+" ? a + b : signs === "-" ? a - b : signs === "X" ? a * b : a / b;

const toLocaleString = (num) =>
  String(num).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1 ");

const removeSpaces = (num) => num.toString().replace(/\s/g, "");

function App() {
  const states = {
    sign: "sign",
    num: 0,
    res: 0,
  };
  const [calc, setCalc] = useState(states);
  const { sign, num, res } = calc;

  const numClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;
    if (removeSpaces(num).length < 16) {
      setCalc({
        ...calc,
        num:
          num === 0 && value === "0"
            ? "0"
            : removeSpaces(num) % 1 === 0
            ? toLocaleString(Number(removeSpaces(num + value)))
            : toLocaleString(num + value),
        res: !sign ? 0 : res,
      });
    }
  };

  const commaClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;
    setCalc({
      ...calc,
      num: !num.toString().includes(".") ? num + value : num,
    });
  };

  const signClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;
    setCalc({
      ...calc,
      sign: value,
      res: !res && num ? num : res,
      num: 0,
    });
  };

  const equalsClickHandler = () => {
    if (sign && num) {
      setCalc({
        ...calc,
        res:
          num === "0" && sign === "/"
            ? "infinity"
            : toLocaleString(
                math(Number(removeSpaces(res)), Number(removeSpaces(num)), sign)
              ),
        sign: "",
        num: 0,
      });
    }
  };

  const invertClickeHandler = () => {
    setCalc({
      ...calc,
      num: num ? toLocaleString(removeSpaces(num) * -1) : 0,
      res: res ? toLocaleString(removeSpaces(res) * -1) : 0,
      sign: "",
    }); //
  };

  const precentClickHandler = () => {
    let nums = num ? parseFloat(removeSpaces(num)) : 0;
    let ress = res ? parseFloat(removeSpaces(res)) : 0;
    setCalc({
      ...calc,
      num: (nums /= Math.pow(100, 1)),
      res: (ress /= Math.pow(100, 1)),
      sign: "",
    });
  };

  const resetClickHandler = () => {
    setCalc({
      ...calc,
      sign: "",
      num: 0,
      res: 0,
    });
  };

  return (
    <>
      <Header/>
      <Wrapper>
        <Screen value={num ? num : res} />
        <ButtonBox>
          {btnValues.flat().map((btn, i) => {
            return (
              <Button
                key={i}
                className={btn === "=" ? "equal" : ""}
                value={btn}
                onClick={
                  btn === "C"
                    ? resetClickHandler
                    : btn === "+-"
                    ? invertClickeHandler
                    : btn === "%"
                    ? precentClickHandler
                    : btn === "="
                    ? equalsClickHandler
                    : btn === "/" || btn === "X" || btn === "-" || btn === "+"
                    ? signClickHandler
                    : btn === "."
                    ? commaClickHandler
                    : numClickHandler
                }
              />
            );
          })}
        </ButtonBox>
      </Wrapper>
      <Footer/>
    </>
  );
}

export default App;
