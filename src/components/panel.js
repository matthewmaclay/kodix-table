import React, { Component } from 'react';

class Panel extends Component {
  constructor(props){
    super(props);
  }
  render(){
  	return(
  		<div className="panel">
  			<div className="textInputs">
  				<input id="title" ref="title"  type="text" placeholder="Название" />
  				<input id="year" ref="year" type="text" placeholder="Год" />
  				<input id="price" ref="price" type="number" placeholder="Цена" />
  				<input id="description" ref="description" type="text" placeholder="Описание" />
  			</div>
  			<div className="otherInputs">
  				<div className="colors"></div>
  				<div className="status">
					<select ref="select">
						<option value="stand">Обычный</option>
						<option value="discount">Со скидкой</option>
						<option value="start">По закупочной</option>
					</select>
				</div>
				<div className="send"><p>Отправить</p></div>
  			</div>
  		</div>
  		);
  }
 }

 export default Panel;