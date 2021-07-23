import React, { useState } from "react";
import * as yup from "yup";
import axios from "axios";

//Form Schema / Shape expected
const formSchema = yup.object().shape({
  name: yup.string().required("name must be at least 2 characters").min(2),
  size: yup.string().required(),
  bacon: yup.string(),
  peppers: yup.string(),
  pepperoni: yup.string(),
  sausage: yup.string(),
  special: yup.string(),
});

//Form component
export default function OrderForm() {
  //Order State
  const [orderData, setOrderData] = useState({
    name: "",
    size: "",
    bacon: false,
    peppers: false,
    pepperoni: false,
    sausage: false,
    special: "",
  });

  //Error State
  const [errors, setErrors] = useState({
    name: "",
  });

  //Submit Handler
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(orderData);
    setOrderData({
      name: "",
      size: "",
      bacon: false,
      peppers: false,
      sausage: false,
      pepperoni: false,
      special: "",
    });
    axios
      .post("https://reqres.in/api/users", orderData)
      .then((res) => console.log(res))
      .catch((err) => {
        console.log(err);
      });
  };

  //Validation Function
  const validateName = (event) => {
    yup
      .reach(formSchema, event.target.name)
      .validate(event.target.value)
      .then((valid) => {
        setErrors({
          ...errors,
          [event.target.name]: "",
        });
      })
      .catch((err) => {
        console.log(err.errors);
        setErrors({
          ...errors,
          [event.target.name]: err.errors[0],
        });
      });
  };

  //Change Handler
  const handleChange = (event) => {
    event.persist();
    validateName(event);
    let value =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;
    setOrderData({ ...orderData, [event.target.name]: value });
  };

  return (
    <form id="pizza-form" onSubmit={handleSubmit}>
      <label>
        Name
        <input
          id="name-input"
          name="name"
          value={orderData.name}
          onChange={handleChange}
        />
      </label>

      {errors.name.length > 0 ? <p>{errors.name}</p> : null}

      <br />

      <select
        id="size-dropdown"
        value={orderData.size}
        onChange={handleChange}
        name="size"
      >
        <option>--Size?--</option>
        <option> Small </option>
        <option> Med </option>
        <option> Large </option>
      </select>

      <p>Toppings</p>

      <label>
        Bacon
        <input
          type="checkbox"
          name="bacon"
          checked={orderData.onions}
          onChange={handleChange}
        />
      </label>
      <label>
        Peppers
        <input
          type="checkbox"
          name="peppers"
          checked={orderData.pineapple}
          onChange={handleChange}
        />
      </label>
      <label>
        Pepperoni
        <input
          type="checkbox"
          name="pepperoni"
          checked={orderData.beef}
          onChange={handleChange}
        />
      </label>
      <label>
        Suasage
        <input
          type="checkbox"
          name="sausage"
          checked={orderData.mushrooms}
          onChange={handleChange}
        />
      </label>

      <br />

      <label>
        Special Requests?
        <textarea
          id="special-text"
          name="special"
          value={orderData.special}
          onChange={handleChange}
        />
      </label>

      <br />

      <button id="order-button" name="button">
        Order
      </button>
    </form>
  );
}