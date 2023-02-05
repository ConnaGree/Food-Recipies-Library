import {Pages} from './pages';
import './index.css';
import {BrowserRouter, Link} from 'react-router-dom';
import { Category, Search } from './components'
import styled from 'styled-components';
import {GiKnifeFork} from 'react-icons/gi'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Nav>
        <GiKnifeFork />
        <Logo  to={'/'}>RecipesLib</Logo>
      </Nav>
        <Search />
        <Category />
        <Pages />
      </BrowserRouter>
    </div>
  );
}

const Logo = styled(Link)`
  text-decoration: none;
  font-size: 1.5rem;
  font-weight: 400;
  font-family: 'Lobster', cursive;
  color: #313131;
`

const Nav = styled.div`
  padding: 2rem 0rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  svg {
    font-size: 2rem;
  }
`

export default App;
