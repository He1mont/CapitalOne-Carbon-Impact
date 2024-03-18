// History.js
import React, { Component } from 'react';
import moment from 'moment';
import styles from '../assets/styles/History.module.css';
import { useHistory ,useLocation} from 'react-router-dom';
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
            //boolean for if category is shown
            entertainment: true,
            education: true,
            shopping: true,
            care: true,
            health: true,
            food: true,
            gifts: true,
            utilities: true,
            transport: true,
            travel: true,
            //colour of each category
            entertainmentC: '#D00000',
            educationC: '#A657AE',
            shoppingC: '#399E5A',
            careC: '#60B2E5',
            healthC: '#EE7B30',
            foodC: '#034732',
            giftsC: '#F6F740',
            utilitiesC: '#131cd1',
            transportC: '#2D93AD',
            travelC: '#37FF8B',
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

    handleCategoryButtonClick = (category) => {
        this.setState((prevState) => ({
            [category]: !prevState[category],
        }));
    }

    generateMonthList = () => {
        const { startMonth, endMonth } = this.props;
        const start = new Date(startMonth);
        const end = new Date(endMonth);
        const monthList = [];
    
        let currentDate = new Date(start);
        while (currentDate <= end) {
            const monthYear = `${currentDate.getMonth() + 1}${" "}${currentDate.getFullYear()}`;
            monthList.push({ month: monthYear });
            currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
        }
    
        this.setState({ monthList }, this.updateRandomNumbers);
    }
    
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
    }

    randomNumberList = (length) => {
        const randomNums = [];
        for (let i = 0; i < length; i++) {
            randomNums.push(Math.floor(Math.random() * 100));
        }
        return randomNums;
    }

    handleAllOnClick = () => {
        this.setState({
            entertainment: true,
            education: true,
            shopping: true,
            care: true,
            health: true,
            food: true,
            gifts: true,
            utilities: true,
            transport: true,
            travel: true,
        });
    }

    handleAllOffClick = () => {
        this.setState({
            entertainment: false,
            education: false,
            shopping: false,
            care: false,
            health: false,
            food: false,
            gifts: false,
            utilities: false,
            transport: false,
            travel: false,
        });
    }

    generateLineChartData = () => {
        const { monthList } = this.state;
        const lineChartData = [];
        monthList.forEach(monthItem => {
            const monthData = {
                month: monthItem.month,
            };
            // Assign random data for each active category within the range of 10 to 50
            if (this.state.entertainment) monthData.entertainment = Math.floor(Math.random() * (50 - 10 + 1)) + 10;
            if (this.state.education) monthData.education = Math.floor(Math.random() * (50 - 10 + 1)) + 10;
            if (this.state.shopping) monthData.shopping = Math.floor(Math.random() * (50 - 10 + 1)) + 10;
            if (this.state.care) monthData.care = Math.floor(Math.random() * (50 - 10 + 1)) + 10;
            if (this.state.health) monthData.health = Math.floor(Math.random() * (50 - 10 + 1)) + 10;
            if (this.state.food) monthData.food = Math.floor(Math.random() * (50 - 10 + 1)) + 10;
            if (this.state.gifts) monthData.gifts = Math.floor(Math.random() * (50 - 10 + 1)) + 10;
            if (this.state.utilities) monthData.utilities = Math.floor(Math.random() * (50 - 10 + 1)) + 10;
            if (this.state.transport) monthData.transport = Math.floor(Math.random() * (50 - 10 + 1)) + 10;
            if (this.state.travel) monthData.travel = Math.floor(Math.random() * (50 - 10 + 1)) + 10;
    
            lineChartData.push(monthData);
        });
        return lineChartData;
    }

    generatePieChartData = () => {
        const { entertainment, education, shopping, care, health, food, gifts, utilities, transport, travel } = this.state;
        const pieChartData = [];

        if (entertainment) pieChartData.push({ label: 'Entertainment', value: 5, color: this.state.entertainmentC });
        if (education) pieChartData.push({ label: 'Education', value: 12, color: this.state.educationC });
        if (shopping) pieChartData.push({ label: 'Shopping', value: 15, color: this.state.shoppingC });
        if (care) pieChartData.push({ label: 'Personal Care', value: 4, color: this.state.careC });
        if (health) pieChartData.push({ label: 'Health and Fitness', value: 9, color: this.state.healthC });
        if (food) pieChartData.push({ label: 'Food', value: 18, color: this.state.foodC });
        if (gifts) pieChartData.push({ label: 'Gifts', value: 6, color: this.state.giftsC });
        if (utilities) pieChartData.push({ label: 'Utilities', value: 16, color: this.state.utilitiesC });
        if (transport) pieChartData.push({ label: 'Transport', value: 30, color: this.state.transportC });
        if (travel) pieChartData.push({ label: 'Travel', value: 22, color: this.state.travelC });

        return pieChartData;
    }

    generateBarChartData = (monthList) => {
        const { entertainment, education, shopping, care, health, food, gifts, utilities, transport, travel } = this.state;
        const barChartData = [];
        if (entertainment) barChartData.push({ label: 'Entertainment', data: this.randomNumberList(monthList.length), stack: 'A', color: this.state.entertainmentC });
        if (education) barChartData.push({ label: 'Education', data: this.randomNumberList(monthList.length), stack: 'A', color: this.state.educationC });
        if (shopping) barChartData.push({ label: 'Shopping', data: this.randomNumberList(monthList.length), stack: 'A', color: this.state.shoppingC });
        if (care) barChartData.push({ label: 'Personal Care', data: this.randomNumberList(monthList.length), stack: 'A', color: this.state.careC });
        if (health) barChartData.push({ label: 'Health / Fitness', data: this.randomNumberList(monthList.length), stack: 'A', color: this.state.healthC });
        if (food) barChartData.push({ label: 'Food / Dining', data: this.randomNumberList(monthList.length), stack: 'A', color: this.state.foodC });
        if (gifts) barChartData.push({ label: 'Gifts', data: this.randomNumberList(monthList.length), stack: 'A', color: this.state.giftsC });
        if (utilities) barChartData.push({ label: 'Utilities', data: this.randomNumberList(monthList.length), stack: 'A', color: this.state.utilitiesC });
        if (transport) barChartData.push({ label: 'Transport', data: this.randomNumberList(monthList.length), stack: 'A', color: this.state.transportC });
        if (travel) barChartData.push({ label: 'Travel', data: this.randomNumberList(monthList.length), stack: 'A', color: this.state.travelC });
        return barChartData;
    };

    render() {
        const { startMonth, endMonth } = this.props;
        const { monthList, randomNumbers } = this.state;
        let selectedGraph;

        const stackStrategy = {
            stack: 'total',
            area: true,
            stackOffset: 'none', // To stack 0 on top of others
        };
        const keyToLabel = {
            entertainment: 'Emmisions from Entertainment',
            education: 'Emmissions from Education',
            shopping: 'Emmissions from Shopping',
            care: 'Emmissions from Personal Care',
            health: 'Emmissions from Health and Fitness',
            food: 'Emmissions from Food',
            gifts: 'Emmissions from Gifts',
            utilities: 'Emmissions from Utilities',
            transport: 'Emmissions from Transport',
            travel: 'Emmissions from Travel',
          };
          
          const colors = {
            entertainment: '#D00000',
            education: '#A657AE',
            shopping: '#399E5A',
            care: '#60B2E5',
            health: '#EE7B30',
            food: '#034732',
            gifts: '#F6F740',
            utilities: '#131cd1',
            transport: '#2D93AD',
            travel: '#37FF8B',
          };

        // Determine which graph is shown based on graphSelection
        if (monthList.length === randomNumbers.length) {
            if (this.state.graphSelection === 1) {
            selectedGraph = 
            <div className={styles.graph_container_pie}>
                <PieChart
                series = {[
                    {
                        data: this.generatePieChartData(),
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
                selectedGraph = 
                <div className={styles.graph_container_line}>
                    <LineChart
                        xAxis={[
                            { 
                            scaleType: 'point', 
                            dataKey: 'month' 
                            }]}
                        series={Object.keys(keyToLabel).map((key) => ({
                            dataKey: key,
                            label: keyToLabel[key],
                            color: colors[key],
                            showMark: false,
                            ...stackStrategy,
                            connectNulls: true,
                            }))}
                            dataset={this.generateLineChartData()}
                        width={700}
                        height={400}
                        slotProps={{ legend: { hidden: Hidden } }}
                    />
                </div>;
                
            } else if (this.state.graphSelection === 3) {
                selectedGraph = 
                <div className={styles.graph_container_bar}>
                    <BarChart
                        series={this.generateBarChartData(monthList)}
                        width={700}
                        height={400}
                        slotProps={{ legend: { hidden: Hidden } }}
                    />
                </div>;
            }
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
                                            style={{ borderColor: this.state.entertainment ? this.state.entertainmentC : 'black' }} 
                                            onClick={() => this.handleCategoryButtonClick('entertainment')}>
                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                <div className={styles.graph_category_circle} 
                                                    style={{ backgroundColor: this.state.entertainment ? this.state.entertainmentC : 'rgb(172, 172, 172)' }}>
                                                </div>
                                                <div style={{ marginLeft: '10px' }}>
                                                    Entertainment
                                                </div>
                                            </div>
                                        </button>
                                    </th>
                                    <th style={{ width: '10%' }}>
                                        <button className={styles.graph_category_btn} 
                                            style={{ borderColor: this.state.education ? this.state.educationC : 'black' }} 
                                            onClick={() => this.handleCategoryButtonClick('education')}>
                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                <div className={styles.graph_category_circle} 
                                                    style={{ backgroundColor: this.state.education ? this.state.educationC : 'rgb(172, 172, 172)' }}>
                                                </div>
                                                <div style={{ marginLeft: '10px' }}>
                                                    Education
                                                </div>
                                            </div>
                                        </button>
                                    </th>
                                    <th style={{ width: '10%' }}>
                                        <button className={styles.graph_category_btn} 
                                            style={{ borderColor: this.state.shopping ? this.state.shoppingC : 'black' }} 
                                            onClick={() => this.handleCategoryButtonClick('shopping')}>
                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                <div className={styles.graph_category_circle} 
                                                    style={{ backgroundColor: this.state.shopping ? this.state.shoppingC : 'rgb(172, 172, 172)' }}>
                                                </div>
                                                <div style={{ marginLeft: '10px' }}>
                                                    Shopping
                                                </div>
                                            </div>
                                        </button>
                                    </th>
                                    <th style={{ width: '10%' }}>
                                        <button className={styles.graph_category_btn} 
                                            style={{ borderColor: this.state.care ? this.state.careC : 'black' }}
                                            onClick={() => this.handleCategoryButtonClick('care')}>
                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                <div className={styles.graph_category_circle} 
                                                    style={{ backgroundColor: this.state.care ? this.state.careC : 'rgb(172, 172, 172)' }}>
                                                </div>
                                                <div style={{ marginLeft: '10px' }}>
                                                    Personal Care
                                                </div>
                                            </div>
                                        </button>
                                    </th>
                                    <th style={{ width: '10%' }}>
                                        <button className={styles.graph_category_btn} 
                                            style={{ borderColor: this.state.health ? this.state.healthC : 'black' }}
                                            onClick={() => this.handleCategoryButtonClick('health')}>
                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                <div className={styles.graph_category_circle} 
                                                style={{ backgroundColor: this.state.health ? this.state.healthC : 'rgb(172, 172, 172)' }}>
                                                </div>
                                                <div style={{ marginLeft: '10px' }}>
                                                    Health / Fitness
                                                </div>
                                            </div>
                                        </button>
                                    </th>
                                    <th style={{ width: '10%' }}>
                                        <button className={styles.graph_category_btn} 
                                            style={{ borderColor: 'green' }}
                                            onClick={() => this.handleAllOnClick()}>
                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                <div className={styles.graph_category_circle} 
                                                style={{ backgroundColor: 'green' }}>
                                                </div>
                                                <div style={{ marginLeft: '10px' }}>
                                                    All On
                                                </div>
                                            </div>
                                        </button>
                                    </th>
                                </tr>
                                <tr>
                                    <th style={{ width: '10%' }}>
                                        <button className={styles.graph_category_btn} 
                                            style={{ borderColor: this.state.food ? this.state.foodC : 'black' }}
                                            onClick={() => this.handleCategoryButtonClick('food')}>
                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                <div className={styles.graph_category_circle} 
                                                style={{ backgroundColor: this.state.food ? this.state.foodC : 'rgb(172, 172, 172)' }}>
                                                </div>
                                                <div style={{ marginLeft: '10px' }}>
                                                    Food / Dining
                                                </div>
                                            </div>
                                        </button>
                                    </th>
                                    <th style={{ width: '10%' }}>
                                        <button className={styles.graph_category_btn} 
                                            style={{ borderColor: this.state.gifts ? this.state.giftsC : 'black' }}
                                            onClick={() => this.handleCategoryButtonClick('gifts')}>
                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                <div className={styles.graph_category_circle} 
                                                style={{ backgroundColor: this.state.gifts ? this.state.giftsC : 'rgb(172, 172, 172)' }}>
                                                </div>
                                                <div style={{ marginLeft: '10px' }}>
                                                    Gifts
                                                </div>
                                            </div>
                                        </button>
                                    </th>
                                    <th style={{ width: '10%' }}>
                                        <button className={styles.graph_category_btn} 
                                            style={{ borderColor: this.state.utilities ? this.state.utilitiesC : 'black' }}
                                            onClick={() => this.handleCategoryButtonClick('utilities')}>
                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                <div className={styles.graph_category_circle} 
                                                style={{ backgroundColor: this.state.utilities ? this.state.utilitiesC : 'rgb(172, 172, 172)' }}>
                                                </div>
                                                <div style={{ marginLeft: '10px' }}>
                                                    Utilities
                                                </div>
                                            </div>
                                        </button>
                                    </th>
                                    <th style={{ width: '10%' }}>
                                        <button className={styles.graph_category_btn} 
                                            style={{ borderColor: this.state.transport ? this.state.transportC : 'black' }}
                                            onClick={() => this.handleCategoryButtonClick('transport')}>
                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                <div className={styles.graph_category_circle} 
                                                style={{ backgroundColor: this.state.transport ? this.state.transportC : 'rgb(172, 172, 172)' }}>
                                                </div>
                                                <div style={{ marginLeft: '10px' }}>
                                                    Transport
                                                </div>
                                            </div>
                                        </button>
                                    </th>
                                    <th style={{ width: '10%' }}>
                                        <button className={styles.graph_category_btn} 
                                            style={{ borderColor: this.state.travel ? this.state.travelC : 'black' }}
                                            onClick={() => this.handleCategoryButtonClick('travel')}>
                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                <div className={styles.graph_category_circle} 
                                                style={{ backgroundColor: this.state.travel ? this.state.travelC : 'rgb(172, 172, 172)' }}>
                                                </div>
                                                <div style={{ marginLeft: '10px' }}>
                                                    Travel
                                                </div>
                                            </div>
                                        </button>
                                    </th>
                                    <th style={{ width: '10%' }}>
                                        <button className={styles.graph_category_btn} 
                                            style={{ borderColor: 'red' }}
                                            onClick={() => this.handleAllOffClick()}>
                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                <div className={styles.graph_category_circle} 
                                                style={{ backgroundColor: 'red' }}>
                                                </div>
                                                <div style={{ marginLeft: '10px' }}>
                                                    All Off
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