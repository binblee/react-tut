var ProductCategoryRow = React.createClass({
	render: function(){
		return(
			<tr><td span="2" className="category">{this.props.catname}</td></tr>
		);
	}
});
var ProductRow = React.createClass({
	render: function(){
		if( (!this.props.product.stocked && this.props.filterStockOnly)
			|| this.props.product.name.indexOf(this.props.filterText) === -1 ){
			return ( <div></div> );
		}else if (this.props.product.stocked == false){
			return(
				<tr>
					<td className="not-in-stock">{this.props.product.name}</td>
					<td>{this.props.product.price}</td>
				</tr>
			);
		}else{
			return(
				<tr>
					<td>{this.props.product.name}</td>
					<td>{this.props.product.price}</td>
				</tr>
			);
		}
	}
});

var ProductTable = React.createClass({
	render: function(){
		var products = this.props.products;
		var rows = [];
		var lastCategory = "";
		var filterStockOnly = this.props.filterStockOnly;
		var filterText = this.props.filterText;
		var nodes = products.forEach(function(product){
			if(product.category != lastCategory){
				lastCategory = product.category;
				rows.push(<ProductCategoryRow catname={product.category} />);
			}
			rows.push(<ProductRow product={product}
				filterText={filterText}
				filterStockOnly={filterStockOnly} />);
		});
		return(
			<div>
		        <table>
					<thead><tr><th>Name</th><th>Price</th></tr></thead>
					<tbody>{rows}</tbody>
		        </table>
        	</div>
		);
	}
});

var SearchBar = React.createClass({
	handleChange: function(){
		this.props.onUserInput(
			this.refs.filterTextInput.getDOMNode().value,
			this.refs.filterStockOnlyInput.getDOMNode().checked
		);
	},
	render: function(){
		return(
			<form>
				<input type="text" placeholder="Search..."
					ref="filterTextInput"
					value={this.props.filterText}
					onChange={this.handleChange} /><br/>
				<input type="checkbox" name="filtered"
					ref="filterStockOnlyInput"
					checkedch={this.props.filterStockOnly}
					onChange={this.handleChange} />
				{' '} Only show products in stock
			</form>
		);
	}
});

var FilterableProductTable = React.createClass({
	getInitialState: function(){
		return {
			filterText: "",
			filterStockOnly: false
		}
	},
	onSearchBarChange: function(filterText, filterStockOnly){
		this.setState({
			filterText: filterText,
			filterStockOnly: filterStockOnly
		});
	},
	render: function(){
		return(
			<div>
				<SearchBar onUserInput={this.onSearchBarChange} />
				<ProductTable products={this.props.products}
					filterText={this.state.filterText}
					filterStockOnly={this.state.filterStockOnly} />
			</div>
		);
	}
});

var products = [
  {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
  {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
  {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
  {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
  {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
  {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
];

React.render(<FilterableProductTable products={products} />, document.getElementById('content'));


