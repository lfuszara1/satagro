import './App.scss';

import React, {Component} from 'react';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Hidden from '@material-ui/core/Hidden';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            api_resopnse_pro_value: 0.0,
            api_response_pro_symbol: "",
            api_resopnse_premium_value: 0.0,
            api_response_premium_symbol: "",
        };

        this.getDataFromAPI = this.getDataFromAPI.bind(this);
    }

    componentDidMount() {
        this.getDataFromAPI("PL")
    }

    getDataFromAPI = (value) => {
        const headers = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        };

       fetch(`https://app.satagro.pl/api/plans/?plan=Professional&units=metric&region=${value}`, headers).then(response => {
           response.json().then(data => {
                this.setState({
                    ...this.state,
                    api_resopnse_pro_value: parseFloat(data[0].yearly_rate),
                    api_response_pro_symbol: data[0].currency_symbol
                })
            })
        });

        fetch(`https://app.satagro.pl/api/plans/?plan=Premium&units=metric&region=${value}`, headers).then(response => {
            response.json().then(data => {
                this.setState({
                    ...this.state,
                    api_resopnse_premium_value: parseFloat(data[0].yearly_rate),
                    api_response_premium_symbol: data[0].currency_symbol
                })
            })
        });
    }

    render() {
        return (
            <div className="App">
                <div className="section-price">
                    <h3>Oferta</h3>

                    <h4>Wybierz kraj</h4>
                    <div className="price-country-width">
                        <Hidden xsDown>
                            <Grid container justify="space-between">
                                <Button onClick={() => this.getDataFromAPI("PL")} variant="outlined" className="price-select-country">Polska</Button>
                                <Button onClick={() => this.getDataFromAPI("CZ")} variant="outlined" className="price-select-country">Czechy</Button>
                                <Button onClick={() => this.getDataFromAPI("LT")} variant="outlined" className="price-select-country">Litwa</Button>
                                <Button onClick={() => this.getDataFromAPI("SK")} variant="outlined" className="price-select-country">Słowacja</Button>
                            </Grid>
                        </Hidden>
                        <Hidden smUp>
                            <Grid container justify="center">
                                <Button onClick={() => this.getDataFromAPI("PL")} variant="outlined" className="price-select-country price-select-country-sm">Polska</Button>
                                <Button onClick={() => this.getDataFromAPI("CZ")} variant="outlined" className="price-select-country price-select-country-sm">Czechy</Button>
                            </Grid>
                            <Grid container justify="center">
                                <Button onClick={() => this.getDataFromAPI("LT")} variant="outlined" className="price-select-country price-select-country-sm">Litwa</Button>
                                <Button onClick={() => this.getDataFromAPI("SK")} variant="outlined" className="price-select-country price-select-country-sm">Słowacja</Button>
                            </Grid>
                        </Hidden>
                    </div>

                    <Grid container className="price-white-box">
                        <Grid container justify="center">
                            <Paper className="price-paper">
                                <h4>Professional</h4>
                                <h5>{`${this.state.api_resopnse_pro_value} ${this.state.api_response_pro_symbol}`} <span className="price-paper-nobold">ha/rok</span></h5>
                                <Hidden smDown>
                                    <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam iaculis finibus nisi, id aliquet odio sagittis a.</p>
                                </Hidden>
                                <div className="price-button-flex">
                                    <Button variant="outlined" className="price-button">Kup teraz</Button>
                                </div>
                            </Paper>
                            <Paper className="price-paper">
                                <h4>Premium</h4>
                                <h5>{`${this.state.api_resopnse_premium_value} ${this.state.api_response_premium_symbol}`} <span class="price-paper-nobold">ha/rok</span></h5>
                                <Hidden smDown>
                                    <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                                </Hidden>
                                <Button variant="outlined" className="price-button">Kup teraz</Button>
                            </Paper>
                        </Grid>
                    </Grid>
                </div>
            </div>
        );
    }
}

export default App;
