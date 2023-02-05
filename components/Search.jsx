import React from 'react'
import styled from 'styled-components';
import {useState} from 'react';
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Search = () => {

    const [input, setInput] = useState("");
    const navigate = useNavigate();
    const submitHandler = (e)  => {
        e.preventDefault();
        navigate('/searched/'+input);
    }
  return (
    <FormStyle onSubmit={submitHandler}>
        <div>
        <FaSearch></FaSearch>
        <input type="text" onChange={(e) => setInput(e.target.value)}/>
        </div>
    </FormStyle>
  )
}


const FormStyle = styled.form`
    margin: 0rem 20rem;
    position: relative;
    with: 100%;
    
    input {
        border: none;
        background: linear-gradient(35deg, #494949, #313131);
        font-size: 1.2rem;
        color: #fff;
        padding: 0.6rem 4rem;
        border-radius: 50px;
        outline: none;
        width: 100%;
    }

    svg {
        position: absolute;
        top: 50%;
        left: 0%;
        transform: translate(100%, -50%);
        color: #fff;
    }
`

export default Search