import { connect } from "react-redux";
import store from "../../store";
import styled from "styled-components";
import { useState } from "react";
import ListaComponent from "../../components/ListaComponent";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const InicioPageStyle = styled.div`
width: 100%;
`;

function InicioPage({ inicio }) {
    const [constructorHasRun, setConstructorHasRun] = useState(false);

    function constructor() {
        if (constructorHasRun) return;
        document.title = store.getState().appName +  ' - Início';
        setConstructorHasRun(true);
    };

    constructor();

    var columnMapper = {
        id: {
            name: '#'
        },
        nome: {
            name: 'Nome do Item',
            titleColumn: true,
            icon: faUser
        },
        quantidade: {
            name: 'Quantidade',
            icon: faUser
        },
        valor: {
            name: 'Valor',
            align: 'right',
            icon: faUser
        }
    };

    var detail = [
        { title: 'Dados principais' },
        { 
            fields: [
                'nome', 'quantidade', 'quantidade', 'quantidade'
            ] 
        },
        { title: 'Valores' },
        { 
            fields: [
                'valor'
            ] 
        }
    ];

    var dados = [
        {
            id: 1,
            nome: 'ABACAXI',
            quantidade: 15,
            valor: 0.0
        },
        {
            id: 2,
            nome: 'BANANA',
            quantidade: 26
        },
        {
            id: 3,
            nome: 'MACA',
            quantidade: 2,
            valor: 150.0,
            requestData: {
                
            }
        }
    ];

    var events = {
        print: (value) => {
            window.print();
        },
        update: (value) => {

        },
        delete: (value) => {

        }
    }

    return (
        <InicioPageStyle>
            <ListaComponent columnMapper={columnMapper} data={dados} detailMapper={detail} events={events} />
        </InicioPageStyle>
    );
};

const InicioPageConnected = connect((state) => { 
    return {
        inicio: state.inicio
    }
 })(InicioPage);

export default InicioPageConnected;