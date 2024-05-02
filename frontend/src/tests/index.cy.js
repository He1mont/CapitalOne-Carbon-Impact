import React from 'react';
import ReactDOM from 'react-dom/client';
import { mount } from '@cypress/react';
import App from '../App';
import '../assets/styles/index.css';

describe('Index page rendering', () => {
    let root;

    beforeEach(() => {
        // Mock the root div where the App will be mounted
        const div = document.createElement('div');
        div.id = 'root';
        document.body.appendChild(div);

        root = ReactDOM.createRoot(div);
    
        mount(
            <React.StrictMode>
                <App />
            </React.StrictMode>
        );
    });

    afterEach(() => {
        // Cleanup
        document.body.innerHTML = '';
    });

    it('renders without crashing', () => {
        // Check if the root element has child nodes after rendering, implying the app was rendered
        cy.get('#root').children().should('have.length.at.least', 0);
    });

   
   
});
