// History.js
import React, { Component } from 'react';
import moment from 'moment';
import styles from '../assets/styles/History.module.css';
import { useHistory, useLocation } from 'react-router-dom';
import { PieChart, LineChart, BarChart } from '@mui/x-charts';
import { Hidden } from '@mui/material';
import { Logo, GoBackBtn, SettingBtn, Footer } from './CommonComponents';
import * as API from '../services/api';

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
      randomNumbers: [],
      // data for each graph
      dataForPie: [],
      dataForLine: [],
      dataForBar: [],
      categoryState: this.returnCategoryState(true),
      loading: true,
    };
  }

  // return a list of strings representing each category
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

  // return an object, each attribute is a category with value representing color
  getColors() {
    return {
      'Entertainment': '#D00000',
      'Education': '#A657AE',
      'Shopping': '#399E5A',
      'Personal Care': '#60B2E5',
      'Health & Fitness': '#EE7B30',
      'Food & Dining': '#034732',
      'Gifts & Donations': '#F6F740',
      'Bills & Utilities': '#131cd1',
      'Auto & Transport': '#2D93AD',
      'Travel': '#37FF8B'
    };
  }

  getBackgroundColor(category) {
    if (this.state.categoryState[category]) {
      return this.getColors()[category]
    }
    return 'rgb(172, 172, 172)'
  }

  componentDidMount() {
    this.generatePieChartData();
    this.generateLineChartData();
    this.generateBarChartData();
    setTimeout(() => {
      this.setState({ loading: false }); // After 3 seconds, set loading to false
    }, 800);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.startMonth !== this.props.startMonth || prevProps.endMonth !== this.props.endMonth
      || prevState.categoryState !== this.state.categoryState) {
      this.generatePieChartData();
      this.generateLineChartData();
      this.generateBarChartData();
    }
  }

  changeSelection = (sel) => {
    console.log("Changing selection to:", sel);
    this.setState({ graphSelection: sel });
  }

  // return an object, each of the attribute is an category with value bool
  returnCategoryState(bool) {
    const categories = this.getAllCategories();
    return categories.reduce((acc, item) => {
      acc[item] = bool;
      return acc;
    }, {});
  }

  handleClickAllOn = () => {
    this.setState({ categoryState: this.returnCategoryState(true) });
  }

  handleClickAllOf = () => {
    this.setState({ categoryState: this.returnCategoryState(false) });
  }

  // change the state of a given category
  handleClickCategoryButton = (category) => {
    this.setState(prevState => ({
      categoryState: {
        ...prevState.categoryState,
        [category]: !prevState.categoryState[category]
      }
    }));
  };

  // set the monthList as a list of date representing each month
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

  // generate data to dataForPie based on the current monthlist
  generatePieChartData = async () => {
    const monthList = this.generateMonthList(); // generate a month list
    const categories = this.getAllCategories()     // get a list of categories
    const colors = this.getColors()             // get an object of categories and colors
    let ret = categories.map(item => ({         // initialization of return data
      value: 0,
      label: item,
      color: colors[item]
    }));
    // traverse all the dates of dateList
    for (const date of monthList) {
      // call backend API to get carbon score of in category of a certain month
      const obj = await API.getCarbonScoreByMonthInCategory(this.props.id, date.getFullYear(), date.getMonth() + 1);

      // for each category in ret, if the category is selected, add the corresponding value
      ret.forEach(item => {
        if (this.state.categoryState[item.label])
          item.value += obj[item.label]
      })
    }
    this.setState({ dataForPie: ret })
  }

  generateLineChartData = async () => {
    const monthList = this.generateMonthList(); // generate a month list
    let ret = []                                // initialization of return data
    // traverse all the dates of dateList
    for (const date of monthList) {
      // call backend API to get carbon score of in category of a certain month
      const obj = await API.getCarbonScoreByMonthInCategory(this.props.id, date.getFullYear(), date.getMonth() + 1);
      obj.month = `${date.getMonth() + 1}/${date.getFullYear()}`
      // traverse all categories, if not selected, set the value of it to 0 in object
      this.getAllCategories().forEach(item => {
        if (!this.state.categoryState[item]) {
          obj[item] = 0
        }
      })
      ret.push(obj)
    }
    this.setState({ dataForLine: ret })
  }

  // generate data to dataForPie based on the current monthlist
  generateBarChartData = async () => {
    const monthList = this.generateMonthList(); // generate a month list
    const categories = this.getAllCategories()     // get a list of categories
    const colors = this.getColors()             // get an object of categories and colors
    let ret = categories.map(item => ({         // initialization of return data
      data: [],
      stack: 'A',
      label: item,
      color: colors[item]
    }));
    for (const date of monthList) {
      // call backend API to get carbon score of in category of a certain month
      const obj = await API.getCarbonScoreByMonthInCategory(this.props.id, date.getFullYear(), date.getMonth() + 1);
      ret.forEach(item => {
        if (this.state.categoryState[item.label])
          item.data.push(obj[item.label])
      })
    }
    this.setState({ dataForBar: ret })
  };

  // generate a lsit of string representing each month for bar chart
  generateBarChartXLabel() {
    const monthList = this.generateMonthList();
    return monthList.map(item => `${item.getMonth() + 1}/${item.getFullYear()}`);
  }

  render() {
    let selectedGraph;

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
      // Determine which graph is shown based on graphSelection
      if (this.state.graphSelection === 1) {
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
              height={300}
              slotProps={{ legend: { hidden: Hidden } }}
            />
          </div>;
      } else if (this.state.graphSelection === 2) {
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
              height={400}
              slotProps={{ legend: { hidden: Hidden } }}
            />
          </div>;

      } else if (this.state.graphSelection === 3) {
        selectedGraph =
          <div className={styles.graph_container_bar}>
            <BarChart
              xAxis={[{ data: this.generateBarChartXLabel(), scaleType: 'band' }]}
              series={this.state.dataForBar}
              width={700}
              height={400}
              slotProps={{ legend: { hidden: Hidden } }}
            />
          </div>;
      }
    }




    return (
      <div className={styles.graphs_container}>
        <div className={styles.picker_container}>
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
        </div>
        <div className={styles.graphs_inner_container}>
          {selectedGraph}

          <div className={styles.graph_category_container}>
            <table className={styles.graph_category_picker}>
              <thead>
                <tr>
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
                    <button className={styles.graph_category_btn}
                      style={{ borderColor: 'green' }}
                      onClick={() => this.handleClickAllOn()}>
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
                    <button className={styles.graph_category_btn}
                      style={{ borderColor: 'red' }}
                      onClick={() => this.handleClickAllOf()}>
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
  return (
    <div className={styles.head_bar}>
      <GoBackBtn name={name} id={id} />
      <Logo />
      
      <SettingBtn name={name} id={id} />
    </div>
  );
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
    const { name, id } = this.props;
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
            id={id}
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