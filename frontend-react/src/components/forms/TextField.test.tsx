import '@testing-library/jest-dom'
import React from 'react';
import { render, screen } from '@testing-library/react';
import TextField from './TextField';

describe('Garantir o funcionamento do componente TextField', () => {
    it('Mostrar o label, valor e placeholder', () => {
        render(<TextField label='Teste 001' defaultValue={'Valor 001'} placeholder={'Placeholder 001'} />);

        expect(screen.getByText('Teste 001')).toBeInTheDocument();
        expect(screen.getByDisplayValue('Valor 001')).toBeInTheDocument();
        expect(screen.queryByPlaceholderText('Placeholder 001')).toBeInTheDocument();
    });

    it('Permanecer desabilitado', () => {
        render(<TextField label='Teste 001' defaultValue={'Valor 001'} disabled={true} />);

        expect(screen.getByDisplayValue('Valor 001')).toBeDisabled();
    });

    it('Permanecer apenas de leitura', () => {
        render(<TextField label='Teste 001' defaultValue={'Valor 001'} readonly={true} />);

        expect(screen.getByText('Teste 001')).toBeInTheDocument();
        expect(screen.getByText('Valor 001')).toBeInTheDocument();
    });

    it('Converter o valor padrão', () => {
        render(<TextField label='Teste 001' defaultValue={'v1'} fieldID={'campo001'} readonly={true} convertValueToText={[ { value: 'v1', text: 'Exemplo 1' }, { value: 'v2', text: 'Exemplo 2' } ]} />);

        expect(screen.getByText('Exemplo 1')).toBeInTheDocument();
    });
});