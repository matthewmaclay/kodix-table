import React, { Component } from 'react';
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
    addItem(){
      if( this.refs.title.value && this.refs.description.value && this.refs.year.value && this.refs.color.value && this.refs.status.value && this.refs.price.value ){
        const newItem ={
          id:this.state.maxId+1,
          title:this.refs.title.value,
          description:this.refs.description.value,
          year:this.refs.year.value,
          color:this.refs.color.value,
          status:this.refs.status.value,
          price:Number(this.refs.price.value)
        }
        this.setState((prevState, props) => ({
          cars: [...prevState.cars,newItem],
          maxId:prevState.maxId+1
        }));
        this.closePopup();
      }else{
        alert('Необходимо заполнить все поля');
      }
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
     priceWithTax = priceWithTax.toFixed(2);
    return (
      <div className="App">
        <div className="addCar">
          <svg onClick={ this.showPopup } xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6 13h-5v5h-2v-5h-5v-2h5v-5h2v5h5v2z"/></svg>
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
        {   
          (this.state.showPopup)?     
          <div className="Popup">
            <div className="Popup_header">
              <p>Добавить</p>
              <button onClick={ this.closePopup }>
                <svg xmlns="http://www.w3.org/2000/svg" fill="#c8385a" width="24" height="24" viewBox="0 0 24 24"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"/></svg>
              </button>
            </div>
            <div className="Popup_content">
              <div className="inputs">
                <div><div>Название</div><input ref="title" placeholder="Матвейкин Сергей Михайлович" type="text" /></div>
                <div><div>Описание</div><input ref="description" type="text" /></div>
                <div><div>Год</div><input ref="year" type="number" /></div>
                <div><div>Цвет</div><input ref="color" type="text" /></div>
                <div><div>Статус</div><input ref="status" type="text" /></div>
                <div><div>Цена</div><input ref="price" type="number" /></div>
              </div>
            </div>
            <div className="Popup_footer">
              <button onClick={ this.addItem }>
                <svg xmlns="http://www.w3.org/2000/svg" fill="#9acd32" width="24" height="24" viewBox="0 0 24 24"><path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"/></svg>
               </button>
            </div>
          </div>:
          ""
        }
        { (this.state.showPopup)?<div className="bgPopup"><img src="iam.png" alt="iam" /></div>:"" }
      </div>

    );
  }
}

export default App;
// https://rawgit.com/Varinetz/e6cbadec972e76a340c41a65fcc2a6b3/raw/90191826a3bac2ff0761040ed1d95c59f14eaf26/frontend_test_table.json
