// History.js
import React, { Component } from 'react';
import moment from 'moment';
import styles from '../assets/styles/History.module.css';
import '../utils/Tools'
import { useHistory ,useLocation} from 'react-router-dom';
import getAllAccounts from '../utils/Tools';
import { PieChart } from '@mui/x-charts';
import { LineChart } from '@mui/x-charts';
import { BarChart } from '@mui/x-charts';
import { Hidden } from '@mui/material';


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
            monthList: [this.props.startmonth],
            randomNumbers: [],
            entertainment: true,
            education: true,
            shopping: true,
            care: true,
            health: true,
            food: true,
            gifts: true,
            utilities: true,
            transport: true,
            travel: true
        };
    }

    changeSelection = (sel) => {
        console.log("Changing selection to:", sel);
        this.setState({ graphSelection: sel });
        console.log(this.state.monthList)
    }
    
    componentDidMount() {
        this.generateMonthList();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.startMonth !== this.props.startMonth || prevProps.endMonth !== this.props.endMonth) {
            this.generateMonthList();
        }
    }
    
    generateMonthList = () => {
        const { startMonth, endMonth } = this.props;
        const start = new Date(startMonth);
        const end = new Date(endMonth);
        const monthList = [];
    
        let currentDate = new Date(start);
        while (currentDate <= end) {
            const monthYear = `${currentDate.getMonth() + 1}${currentDate.getFullYear()}`;
            monthList.push({ month: monthYear });
            currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
        }
    
        this.setState({ monthList }, this.updateRandomNumbers);
    };
    
    updateRandomNumbers = () => {
        const { randomNumbers, monthList } = this.state;
        let newRandomNumbers = [...randomNumbers]; // Make a copy of randomNumbers array
    
        // If the length of monthList decreased, remove the last item(s) from randomNumbers
        if (randomNumbers.length > monthList.length) {
            const diff = randomNumbers.length - monthList.length;
            newRandomNumbers = newRandomNumbers.slice(0, monthList.length);
        }
        // If the length of monthList increased, add random number(s) at the beginning of randomNumbers
        else if (randomNumbers.length < monthList.length) {
            const diff = monthList.length - randomNumbers.length;
            for (let i = 0; i < diff; i++) {
                newRandomNumbers.unshift(Math.floor(Math.random() * 100));
            }
        }
    
        this.setState({ randomNumbers: newRandomNumbers });
    };

    handleEntertainmentButtonClick = () => {
        this.setState(prevState => ({ entertainment: !prevState.entertainment }));
    }

    handleEducationButtonClick = () => {
        this.setState(prevState => ({ education: !prevState.education }));
    }

    handleShoppingButtonClick = () => {
        this.setState(prevState => ({ shopping: !prevState.shopping }));
    }

    handleCareButtonClick = () => {
        this.setState(prevState => ({ care: !prevState.care }));
    }

    handleHealthButtonClick = () => {
        this.setState(prevState => ({ health: !prevState.health }));
    }

    handleFoodButtonClick = () => {
        this.setState(prevState => ({ food: !prevState.food }));
    }

    handleGiftsButtonClick = () => {
        this.setState(prevState => ({ gifts: !prevState.gifts }));
    }

    handleTravelButtonClick = () => {
        this.setState(prevState => ({ travel: !prevState.travel }));
    }

    handleUtilButtonClick = () => {
        this.setState(prevState => ({ utilities: !prevState.utilities }));
    }

    handleTransportButtonClick = () => {
        this.setState(prevState => ({ transport: !prevState.transport }));
    }

    render() {
        const { startMonth, endMonth } = this.props;
        const { monthList, randomNumbers } = this.state;
        let selectedGraph;

        // Determine which graph is shown based on graphSelection
        if (this.state.graphSelection === 1) {
            selectedGraph = 
            <div className={styles.graph_container_pie}>
                <PieChart
                series = {[
                    {
                        data: [
                            {value: 10},
                            {value: 10},
                            {value: 10},
                            {value: 10},
                            {value: 10},
                            {value: 10},
                            {value: 10},
                            {value: 10},
                            {value: 10},
                            {value: 10},
                        ],
                        cornerRadius: 4,
                        paddingAngle: 1,
                        innerRadius: 20,
                    }
                ]}
                width={400}
                height={300}
                slotProps={{ legend: { hidden: Hidden } }}
                />
            </div>;
        } else if (this.state.graphSelection === 2) {
            if (randomNumbers.length === monthList.length) {
                selectedGraph = 
            <div className={styles.graph_container_line}>
                <LineChart
                    xAxis={[{ scaleType: 'point', data: monthList.map(item => item.month) }]}
                    series={[
                        {
                        data: randomNumbers,
                        },
                    ]}
                    width={700}
                    height={400}
                />
            </div>;
            } else {
                selectedGraph = null;
            }
            
        } else if (this.state.graphSelection === 3) {
            selectedGraph = 
            <div className={styles.graph_container_bar}>
                <BarChart
                    series={[
                        { data: [3, 4, 1, 6, 5], stack: 'A', label: 'Entertainment' },
                        { data: [4, 3, 1, 5, 8], stack: 'A', label: 'Education' },
                        { data: [4, 3, 1, 5, 8], stack: 'A', label: 'Shopping' },
                        { data: [4, 3, 1, 5, 8], stack: 'A', label: 'Personal Care' },
                        { data: [4, 3, 1, 5, 8], stack: 'A', label: 'Health / Fitness' },
                        { data: [4, 3, 1, 5, 8], stack: 'A', label: 'Food / Dining' },
                        { data: [4, 3, 1, 5, 8], stack: 'A', label: 'Gifts' },
                        { data: [4, 3, 1, 5, 8], stack: 'A', label: 'Utilities' },
                        { data: [4, 3, 1, 5, 8], stack: 'A', label: 'Transport' },
                        { data: [4, 3, 1, 5, 8], stack: 'A', label: 'Travel' },

                    ]}
                    width={700}
                    height={400}
                    slotProps={{ legend: { hidden: Hidden } }}
                />
            </div>;
        }
    
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
                    {selectedGraph}

                    <div className={styles.graph_category_container}>
                        <table className={styles.graph_category_picker}>
                            <thead>
                                <tr>
                                    <th style={{ width: '10%' }}>
                                        <button className={styles.graph_category_btn} 
                                            style={{ borderColor: this.state.entertainment ? '#D00000' : 'black' }} 
                                            onClick={this.handleEntertainmentButtonClick}>
                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                <div className={styles.graph_category_circle} 
                                                    style={{ backgroundColor: this.state.entertainment ? '#D00000' : 'rgb(172, 172, 172)' }}>
                                                </div>
                                                <div style={{ marginLeft: '10px' }}>
                                                    Entertainment
                                                </div>
                                            </div>
                                        </button>
                                    </th>
                                    <th style={{ width: '10%' }}>
                                        <button className={styles.graph_category_btn} 
                                            style={{ borderColor: this.state.education ? '#A657AE' : 'black' }} 
                                            onClick={this.handleEducationButtonClick}>
                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                <div className={styles.graph_category_circle} 
                                                    style={{ backgroundColor: this.state.education ? '#A657AE' : 'rgb(172, 172, 172)' }}>
                                                </div>
                                                <div style={{ marginLeft: '10px' }}>
                                                    Education
                                                </div>
                                            </div>
                                        </button>
                                    </th>
                                    <th style={{ width: '10%' }}>
                                        <button className={styles.graph_category_btn} 
                                            style={{ borderColor: this.state.shopping ? '#399E5A' : 'black' }} 
                                            onClick={this.handleShoppingButtonClick}>
                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                <div className={styles.graph_category_circle} 
                                                    style={{ backgroundColor: this.state.shopping ? '#399E5A' : 'rgb(172, 172, 172)' }}>
                                                </div>
                                                <div style={{ marginLeft: '10px' }}>
                                                    Shopping
                                                </div>
                                            </div>
                                        </button>
                                    </th>
                                    <th style={{ width: '10%' }}>
                                        <button className={styles.graph_category_btn} 
                                            style={{ borderColor: this.state.care ? '#60B2E5' : 'black' }}
                                            onClick={this.handleCareButtonClick}>
                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                <div className={styles.graph_category_circle} 
                                                    style={{ backgroundColor: this.state.care ? '#60B2E5' : 'rgb(172, 172, 172)' }}>
                                                </div>
                                                <div style={{ marginLeft: '10px' }}>
                                                    Personal Care
                                                </div>
                                            </div>
                                        </button>
                                    </th>
                                    <th style={{ width: '10%' }}>
                                        <button className={styles.graph_category_btn} 
                                            style={{ borderColor: this.state.health ? '#EE7B30' : 'black' }}
                                            onClick={this.handleHealthButtonClick}>
                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                <div className={styles.graph_category_circle} 
                                                style={{ backgroundColor: this.state.health ? '#EE7B30' : 'rgb(172, 172, 172)' }}>
                                                </div>
                                                <div style={{ marginLeft: '10px' }}>
                                                    Health / Fitness
                                                </div>
                                            </div>
                                        </button>
                                    </th>
                                </tr>
                                <tr>
                                    <th style={{ width: '10%' }}>
                                        <button className={styles.graph_category_btn} 
                                            style={{ borderColor: this.state.food ? '#034732' : 'black' }}
                                            onClick={this.handleFoodButtonClick}>
                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                <div className={styles.graph_category_circle} 
                                                style={{ backgroundColor: this.state.food ? '#034732' : 'rgb(172, 172, 172)' }}>
                                                </div>
                                                <div style={{ marginLeft: '10px' }}>
                                                    Food / Dining
                                                </div>
                                            </div>
                                        </button>
                                    </th>
                                    <th style={{ width: '10%' }}>
                                        <button className={styles.graph_category_btn} 
                                            style={{ borderColor: this.state.gifts ? '#F6F740' : 'black' }}
                                            onClick={this.handleGiftsButtonClick}>
                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                <div className={styles.graph_category_circle} 
                                                style={{ backgroundColor: this.state.gifts ? '#F6F740' : 'rgb(172, 172, 172)' }}>
                                                </div>
                                                <div style={{ marginLeft: '10px' }}>
                                                    Gifts
                                                </div>
                                            </div>
                                        </button>
                                    </th>
                                    <th style={{ width: '10%' }}>
                                        <button className={styles.graph_category_btn} 
                                            style={{ borderColor: this.state.utilities ? '#131cd1' : 'black' }}
                                            onClick={this.handleUtilButtonClick}>
                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                <div className={styles.graph_category_circle} 
                                                style={{ backgroundColor: this.state.utilities ? '#131cd1' : 'rgb(172, 172, 172)' }}>
                                                </div>
                                                <div style={{ marginLeft: '10px' }}>
                                                    Utilities
                                                </div>
                                            </div>
                                        </button>
                                    </th>
                                    <th style={{ width: '10%' }}>
                                        <button className={styles.graph_category_btn} 
                                            style={{ borderColor: this.state.transport ? '#2D93AD' : 'black' }}
                                            onClick={this.handleTransportButtonClick}>
                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                <div className={styles.graph_category_circle} 
                                                style={{ backgroundColor: this.state.transport ? '#2D93AD' : 'rgb(172, 172, 172)' }}>
                                                </div>
                                                <div style={{ marginLeft: '10px' }}>
                                                    Transport
                                                </div>
                                            </div>
                                        </button>
                                    </th>
                                    <th style={{ width: '10%' }}>
                                        <button className={styles.graph_category_btn} 
                                            style={{ borderColor: this.state.travel ? '#37FF8B' : 'black' }}
                                            onClick={this.handleTravelButtonClick}>
                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                <div className={styles.graph_category_circle} 
                                                style={{ backgroundColor: this.state.travel ? '#37FF8B' : 'rgb(172, 172, 172)' }}>
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