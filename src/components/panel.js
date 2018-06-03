import React, { Component } from 'react';

class Panel extends Component {
  constructor(props){
    super(props);
    this.state={
      color:null,
      titleEmpty:true,
      yearEmpty:true,
      priceEmpty:true,
      descriptionEmpty:true
    }
    this.choiceColor = this.choiceColor.bind(this);
    this.newItem = this.newItem.bind(this);
    this.checkEmpty = this.checkEmpty.bind(this);
  }
  componentDidMount(){
    document.getElementsByClassName('panel__colors')[0].addEventListener('click',(e)=>{
      const id = e.target.id;
      this.choiceColor(id);
    });
  }
  choiceColor(color){
    this.setState({
      color:color
    });
  }
  newItem(){
  const selectedIndex = this.refs.select.options.selectedIndex;
  const selectedValue = this.refs.select.options[selectedIndex].value;
  if( this.refs.title.value && this.refs.description.value && this.refs.year.value && this.refs.price.value ){
    const newItem ={
      title:this.refs.title.value,
      description:this.refs.description.value,
      year:this.refs.year.value,
      color:this.state.color,
      status:selectedValue,
      price:Number(this.refs.price.value)
    }
      this.refs.title.value="";
      this.refs.description.value="";
      this.refs.year.value="";
      this.refs.price.value="";
    this.props.addItem(newItem);
  }else{
    alert('Необходимо заполнить все поля');
  }
}
  checkEmpty(){
    if(this.refs.title.value){
      this.setState({
        titleEmpty:false
      });
    }
    if(this.refs.description.value){
      this.setState({
        description:false
      });
    }
    if(this.refs.year.value){
      this.setState({
        yearEmpty:false
      });
    }
    if(this.refs.price.value){
      this.setState({
        priceEmpty:false
      });
    }

  }
  render(){
  	return(
  		<div className="panel">
  			<div>
  				<input onBlur={ this.checkEmpty } className="panel__title" ref="title"  type="text" placeholder="Название" />
  				<div>
            <input onBlur={ this.checkEmpty } className="panel__year" ref="year" type="number" placeholder="Год" />
    				<input onBlur={ this.checkEmpty } className="panel__price" ref="price" type="number" placeholder="Цена" />
          </div>
  				<input onBlur={ this.checkEmpty } className="panel__description" ref="description" type="text" placeholder="Описание" />
  			</div>
  			<div>
  				<div className="panel__colors">
            <div id="White" className={ (this.state.color === "White")?"choicenColor":"" }></div>
            <div id="Black" className={ (this.state.color === "Black")?"choicenColor":"" }></div>
            <div id="Red" className={ (this.state.color === "Red")?"choicenColor":"" }></div>
            <div id="Green" className={ (this.state.color === "Green")?"choicenColor":"" }></div>
          </div>
  				<div className="panel__status">
  					<select ref="select">
  						<option value="in_stock">В наличии</option>ыыыы
  						<option value="pending">Ожидается</option>
  						<option value="out_of_stock">Нет в наличии</option>
  					</select>
				</div>
				<div className="panel__send" onClick={ this.newItem }><p>Отправить</p></div>
  			</div>
  		</div>
  		);
  }
 }

 export default Panel;