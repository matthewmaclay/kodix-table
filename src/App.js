import React, { Component } from 'react';
import './App.css'

class App extends Component {
  constructor(props){
    super(props);
    this.deleteItem = this.deleteItem.bind(this);
    this.state={
      loading:true,
      cars:[]
    }
  }
  componentDidMount(){
    const request = new XMLHttpRequest();
    request.onreadystatechange = () =>{
      if( request.readyState === 4 && request.status === 200 ){
        this.setState({
          loading:false,
          cars:JSON.parse(request.responseText)
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
      if(item.id != idDeleteItem){
        newArrCars.push(item);
      }
    });
    this.setState({
      cars:newArrCars
    });

  }
  render() {
    let price = 0;
    const table = this.state.cars.map((item,num)=>{
      price += item.price;
      return(
        <tr key={ item.id }>
          <td data-label="ID">{ item.id }</td>
          <td data-label="Название">{ item.title }</td>
          <td data-label="Описание">{ item.description }</td>
          <td data-label="Год">{ item.year }</td>
          <td data-label="Цвет">{ item.color }</td>
          <td data-label="Статус">{ item.status }</td>
          <td data-label="Цена">{ item.price }</td>
          <td><div id={ item.id } className="delBtn" onClick={ this.deleteItem }>Удалить</div></td>
        </tr>
    )});
     let priceWithTax = price*1.13 ;
     priceWithTax = priceWithTax.toFixed(0);
    return (
      <div className="App">
        <div className="addCar">
          
        </div>
        <div className="showCar">
          { ( this.state.loading ) ? 
            <div className="loading">
            <p><b>Загрузка</b></p>
            <img src="loading.gif" alt="loading"></img>
            </div>:
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Название</th>
                  <th>Описание</th>
                  <th>Год</th>
                  <th>Цвет</th>
                  <th>Статус</th>
                  <th>Цена</th>
                </tr>
              </thead>
              <tbody>
                { table }
                <tr>
                  <td colSpan="5"></td>
                  <td><b>Итого</b></td>
                  <td>{ price }</td>
                </tr>
                <tr>
                  <td colSpan="5"></td>
                  <td><b>С налогом</b></td>
                  <td>{ priceWithTax }</td>
                </tr>
              </tbody>
            </table>
          }
        </div>
      </div>
    );
  }
}

export default App;
// https://rawgit.com/Varinetz/e6cbadec972e76a340c41a65fcc2a6b3/raw/90191826a3bac2ff0761040ed1d95c59f14eaf26/frontend_test_table.json
