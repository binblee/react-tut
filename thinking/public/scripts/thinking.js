var SearchBar = React.createClass({
	render: function(){
		return(
			<div>
				<input type="text" placeholder="Search..." /><br/>
				<input type="checkbox" name="filtered" value="" />Only show products in stock
			</div>
		);
	}
});

var ProductCategoryRow = React.createClass({
	render: function(){
		return(
			<tr><td span="2" className="category">{this.props.catname}</td></tr>
		);
	}
});
var ProductRow = React.createClass({
	render: function(){
		if (this.props.product.stocked == false){
			return(
				<tr><td className="not-in-stock">{this.props.product.name}</td><td>{this.props.product.price}</td></tr>
			);
		}else{
			return(
				<tr><td>{this.props.product.name}</td><td>{this.props.product.price}</td></tr>
			);
		}
	}
});

var ProductTable = React.createClass({
	data: [],
	loadProductsFromServer: function(){
		//this.props.url
		var data = [
		  {category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},
		  {category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball"},
		  {category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball"},
		  {category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch"},
		  {category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5"},
		  {category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7"}
		];

		return data;
	},
	render: function(){
		var products = this.loadProductsFromServer();
		var rows = [];
		var lastCategory = ""
		var nodes = products.forEach(function(product){
			if(product.category != lastCategory){
				lastCategory = product.category;
				rows.push(<ProductCategoryRow catname={product.category} />)
			}
			rows.push(<ProductRow product={product} />)
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

var FilterableProductTable = React.createClass({
	render: function(){
		return(
			<div>
				<SearchBar />
				<ProductTable url=""/>
			</div>
		);
	}
});


React.render(<FilterableProductTable />, document.getElementById('content'));


