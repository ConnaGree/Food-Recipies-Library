import React from 'react'
import styled from 'styled-components';
import {motion} from 'framer-motion';
import {useParams, Link} from 'react-router-dom';
import {useState, useEffect} from 'react';

const Cuisine = () => {
  const params = useParams();

    const [cuisine, setCuisine] = useState([]);

    useEffect(() => {
        getCuisine(params.type);
    }, [params.type])

    const getCuisine = async (name) => {
        const data = fetch(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&cuisine=${name}&number=20`)
        const recipes = await (await data).json();

        setCuisine(recipes.recipes);
    }

  return (
    <Grid animate={{opacity: 1}} initial={{opacity: 0}} exit={{opacity: 0}} transition={{duration: 0.5}}>
       {cuisine.map((item) => {
         return(
          <Link className='link' to={'/recipe/'+item.id}>
            <Card id={item.id}>
            <img src={item.image ? item.image : `https://via.placeholder.com/400`} alt={item.title} />
            <h4>{item.title}</h4>
          </Card> 
        </Link>
         )
       })}
    </Grid>
  )
}

const Grid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  grid-gap: 3rem;

  .link {
    text-decoration: none;
  }
`;

const Card = styled.div`
  img {
    width: 100%;
    border-radius: 2rem;
  }

  a {
    text-decoration: none;
  }

  h4 {
    text-align: center;
    padding: 1rem;
  }
`

export default Cuisine