import { Simulation } from './simulation.js';

const simulation = new Simulation();

function App() {
    const [state, setState] = React.useState(simulation.state);

    React.useEffect(() => {
        const unsubscribe = simulation.subscribe(setState);
        return unsubscribe;
    }, []);

    const buy = () => simulation.buy('AAPL', 100, 1);
    const sell = () => simulation.sell('AAPL', 100, 1);

    return React.createElement(
        'div',
        null,
        React.createElement('h1', null, 'Virtual Trading Practice'),
        React.createElement('div', null, `Balance: $${state.balance}`),
        React.createElement(
            'button',
            { onClick: buy },
            'Buy 1 AAPL @ $100'
        ),
        React.createElement(
            'button',
            { onClick: sell },
            'Sell 1 AAPL @ $100'
        ),
        React.createElement(
            'ul',
            null,
            state.positions.map((p, i) =>
                React.createElement(
                    'li',
                    { key: i },
                    `${p.qty} ${p.symbol} @ $${p.price}`
                )
            )
        )
    );
}

ReactDOM.render(
    React.createElement(App),
    document.getElementById('app')
);
