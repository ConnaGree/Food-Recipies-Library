import {useState, useEffect} from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import {motion} from 'framer-motion';
import React from 'react'

const Recipe = () => {

    let params = useParams();
    const [details, setDetails] = useState({});
    const [activeTab, setActiveTab] = useState('instructions');

    useEffect(() => {
        const fetchDetails = async () => {
            const data = await fetch(`https://api.spoonacular.com/recipes/${params.name}/information?apiKey=${process.env.REACT_APP_API_KEY}`);
            const detailData = await data.json();
    
            setDetails(detailData);
        }
    
        fetchDetails();
    }, [params.name]);

  return (
    <DetailWrapper animate={{opacity: 1}} initial={{opacity: 0}} exit={{opacity: 0}} transition={{duration: 0.5}}>
        <div>
            <h2>{details.title}</h2>
            <img src={details.image} alt="" />
        </div>

        <Info>
            <Button className={activeTab === 'instructions' ? 'active' : ''} onClick={() => setActiveTab('instructions')}>Instructions</Button>
            <Button className={activeTab === 'ingredients' ? 'active' : ''} onClick={() => setActiveTab('ingredients')}>Ingredients</Button>

            {activeTab === 'instructions' && (
                <div>
                    <h3 dangerouslySetInnerHTML={{__html: details.summary}}></h3>
                    <h3 dangerouslySetInnerHTML={{__html: details.instructions}}></h3>
                </div>) 
            }
   
            {activeTab === 'ingredients' && (
            <ul>
                {details.extendedIngredients.map((ingredient) => {
                    return (
                       <li key={ingredient.id}>{ingredient.original}</li>
                    )
                }) }
            </ul>
            )}
                

        </Info>
    </DetailWrapper>
  )
}


const DetailWrapper = styled(motion.div)`
    margin-top: 5rem;
    margin-bottom: 5rem;
    display: flex;

    .active {
        background: linear-gradient(35deg, #494949, #313131);
        color: #fff;
    }

    a {
        color: #313131;
    }

    h2 {
        margin-bottom: 2rem;
    }

    h3 {
        font-weight: 500;
        font-size: 1.1rem;
        line-height: 2rem;
        margin-top: 2em;
    }

    li {
        font-size: 1.2rem;
        line-height: 2.5rem;
    }

    ul {
        margin-top: 2rem;
    }
`

const Button = styled.button`
    padding: 1rem 2rem;
    color: #313131;
    background: #fff;
    border: 2px solid #313131;
    margin-right: 1rem;
    font-weight: 600;
    cursor: pointer;
`

const Info = styled.div`
    margin-left: 3rem;
`

export default Recipe