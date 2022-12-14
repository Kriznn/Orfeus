import React from "react";
import useForm from "./useForm";
import Input from './Input';
import axios from "axios";
import { useNavigate } from 'react-router-dom'

const baseURL = "http://127.0.0.1:5000/"

function Form() {
  const [data, setData] = useForm();
  const login = ["Username", "Password"]
  const type = ["text", "password"]
  const navigate = useNavigate()

  function handleResponse(resp) {
    switch (resp.status) {
      case 200:
        navigate("/account?id="+resp.data["id"]+"&username="+resp.data["username"])
        break;
      case 403:
        console.log("Bad credentials")
        break;
      default:
        break;
    }
  }
  function handleClick() {
    axios.post(baseURL + "login", data).then((response) => {
      handleResponse(response)
    })
  }
  return (
    <>
      {
        data.map((input, idx) => (
          <Input
            key={idx}
            type={type[idx]}
            value={input.value}
            label={login[idx]}
            name={input.id}
            setValue={setData}
          />
        ))
      }
      {
        <div className="d-grid">
          <button type="button" className="btn btn-primary" onClick={handleClick}>
            Login
          </button>
        </div>
      }
      {
        data.map((d, i) => (
          <p key={i}> {JSON.stringify(d)} </p>
        ))
      }
    </>
  );
}

export default Form;