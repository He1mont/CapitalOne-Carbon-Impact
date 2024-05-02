// History.js
import React, { Component } from 'react';
import { useLocation } from 'react-router-dom';
import styles from '../assets/styles/History.module.css';                 // CSS modules
import { Logo, GoBackBtn, SettingBtn, Footer } from './CommonComponents'; // Reused components
import * as API from '../services/api';   // API functions for server-side interactions
import moment from 'moment';              // External libraries
import { Hidden } from '@mui/material';   // MUI Components
import { PieChart, LineChart, BarChart } from '@mui/x-charts';

/**
 * Month selection component:
 * Constructs a set of months for the user to click through.
 */
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
        {/* Table layout to arrange month selectors horizontally. */}
        <table className={styles.month_select}>
          <tbody>
            <tr>
              {/* Buttons and displays for selecting the start month. */}
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

              {/* Static 'To' label for visual separation between start and end month selectors. */}
              <th style={{ width: '17%', textAlign: 'center' }}>
                To
              </th>

              {/* Buttons and displays for selecting the end month. */}
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

/**
 * Graphs component:
 * Manages the display of different types of graphs and category selection.
 */
class Graphs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      graphSelection: 1,
      randomNumbers: [],
      // data for each graph
      dataForPie: [],
      dataForLine: [],
      dataForBar: [],
      categoryState: this.returnCategoryState(true),
      loading: true,
      colorTheme: 0
    };
  }

  // Return a list of strings representing each category
  getAllCategories() {
    return [
      'Entertainment',
      'Education',
      'Shopping',
      'Personal Care',
      'Health & Fitness',
      'Food & Dining',
      'Gifts & Donations',
      'Bills & Utilities',
      'Auto & Transport',
      'Travel'
    ];
  }

  // Return an object, each attribute is a category with value representing color
  getColors() {
    if (this.state.colorTheme === 0) {
      return {
        'Entertainment': '#9e0142',
        'Education': '#e66100',
        'Shopping': '#ffbd08',
        'Personal Care': '#10d003',
        'Health & Fitness': '#00d0c0',
        'Food & Dining': '#7999ff',
        'Gifts & Donations': '#006fff',
        'Bills & Utilities': '#3c38ff',
        'Auto & Transport': '#b200ff',
        'Travel': '#cc2ca3'
      };
    } else if (this.state.colorTheme === 1) {
      return {
        'Entertainment': '#0051a8',
        'Education': '#006cdd',
        'Shopping': '#3b84ff',
        'Personal Care': '#8fabff',
        'Health & Fitness': '#c1ccff',
        'Food & Dining': '#ffe672',
        'Gifts & Donations': '#ecd355',
        'Bills & Utilities': '#e3aa46',
        'Auto & Transport': '#c4922a',
        'Travel': '#826219'
      };
    } else if (this.state.colorTheme === 2) {
      return {
        'Entertainment': '#8b373b',
        'Education': '#c74c52',
        'Shopping': '#ec5e64',
        'Personal Care': '#ff7c83',
        'Health & Fitness': '#ff9ea9',
        'Food & Dining': '#ffd0de',
        'Gifts & Donations': '#87cfe0',
        'Bills & Utilities': '#51bac9',
        'Auto & Transport': '#31a1ae',
        'Travel': '#31a1ae'
      };
    } else if (this.state.colorTheme === 3) {
      return {
        'Entertainment': '#e0e0e0',
        'Education': '#e0e0e0',
        'Shopping': '#a7a8a9',
        'Personal Care': '#898a8a',
        'Health & Fitness': '#717171',
        'Food & Dining': '#606161',
        'Gifts & Donations': '#525252',
        'Bills & Utilities': '#434444',
        'Auto & Transport': '#2f2f2f',
        'Travel': '#040404'
      };
    }
  }

  // Fetches the background color for a given category
  getBackgroundColor(category) {
    if (this.state.categoryState[category]) {
      return this.getColors()[category]
    }
    return 'rgb(172, 172, 172)'
  }

  // Loads initial data for all chart types
  async componentDidMount() {
    const data = await API.getAccountByID(this.props.id)
    const colorTheme = data[0].colorMode

    this.setState({ colorTheme: colorTheme })
    this.generatePieChartData();
    this.generateLineChartData();
    this.generateBarChartData();
    setTimeout(() => {
      this.setState({ loading: false }); // After 3 seconds, set loading to false
    }, 800);
  }

  // Reacts to changes in props or state
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.startMonth !== this.props.startMonth || prevProps.endMonth !== this.props.endMonth
      || prevState.categoryState !== this.state.categoryState) {
      this.generatePieChartData();
      this.generateLineChartData();
      this.generateBarChartData();
    }
  }

  // Sets the graph selection to user choice
  changeSelection = (sel) => {
    console.log("Changing selection to:", sel);
    this.setState({ graphSelection: sel });
  }

  // Initializes all categories to a specified boolean state
  returnCategoryState(bool) {
    const categories = this.getAllCategories();
    return categories.reduce((acc, item) => {
      acc[item] = bool;
      return acc;
    }, {});
  }

  // Enables all categories
  handleClickAllOn = () => {
    this.setState({ categoryState: this.returnCategoryState(true) });
  }

  // Disables all categories
  handleClickAllOf = () => {
    this.setState({ categoryState: this.returnCategoryState(false) });
  }

  // Toggles the state for a single category
  handleClickCategoryButton = (category) => {
    this.setState(prevState => ({
      categoryState: {
        ...prevState.categoryState,
        [category]: !prevState.categoryState[category]
      }
    }));
  };

  // Generates a list of months between the start and end month
  generateMonthList() {
    const { startMonth, endMonth } = this.props;
    const start = startMonth.toDate();
    const end = endMonth.toDate();
    const monthList = [];

    let currentDate = new Date(start);
    while (currentDate <= end) {
      monthList.push(currentDate);
      currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
    }
    return monthList
  }

  // Generate data to dataForPie based on the current monthlist
  generatePieChartData = async () => {
    const monthList = this.generateMonthList(); // Generate a month list
    const categories = this.getAllCategories()  // Get a list of categories
    const colors = this.getColors()             // Get an object of categories and colors
    let ret = categories.map(item => ({         // Initialization of return data
      value: 0,
      label: item,
      color: colors[item]
    }));
    // Traverse all the dates of dateList
    for (const date of monthList) {
      // Call backend API to get carbon score of in category of a certain month
      const obj = await API.getCarbonScoreByMonthInCategory(this.props.id, date.getFullYear(), date.getMonth());

      // For each category in ret, if the category is selected, add the corresponding value
      ret.forEach(item => {
        if (this.state.categoryState[item.label])
          item.value += obj[item.label]
      })
    }
    this.setState({ dataForPie: ret })
  }

  // Generate data to dataForLine based on the current monthlist
  generateLineChartData = async () => {
    const monthList = this.generateMonthList(); // Generate a month list
    let ret = []                                // Initialization of return data
    // Traverse all the dates of dateList
    for (const date of monthList) {
      // Call backend API to get carbon score of in category of a certain month
      const obj = await API.getCarbonScoreByMonthInCategory(this.props.id, date.getFullYear(), date.getMonth());
      obj.month = `${date.getMonth() + 1}/${date.getFullYear()}`

      // Traverse all categories, if not selected, set the value of it to 0 in object
      this.getAllCategories().forEach(item => {
        if (!this.state.categoryState[item]) {
          obj[item] = 0
        }
      })
      ret.push(obj)
    }
    this.setState({ dataForLine: ret })
  }

  // Generate data to dataForBar based on the current monthlist
  generateBarChartData = async () => {
    const monthList = this.generateMonthList()  // Generate a month list
    const categories = this.getAllCategories()  // Get a list of categories
    const colors = this.getColors()             // Get an object of categories and colors
    let ret = categories.map(item => ({         // Initialization of return data
      data: [],
      stack: 'A',
      label: item,
      color: colors[item]
    }));
    for (const date of monthList) {
      // Call backend API to get carbon score of in category of a certain month
      const obj = await API.getCarbonScoreByMonthInCategory(this.props.id, date.getFullYear(), date.getMonth());
      ret.forEach(item => {
        if (this.state.categoryState[item.label])
          item.data.push(obj[item.label])
      })
    }
    this.setState({ dataForBar: ret })
  };

  // Creates labels for the X-axis of the bar chart
  generateBarChartXLabel() {
    const monthList = this.generateMonthList();
    return monthList.map(item => `${item.getMonth() + 1}/${item.getFullYear()}`);
  }

  render() {
    let selectedGraph;

    // Configuration for how the data should be stacked in line and bar charts.
    const stackStrategy = {
      stack: 'total',
      area: true,
      stackOffset: 'none', // To stack 0 on top of others
    };

    if (this.state.loading) {
      // Render the spinner if loading is true
      selectedGraph = (
        <div className={styles.spinnerContainer}>
          <div className={styles.spinner}></div>
        </div>
      );
    } else {
      // Selects the graph to display based on the current graph selection state.
      if (this.state.graphSelection === 1) {
        // Renders a pie chart if the first option is selected.
        selectedGraph =
          <div className={styles.graph_container_pie}>
            <PieChart
              series={[
                {
                  data: this.state.dataForPie,
                  cornerRadius: 4,
                  paddingAngle: 1,
                  innerRadius: 20,
                }
              ]}
              width={400}
              height={250}
              slotProps={{ legend: { hidden: Hidden } }}
            />
          </div>;

      } else if (this.state.graphSelection === 2) {
        // Renders a line chart if the second option is selected.
        selectedGraph =
          <div className={styles.graph_container_line}>
            <LineChart
              xAxis={[{
                scaleType: 'point',
                dataKey: 'month'
              }]}
              series={this.getAllCategories().map((key) => ({
                dataKey: key,
                label: "emissions from " + key,
                color: this.getColors()[key],
                showMark: false,
                ...stackStrategy,
                connectNulls: true,
              }))}
              dataset={this.state.dataForLine}
              width={700}
              height={350}
              slotProps={{ legend: { hidden: Hidden } }}
            />
          </div>;

      } else if (this.state.graphSelection === 3) {
        // Renders a bar chart if the third option is selected.
        selectedGraph =
          <div className={styles.graph_container_bar}>
            <BarChart
              xAxis={[{ data: this.generateBarChartXLabel(), scaleType: 'band' }]}
              series={this.state.dataForBar}
              width={700}
              height={350}
              slotProps={{ legend: { hidden: Hidden } }}
            />
          </div>;
      }
    }

    return (
      <div className={styles.graphs_container}>
        <div className={styles.picker_container}>
          {/* Table for graph type selection: Pie Chart, Line Graph, Bar Graph */}
          <table className={styles.graphs_picker}>
            <thead>
              <tr>
                <th className={`${styles.graph_selection_heads} ${this.state.graphSelection === 1 ? styles.selected : ''}`}
                  style={{ width: '33%' }} onClick={() => this.changeSelection(1)}>
                  Pie Chart
                </th>
                <th className={`${styles.graph_selection_heads} ${this.state.graphSelection === 2 ? styles.selected : ''}`}
                  style={{ width: '34%' }} onClick={() => this.changeSelection(2)}>
                  Line Graph
                </th>
                <th className={`${styles.graph_selection_heads} ${this.state.graphSelection === 3 ? styles.selected : ''}`}
                  style={{ width: '33%' }} onClick={() => this.changeSelection(3)}>
                  Bar Graph
                </th>
              </tr>
            </thead>
          </table>
        </div>
        {/* Displays the currently selected graph */}
        <div className={styles.graphs_inner_container}>
          {selectedGraph}

          {/* Category selection buttons for graph data filtering */}
          <div className={styles.graph_category_container}>
            <table className={styles.graph_category_picker}>
              <thead>
                <tr>
                  {/* Buttons for Entertainment with on/off toggle */}
                  <th style={{ width: '10%' }}>
                    <button className={styles.graph_category_btn}
                      style={{ borderColor: this.state.entertainment ? this.state.entertainmentC : 'black' }}
                      onClick={() => this.handleClickCategoryButton('Entertainment')}>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div className={styles.graph_category_circle}
                          style={{ backgroundColor: this.getBackgroundColor('Entertainment') }}>
                        </div>
                        <div style={{ marginLeft: '10px' }}>
                          Entertainment
                        </div>
                      </div>
                    </button>
                  </th>
                  {/* Buttons for Education with on/off toggle */}
                  <th style={{ width: '10%' }}>
                    <button className={styles.graph_category_btn}
                      style={{ borderColor: this.state.education ? this.state.educationC : 'black' }}
                      onClick={() => this.handleClickCategoryButton('Education')}>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div className={styles.graph_category_circle}
                          style={{ backgroundColor: this.getBackgroundColor('Education') }}>
                        </div>
                        <div style={{ marginLeft: '10px' }}>
                          Education
                        </div>
                      </div>
                    </button>
                  </th>
                  {/* Buttons for Shopping with on/off toggle */}
                  <th style={{ width: '10%' }}>
                    <button className={styles.graph_category_btn}
                      style={{ borderColor: this.state.shopping ? this.state.shoppingC : 'black' }}
                      onClick={() => this.handleClickCategoryButton('Shopping')}>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div className={styles.graph_category_circle}
                          style={{ backgroundColor: this.getBackgroundColor('Shopping') }}>
                        </div>
                        <div style={{ marginLeft: '10px' }}>
                          Shopping
                        </div>
                      </div>
                    </button>
                  </th>
                  {/* Buttons for Personal Care with on/off toggle */}
                  <th style={{ width: '10%' }}>
                    <button className={styles.graph_category_btn}
                      style={{ borderColor: this.state.care ? this.state.careC : 'black' }}
                      onClick={() => this.handleClickCategoryButton('Personal Care')}>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div className={styles.graph_category_circle}
                          style={{ backgroundColor: this.getBackgroundColor('Personal Care') }}>
                        </div>
                        <div style={{ marginLeft: '10px' }}>
                          Personal Care
                        </div>
                      </div>
                    </button>
                  </th>
                  {/* Buttons for Health & Fitness with on/off toggle */}
                  <th style={{ width: '10%' }}>
                    <button className={styles.graph_category_btn}
                      style={{ borderColor: this.state.health ? this.state.healthC : 'black' }}
                      onClick={() => this.handleClickCategoryButton('Health & Fitness')}>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div className={styles.graph_category_circle}
                          style={{ backgroundColor: this.getBackgroundColor('Health & Fitness') }}>
                        </div>
                        <div style={{ marginLeft: '10px' }}>
                          Health / Fitness
                        </div>
                      </div>
                    </button>
                  </th>
                  <th style={{ width: '10%' }}>
                    <div style={{ width: '40px' }}></div>
                  </th>
                  {/* Buttons for All On */}
                  <th style={{ width: '10%' }}>
                    <button className={styles.graph_category_btn}
                      style={{ borderColor: '#073763ff' }}
                      onClick={() => this.handleClickAllOn()}>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div className={styles.graph_category_circle}
                          style={{ backgroundColor: '#073763ff' }}>
                        </div>
                        <div style={{ marginLeft: '10px' }}>
                          All On
                        </div>
                      </div>
                    </button>
                  </th>
                </tr>
                <tr>
                  {/* Buttons for Food & Dining with on/off toggle */}
                  <th style={{ width: '10%' }}>
                    <button className={styles.graph_category_btn}
                      style={{ borderColor: this.state.food ? this.state.foodC : 'black' }}
                      onClick={() => this.handleClickCategoryButton('Food & Dining')}>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div className={styles.graph_category_circle}
                          style={{ backgroundColor: this.getBackgroundColor('Food & Dining') }}>
                        </div>
                        <div style={{ marginLeft: '10px' }}>
                          Food / Dining
                        </div>
                      </div>
                    </button>
                  </th>
                  {/* Buttons for Gifts & Donations with on/off toggle */}
                  <th style={{ width: '10%' }}>
                    <button className={styles.graph_category_btn}
                      style={{ borderColor: this.state.gifts ? this.state.giftsC : 'black' }}
                      onClick={() => this.handleClickCategoryButton('Gifts & Donations')}>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div className={styles.graph_category_circle}
                          style={{ backgroundColor: this.getBackgroundColor('Gifts & Donations') }}>
                        </div>
                        <div style={{ marginLeft: '10px' }}>
                          Gifts
                        </div>
                      </div>
                    </button>
                  </th>
                  {/* Buttons for Bills & Utilities with on/off toggle */}
                  <th style={{ width: '10%' }}>
                    <button className={styles.graph_category_btn}
                      style={{ borderColor: this.state.utilities ? this.state.utilitiesC : 'black' }}
                      onClick={() => this.handleClickCategoryButton('Bills & Utilities')}>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div className={styles.graph_category_circle}
                          style={{ backgroundColor: this.getBackgroundColor('Bills & Utilities') }}>
                        </div>
                        <div style={{ marginLeft: '10px' }}>
                          Utilities
                        </div>
                      </div>
                    </button>
                  </th>
                  {/* Buttons for Auto & Transport with on/off toggle */}
                  <th style={{ width: '10%' }}>
                    <button className={styles.graph_category_btn}
                      style={{ borderColor: this.state.transport ? this.state.transportC : 'black' }}
                      onClick={() => this.handleClickCategoryButton('Auto & Transport')}>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div className={styles.graph_category_circle}
                          style={{ backgroundColor: this.getBackgroundColor('Auto & Transport') }}>
                        </div>
                        <div style={{ marginLeft: '10px' }}>
                          Transport
                        </div>
                      </div>
                    </button>
                  </th>
                  {/* Buttons for Travel with on/off toggle */}
                  <th style={{ width: '10%' }}>
                    <button className={styles.graph_category_btn}
                      style={{ borderColor: this.state.travel ? this.state.travelC : 'black' }}
                      onClick={() => this.handleClickCategoryButton('Travel')}>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div className={styles.graph_category_circle}
                          style={{ backgroundColor: this.getBackgroundColor('Travel') }}>
                        </div>
                        <div style={{ marginLeft: '10px' }}>
                          Travel
                        </div>
                      </div>
                    </button>
                  </th>
                  <th style={{ width: '10%' }}>
                  </th>
                  {/* Buttons for All Off */}
                  <th style={{ width: '10%' }}>
                    <button className={styles.graph_category_btn}
                      style={{ borderColor: '#073763ff' }}
                      onClick={() => this.handleClickAllOf()}>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div className={styles.graph_category_circle}
                          style={{ backgroundColor: '#073763ff' }}>
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

/**
 * Head component:
 * Displays the top part including the logo and GoBack button and a Setting button.
 * @param {string} name - Username of the user.
 * @param {string} id - AccountID of the user.
 */
function Head({ name, id }) {
  return (
    <div className={styles.head_bar}>
      <GoBackBtn name={name} id={id} />
      <Logo />
      <SettingBtn name={name} id={id} />
    </div>
  );
}

/**
 * Mid component:
 * Displays the middle section containing the user's carbon history.
 */
class Mid extends Component {
  state = {
    startMonth: moment(),
    endMonth: moment(),
  };

  // Decreases the start month but ensures it doesn't go before a set minimum date or the current end month.
  decreaseStartMonth = () => {
    const nextMonth = this.state.startMonth.clone().subtract(1, 'month');
    const minDate = moment('2021-01-01');
    if (nextMonth.isSameOrAfter(minDate)) {
      if (nextMonth.isBefore(this.state.endMonth)) {
        this.setState({ startMonth: nextMonth });
      }
    }
  };

  // Increases the start month but ensures it doesn't exceed the end month.
  increaseStartMonth = () => {
    const nextMonth = this.state.startMonth.clone().add(1, 'month');
    if (nextMonth.isSameOrBefore(this.state.endMonth)) {
      this.setState({ startMonth: nextMonth });
    }
  };

  // Decreases the end month but ensures it doesn't go before the start month or a set minimum date.
  decreaseEndMonth = () => {
    const nextMonth = this.state.endMonth.clone().subtract(1, 'month');
    const minDate = moment('2021-01-01');
    if (nextMonth.isSameOrAfter(minDate)) {
      if (nextMonth.isSameOrAfter(this.state.startMonth)) {
        this.setState({ endMonth: nextMonth });
      }
    }
  };

  // Increases the end month freely.
  increaseEndMonth = () => {
    const nextMonth = this.state.endMonth.clone().add(1, 'month');
    if (nextMonth.isSameOrAfter(this.state.startMonth)) {
      this.setState({ endMonth: nextMonth });
    }
  };

  render() {
    const { name, id } = this.props;
    const { startMonth, endMonth } = this.state;

    return (
      <div className={styles.mid_bar}>
        {/* Header display showing the name and title 'Carbon History' */}
        <div className={styles.mid_high}>
          <div className={styles.mid_high_txt_left}>
            <p>{name}</p>
            <h1>Carbon History</h1>
          </div>
          <div className={styles.mid_high_center_container}>
            {/* Component for selecting the range of months */}
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
        {/* Renders the graphs based on selected date range */}
        <div className={styles.mid_low}>
          <Graphs
            id={id}
            startMonth={startMonth}
            endMonth={endMonth}
          />
        </div>
      </div>
    );
  }
}

/**
 * History component:
 * Displays the history page with the header and middle sections.
 */
function History() {
  const location = useLocation();
  const name = location.state?.name || "You need to login";
  const id = location.state?.id;
  return (
    <div>
      <Head name={name} id={id} />
      <Mid name={name} id={id} />
      <Footer />
    </div>
  )
}

export default History;