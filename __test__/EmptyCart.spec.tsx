import { render, screen } from "@testing-library/react";
import { EmptyCart } from "../src/components/EmptyCart";
import '@testing-library/jest-dom/jest-globals';
import '@testing-library/jest-dom';

describe('EmptyCart Component', () => {
    test('renders EmptyCart with correct message', () => {
        render( <EmptyCart /> )
        const emptyCartMessage = screen.getByText('Seu carrinho está tão vazio... :(');
        expect(emptyCartMessage).toBeInTheDocument();
    });

});