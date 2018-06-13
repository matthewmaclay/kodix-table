import React, { Component } from 'react';
import Header from './components/header.js';
import Panel from './components/panel.js';
import Footer from './components/footer.js';

import './App.css'
class App extends Component {
  constructor(props){
    super(props);
    this.deleteItem = this.deleteItem.bind(this);
    this.addItem = this.addItem.bind(this);
    this.closePopup = this.closePopup.bind(this);
    this.showPopup = this.showPopup.bind(this);
    this.state={
      loading:true,
      cars:[],
      showPopup:false
    }
  }
  componentDidMount(){
    const request = new XMLHttpRequest();
    request.onreadystatechange = () =>{
      if( request.readyState === 4 && request.status === 200 ){
        const cars = JSON.parse(request.responseText);
        this.setState({
          loading:false,
          cars:cars,
          maxId:cars[cars.length-1].id
        });
      }
    }

    request.open('GET' , 'https://rawgit.com/Varinetz/e6cbadec972e76a340c41a65fcc2a6b3/raw/90191826a3bac2ff0761040ed1d95c59f14eaf26/frontend_test_table.json');
    request.send();
  }
  deleteItem(e){
    const idDeleteItem = e.target.id;
    const cars = this.state.cars;
    const newArrCars = [];
    console.log(cars);
    cars.forEach((item, i, arr)=>{
      // eslint-disable-next-line
      if(item.id != idDeleteItem){
        newArrCars.push(item);
      }
    });
    this.setState({
      cars:newArrCars
    });
    }
    closePopup(){
      this.setState({
        showPopup:false
      });
    }
    addItem(item){
      const newItem = {...item,id:this.state.maxId+1};
        this.setState((prevState, props) => ({
          cars: [...prevState.cars,newItem],
          maxId:prevState.maxId+1
        }));
    }
   showPopup(){
      this.setState({
        showPopup:true
      })
    }
  render() {
    let price = 0;
    const table = this.state.cars.map((item,num)=>{
      price += item.price;
      return(
        <tr className="car" key={ item.id }>
          <td colspan="5" className="car__title">{ item.title }<p className="car__description">{ item.description }</p></td>
          <td className="car__year">{ item.year }</td>
          <td className="car__color"><div style={{ backgroundColor:item.color }}></div></td>
          <td colspan="2" className="car__status">{ (item.status === "in_stock")? "В наличии" :(item.status === "out_of_stock")?"Нет в наличии":"Ожидается" }</td>
          <td colspan="2" className="car__price">{ item.price+" руб." }</td>
          <td colspan="2" ><button id={ item.id } className="car__delBtn" onClick={ this.deleteItem }>Удалить</button></td>
        </tr>
    )});
     let priceWithTax = price*1.13 ;
     priceWithTax = priceWithTax.toFixed(2);
    return (
    <div className="contain1" >
      <div>
        <Header />
        <div className="caramba"><p>¡Ay caramba!</p></div>
        <Panel addItem={ this.addItem } />
        <div className="auto"><p>АВТОМОБИЛИ В НАЛИЧИИ</p></div>
          <div className="showCars">
            { ( this.state.loading ) ? 
              <div className="loading">
              <p><b>Загрузка</b></p>
              <img src="loading.gif" alt="loading"></img>
              </div>:
              <table>
                <thead>
                  <tr>
                    <th colspan="5" >Название</th>
                    <th>Год</th>
                    <th>Цвет</th>
                    <th colspan="2">Статус</th>
                    <th colspan="2">Цена</th>
                    <th colspan="2"></th>
                  </tr>
                </thead>
                <tbody>
                  { table }
                  <tr className="all">
                    <td className="empty"colSpan="7"></td>
                    <td colspan="2"><b>Итого</b></td>
                    <td colspan="3">{ price+" руб." }</td>
                  </tr>
                  <tr className="all">
                    <td className="empty"colSpan="7"></td>
                    <td colspan="2"><b>С налогом</b></td>
                    <td colspan="3">{ priceWithTax+" руб." }</td>
                  </tr>
                </tbody>
              </table>
            }
          </div>
        </div>
        <Footer />
      </div>

    );
  }
}

export default App;
// https://rawgit.com/Varinetz/e6cbadec972e76a340c41a65fcc2a6b3/raw/90191826a3bac2ff0761040ed1d95c59f14eaf26/frontend_test_table.json
