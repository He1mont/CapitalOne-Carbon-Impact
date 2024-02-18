// History.js
import React, { Component } from 'react';
import moment from 'moment';
import styles from '../assets/styles/History.module.css';
import '../utils/Tools'
import { useHistory ,useLocation} from 'react-router-dom';
import getAllAccounts from '../utils/Tools';

class MonthRangeSelect extends Component {
    render() {
        const { startMonth, 
            endMonth, 
            decreaseStartMonth, 
            increaseStartMonth, 
            decreaseEndMonth, 
            increaseEndMonth } = this.props;

        return (
            <div className={styles.month_range_container}>
                <table className={styles.month_select}>
                    <tbody>
                        <tr>
                            <th style={{ width: '16%', textAlign: 'right' }}>
                                <button className={styles.month_select_btn} onClick={decreaseStartMonth}>
                                    <img src="/images/month-range-left.png" alt="Left Arrow" width="30px" />
                                </button>
                            </th>
                            <th style={{ width: '17%', textAlign: 'center' }}>
                                <span>{startMonth.format('MMM YYYY')}</span>
                            </th>
                            <th style={{ width: '16%', textAlign: 'left' }}>
                                <button
                                    className={styles.month_select_btn}
                                    onClick={increaseStartMonth}
                                    disabled={startMonth.clone().add(1, 'hour') > moment()}
                                >
                                    <img src="/images/month-range-right.png" alt="Right Arrow" width="30px" />
                                </button>
                            </th>
                            <th style={{ width: '17%', textAlign: 'center' }}>
                                To
                            </th>
                            <th style={{ width: '16%', textAlign: 'right' }}>
                                <button className={styles.month_select_btn} onClick={decreaseEndMonth}>
                                    <img src="/images/month-range-left.png" alt="Left Arrow" width="30px" />
                                </button>
                            </th>
                            <th style={{ width: '17%', textAlign: 'center' }}>
                                <span>{endMonth.format('MMM YYYY')}</span>
                            </th>
                            <th style={{ width: '16%', textAlign: 'left' }}>
                                <button
                                    className={styles.month_select_btn}
                                    onClick={increaseEndMonth}
                                    disabled={endMonth.clone().add(1, 'hour') > moment()}
                                >
                                    <img src="/images/month-range-right.png" alt="Right Arrow" width="30px" />
                                </button>
                            </th>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

class Graphs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            graphSelection: 1,
            home: false,
            food: false,
            goods: false,
            services: false,
            travel: false
        };
    }

    changeSelection = (sel) => {
        console.log("Changing selection to:", sel);
        this.setState({ graphSelection: sel });
    }
    handleHomeButtonClick = () => {
        this.setState(prevState => ({ home: !prevState.home }));
    }
    handleFoodButtonClick = () => {
        this.setState(prevState => ({ food: !prevState.food }));
    }
    handleGoodsButtonClick = () => {
        this.setState(prevState => ({ goods: !prevState.goods }));
    }
    handleServicesButtonClick = () => {
        this.setState(prevState => ({ services: !prevState.services }));
    }
    handleTravelButtonClick = () => {
        this.setState(prevState => ({ travel: !prevState.travel }));
    }

    render() {
        const { startMonth, endMonth } = this.props;
    
        return (
            <div className={styles.graphs_container}>
                <table className={styles.graphs_picker}>
                    <thead>
                        <tr>
                            <th 
                            className={`${styles.graph_selection_heads} ${this.state.graphSelection === 1 ? styles.selected : ''}`} 
                            style={{ width: '33%' }} 
                            onClick={() => this.changeSelection(1)}
                            >
                                Pie Chart
                            </th>
                            <th 
                            className={`${styles.graph_selection_heads} ${this.state.graphSelection === 2 ? styles.selected : ''}`} 
                            style={{ width: '34%' }} 
                            onClick={() => this.changeSelection(2)}
                            >
                                Line Graph
                            </th>
                            <th 
                            className={`${styles.graph_selection_heads} ${this.state.graphSelection === 3 ? styles.selected : ''}`} 
                            style={{ width: '33%' }} 
                            onClick={() => this.changeSelection(3)}
                            >
                                Bar Graph
                            </th>
                        </tr>
                    </thead>
                </table>
                <div className={styles.graphs_inner_container}>

                    <div className={styles.graph_category_container}>
                        <table className={styles.graph_category_picker}>
                            <thead>
                                <tr>
                                    <th style={{ width: '20%' }}>
                                        <button className={styles.graph_category_btn} 
                                            style={{ borderColor: this.state.home ? '#D00000' : 'black' }} 
                                            onClick={this.handleHomeButtonClick}>
                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                <div className={styles.graph_category_circle} 
                                                    style={{ backgroundColor: this.state.home ? '#D00000' : 'rgb(172, 172, 172)' }}>
                                                </div>
                                                <div style={{ marginLeft: '10px' }}>
                                                    Home
                                                </div>
                                            </div>
                                        </button>
                                    </th>
                                    <th style={{ width: '20%' }}>
                                        <button className={styles.graph_category_btn} 
                                            style={{ borderColor: this.state.food ? '#A657AE' : 'black' }} 
                                            onClick={this.handleFoodButtonClick}>
                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                <div className={styles.graph_category_circle} 
                                                    style={{ backgroundColor: this.state.food ? '#A657AE' : 'rgb(172, 172, 172)' }}>
                                                </div>
                                                <div style={{ marginLeft: '10px' }}>
                                                    Food
                                                </div>
                                            </div>
                                        </button>
                                    </th>
                                    <th style={{ width: '20%' }}>
                                        <button className={styles.graph_category_btn} 
                                            style={{ borderColor: this.state.goods ? '#399E5A' : 'black' }} 
                                            onClick={this.handleGoodsButtonClick}>
                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                <div className={styles.graph_category_circle} 
                                                    style={{ backgroundColor: this.state.goods ? '#399E5A' : 'rgb(172, 172, 172)' }}>
                                                </div>
                                                <div style={{ marginLeft: '10px' }}>
                                                    Goods
                                                </div>
                                            </div>
                                        </button>
                                    </th>
                                    <th style={{ width: '20%' }}>
                                        <button className={styles.graph_category_btn} 
                                            style={{ borderColor: this.state.services ? '#60B2E5' : 'black' }}
                                            onClick={this.handleServicesButtonClick}>
                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                <div className={styles.graph_category_circle} 
                                                    style={{ backgroundColor: this.state.services ? '#60B2E5' : 'rgb(172, 172, 172)' }}>
                                                </div>
                                                <div style={{ marginLeft: '10px' }}>
                                                    Services
                                                </div>
                                            </div>
                                        </button>
                                    </th>
                                    <th style={{ width: '20%' }}>
                                        <button className={styles.graph_category_btn} 
                                            style={{ borderColor: this.state.travel ? '#EE7B30' : 'black' }}
                                            onClick={this.handleTravelButtonClick}>
                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                <div className={styles.graph_category_circle} 
                                                style={{ backgroundColor: this.state.travel ? '#EE7B30' : 'rgb(172, 172, 172)' }}>
                                                </div>
                                                <div style={{ marginLeft: '10px' }}>
                                                    Travel
                                                </div>
                                            </div>
                                        </button>
                                    </th>
                                </tr>
                            </thead>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

function Head({ name, id }) {
    const history = useHistory();
    function handleLoginClick() {
        history.push({
            pathname: '/',
            state: { name: name, id: id }
        });
    }
    return (
        <div className={styles.head_bar}>
            <div className={styles.head_center}>
                <img src='/images/Logo.png' alt='Logo' className={styles.head_img} onClick={handleLoginClick} />
            </div>
        </div>
    )
}

class Mid extends Component {
    state = {
        startMonth: moment(),
        endMonth: moment(),
    };

    decreaseStartMonth = () => {
        const nextMonth = this.state.startMonth.clone().subtract(1, 'month');
        const minDate = moment('2021-01-01');
        if (nextMonth.isSameOrAfter(minDate)) {
            if (nextMonth.isBefore(this.state.endMonth)) {
                this.setState({ startMonth: nextMonth });
            }
        }
    };

    increaseStartMonth = () => {
        const nextMonth = this.state.startMonth.clone().add(1, 'month');
        if (nextMonth.isSameOrBefore(this.state.endMonth)) {
            this.setState({ startMonth: nextMonth });
        }
    };

    decreaseEndMonth = () => {
        const nextMonth = this.state.endMonth.clone().subtract(1, 'month');
        const minDate = moment('2021-01-01');
        if (nextMonth.isSameOrAfter(minDate)) {
            if (nextMonth.isSameOrAfter(this.state.startMonth)) {
                this.setState({ endMonth: nextMonth });
            }
        }
    };

    increaseEndMonth = () => {
        const nextMonth = this.state.endMonth.clone().add(1, 'month');
        if (nextMonth.isSameOrAfter(this.state.startMonth)) {
            this.setState({ endMonth: nextMonth });
        }
    };

    render() {
        const { name, id} = this.props;
        const { startMonth, endMonth } = this.state;

        return (
            <div className={styles.mid_bar}>
                <div className={styles.mid_high}>
                    <div className={styles.mid_high_txt_left}>
                        <p>{name}</p>
                        <h1>Carbon History</h1>
                    </div>
                    <div className={styles.mid_high_center_container}>
                        <MonthRangeSelect
                            startMonth={startMonth}
                            endMonth={endMonth}
                            decreaseStartMonth={this.decreaseStartMonth}
                            increaseStartMonth={this.increaseStartMonth}
                            decreaseEndMonth={this.decreaseEndMonth}
                            increaseEndMonth={this.increaseEndMonth}
                        />
                    </div>
                </div>
                <div className={styles.mid_low}>
                    <Graphs
                        startMonth={startMonth}
                        endMonth={endMonth}
                    />
                </div>
            </div>
        );
    }
}

function History() {
    const location = useLocation();
    const name = location.state?.name || "You need to login";
    const id = location.state?.id;
    return (
        <div>
            <Head name={name} id={id} />
            <Mid name={name} id={id} />
        </div>
    )
}

export default History;