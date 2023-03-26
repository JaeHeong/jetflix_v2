import styled from "styled-components";
import { motion } from "framer-motion";
import { Link, useRouteMatch } from "react-router-dom";

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  width: 100%;
  top: 0;
  background-color: black;
  font-size: 14px;
  padding: 20px 60px;
  color: white;
`;

const Col = styled.div`
  display: flex;
  align-items: center;
`;

const Logo = styled(motion.img)`
  margin-right: 50px;
  width: 95px;
  height: 25px;
`;

const Items = styled.ul`
  display: flex;
  align-items: center;
`;

const Item = styled.li`
  margin-right: 20px;
  color: ${(props) => props.theme.white.darker};
  transition: color 0.3s ease-in-out;
  position: relative;
  display: flex;
  justify-content: center;
  flex-direction: column;
  &:hover {
    color: ${(props) => props.theme.white.lighter};
  }
`;

const Search = styled.span`
  color: white;
  svg {
    height: 25px;
  }
`;

const logoVariants = {
  animate: {
    rotate: [0, -5, 10, -8, 0],
    y: [0, -8, 0],
    scale: [1, 0.95, 1.1, 1],
  },
};

const Circle = styled.span`
  position: absolute;
  width: 5px;
  height: 5px;
  border-radius: 5px;
  bottom: -5px;
  left: 0;
  right: 0;
  margin: 0 auto;
  background-color: ${(props) => props.theme.red};
`;

function Header() {
  const homeMatch = useRouteMatch("/");
  const tvMatch = useRouteMatch("/tv");
  return (
    <Nav>
      <Col>
        <Logo
          variants={logoVariants}
          whileHover="animate"
          src={require("../Images/jetflix.png")}
        ></Logo>
        <Items>
          <Item>
            <Link to="/">Home {homeMatch?.isExact && <Circle />}</Link>
          </Item>
          <Item>
            <Link to="/tv">Tv Shows {tvMatch && <Circle />}</Link>
          </Item>
        </Items>
      </Col>
      <Col>
        <Search>
          <svg
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            ></path>
          </svg>
        </Search>
      </Col>
    </Nav>
  );
}

export default Header;
