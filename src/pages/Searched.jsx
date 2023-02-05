import {useState, useEffect} from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';

const Searched = () => {

    const [searchedRecipes, setSearchedRecipes] = useState([]);

    let params = useParams();
    const getSearched = async (name) => {
        const data = fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&query=${name}&number=20`)
        const recipes = await (await data).json();
        setSearchedRecipes(recipes.results);
    }

    useEffect(() => {
        getSearched(params.search);
    }, [params.search])

    console.log(params);

    return (
        <Grid>
            {searchedRecipes.map((item) => {

                return(
                    <Link className='link' to={'/recipe/'+item.id}>
                        <Card key={item.id}>
                        <img src={item.image ? item.image : `https://via.placeholder.com/400`} alt={item.title} />
                        <h4>{item.title}</h4>
                        </Card>
                    </Link>
                )
            })}
        </Grid>
    )
}

const Grid = styled.div`
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

export default Searched