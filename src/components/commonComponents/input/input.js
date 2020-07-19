import React from "react";

import "./input.css";

const Input = (props) => {
  if (props.type === "select") {
    return (
      <>
        {props.label && <label htmlFor={props.id}>{props.label}</label>}
        <select
          className={
            props.valid
              ? props.classes
              : [`${props.classes}`, "input-error"].join(" ")
          }
          onChange={props.onChange}
          name={props.name}
          id={props.id}
          onClick={props.onClick}
          onBlur={props.onBlur}
          value={props.value}
        >
          {props.options.map((item, index) => (
            <option key={index} id={index}>
              {item}
            </option>
          ))}
        </select>
      </>
    );
  } else {
    return (
      <>
        {props.label && <label htmlFor={props.id}>{props.label}</label>}
        <input
          type={props.type}
          className={[
            `${props.classes}`,
            props.valid ? "valid" : "invalid",
            props.touched ? "touched" : "untouched",
          ].join(" ")}
          onChange={props.onChange}
          onClick={props.onClick}
          onBlur={props.onBlur}
          placeholder={props.placeholder}
          value={props.value}
          name={props.name}
          minLength={props.min}
          maxLength={props.max}
          id={props.id}
          disabled={props.disabled}
        />
      </>
    );
  }
};

//   !(props.type === "select") ? (

//   ) :  : (<div>someting else</div>);

export default Input;
