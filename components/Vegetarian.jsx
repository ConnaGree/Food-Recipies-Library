import { Splide, SplideSlide } from '@splidejs/react-splide';
import React from 'react'
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import '@splidejs/react-splide/css';
import {Link} from 'react-router-dom';

const Vegetarian = () => {

  
  const [vegetarian, setVegetarian] = useState([]);

  useEffect(() => {
    getVegetarian();
  }, [])

  // wait for the data before render
  const getVegetarian = async () => {
    const API_KEY = process.env.REACT_APP_API_KEY;

    const check = localStorage.getItem('vegetarian');

    if (check) {
      setVegetarian(JSON.parse(check));
    } else {
      const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${API_KEY}&number=9&tags=vegetarian`)
      const data = await api.json();

      localStorage.setItem("vegetarian", JSON.stringify(data.recipes));
      setVegetarian(data.recipes); 
    }
  }
  return (
    <div>

        <Wrapper>
          <h3>Vegetarian Picks</h3>

          <Splide options={{
            perPage: 3,
            arrows: false,
            pagination: false,
            drag: 'free',
            gap: '2em'
          }}>
          {
            vegetarian.map((recipe, index) => {
              return(
                <SplideSlide key={index}>
                  <Link to={'/recipe/'+recipe.id}>
                    <Card>
                      <p>{recipe.title}</p>
                      <img src={recipe.image ? recipe.image : `https://via.placeholder.com/400`} alt={recipe.title} />
                      <span></span>
                    </Card>
                  </Link>
                </SplideSlide>
              )
            })
          }
          </Splide>
          
        </Wrapper>
    </div>
  )
}

const Wrapper = styled.div`
  margin: 4rem 0rem;
`
const Card = styled.div`
  min-height: 300px;
  border-radius: .4em;
  box-shadow: 4px 4px 16px -5px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  // padding: .5em;
  position: relative;
  cursor: pointer;

  img {
    border-radius: .4em;
    width: 100%;
    height: 100%;
    position: absolute;
    object-fit: cover;
  }

  p {
    position: absolute;
    z-index: 900;
    color: #fff;
    text-align: center;
    font-weight: 500;
    bottom: 10%;
    left: 50%;
    transform: translate(-50%, -10%);
    padding-bottom: .5em;
    align-items: center;
    justify-content: center;
    font-size: .8rem;
  }

  span {
    width: 100%;
    height: 100%;
    background: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, .5));
    z-index: 100;
    position: absolute;
    bottom: 0;
  }
`

export default Vegetarian