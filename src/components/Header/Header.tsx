import  {StyledHeader,Nav,Logo,Image}  from "../styles/Header.styled";
import Container from "../styles/container.styled";
import {StyledFlex} from "../styles/Flex.styled";
import {Button} from '../styles/Button.styled';
export default function Header(){
    return (
        <>
        <StyledHeader >
            <Container>
          <Nav>
           <Logo src= 'https://raw.githubusercontent.com/bradtraversy/huddle_styled_components/6033c3b282d305910a8b1424f80e2f31f629d653/public/images/logo.svg' alt='logo'/>
            <Button>Try It Free</Button>
          </Nav>
          <StyledFlex>
            <div>
                <h1>Build the comunity your fans would love</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
                     Iure quos repellat voluptatum corrupti maiores ducimus
                      odit illum dolores modi ut aperiam tempore dicta saepe aliquid voluptas, 
                    doloremque iste earum optio est accusamus omnis necessitatibus!</p>
                    <Button bg="#ff0099" color="#fff">Get Started for Free</Button>
            </div>

           <Image src="https://raw.githubusercontent.com/bradtraversy/huddle_styled_components/6033c3b282d305910a8b1424f80e2f31f629d653/public/images/illustration-mockups.svg" alt=""/>
          </StyledFlex>
            </Container>
        </StyledHeader>
        </>
    );

}