import { ThemeProvider } from 'styled-components'
import Header from './components/Header/Header'
import Card from './components/Card/Card'
import content from './content'
import Footer from './components/Footer/Footer'
import  Container from './components/styles/container.styled'
import GlobalStyles from './components/styles/Global.styled'


const theme = {
  colors: {
    header: '#FFB6C1',
    body: '#fff',
    footer: '#003333',
  },
  mobile: '768px',
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyles />
        <Header />
        <Container>
        {content.map((item, index) => (
            <Card key={index} item={item} id={0} title={''} body={''} image={0}  />
          ))}
        </Container>
        <Footer/>
      </>
    </ThemeProvider>
  )
}

export default App