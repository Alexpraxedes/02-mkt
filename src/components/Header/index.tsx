import logo from '../../assets/logo.svg';
import { Container, Content } from './styles';

export function Header(){
    return (
      <Container>
          <Content>
            <header>
                <img src={logo} alt="dt money" />
                <button type="button"> Nova transação</button>
            </header>
        </Content>
      </Container>
    )
}