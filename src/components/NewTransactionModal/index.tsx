import Modal from 'react-modal';
import { useState, FormEvent } from 'react';
import { api } from '../../services/api';
import entradaImg from '../../assets/entradas.svg';
import saidaImg from '../../assets/saidas.svg';
import fecharImg from '../../assets/fechar.svg';
import { Container, TransactionTypeConatiner, RadioBox } from './styles';

interface ModalNewTransactionProps {
  onCloseNewTransactionModal: () => void;
  onIsNewTransactionModalOpen: boolean;
}

Modal.setAppElement('#root');

export function ModalNewTransaction( {onIsNewTransactionModalOpen, onCloseNewTransactionModal}: ModalNewTransactionProps ){
    const [ title, setTitle ] = useState( '' );
    const [ value, setValue ] = useState( 0 );
    const [ category, setCategory ] = useState( '' );
    const [ type, setType ] = useState('deposit');
    
    function handleCreateNewTrabsaction(event: FormEvent) {
        event.preventDefault();

        const data = { title, value, category, type }
        api.post('/transactions', data );
    }

    return(
        <Modal 
            isOpen={onIsNewTransactionModalOpen} 
            onRequestClose={onCloseNewTransactionModal}
            overlayClassName="react-modal-overlay"
            className="react-modal-content"
        >
            <button 
                type='button'
                onClick={onCloseNewTransactionModal}
                className="react-modal-close"
            >
                <img src={fecharImg} alt="Fechar modal" />
            </button>
            <Container onSubmit={handleCreateNewTrabsaction}>
                <h2>Cadastrar transação</h2>
                <input 
                    type="text"
                    placeholder='Título'
                    value={title}
                    onChange={ event => setTitle(event.target.value) }
                />
                <input 
                    type="number"
                    placeholder='Valor'
                    value={value}
                    onChange={ event => setValue( Number(event.target.value)) }
                />
                <TransactionTypeConatiner>
                    <RadioBox
                        type='button'
                        isActive={ type === 'deposit' }
                        activeColor='green'
                        onClick={ () => { setType('deposit') }}
                    >
                        <img src={entradaImg} alt="Entrada" />
                        <span>Entrada</span>
                    </RadioBox>
                    <RadioBox
                        type='button'
                        isActive={ type === 'withdraw' }
                        activeColor='red'
                        onClick={ () => { setType('withdraw') }}
                    >
                        <img src={saidaImg} alt="Saída" />
                        <span>Saída</span>
                    </RadioBox>
                </TransactionTypeConatiner>
                <input 
                    type="text"
                    placeholder='Categoria'
                    value={category}
                    onChange={ event => setCategory(event.target.value) }
                />
                <button type="submit">Cadastrar</button>
            </Container>
        </Modal>
    )
}