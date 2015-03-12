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
		if(this.props.product.stocked == false && this.props.filter == "true"){
			return (<tr><td></td><td></td></tr>);
		}else if (this.props.product.stocked == false){
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
	render: function(){
		var products = this.props.products;
		var rows = [];
		var lastCategory = "";
		var filter = this.props.filter;
		var nodes = products.forEach(function(product){
			if(product.category != lastCategory){
				lastCategory = product.category;
				rows.push(<ProductCategoryRow catname={product.category} />);
			}
			rows.push(<ProductRow product={product} filter={filter} />);
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
	loadFromServer: function(){
		$.ajax({
			url: this.props.url,
			dataType: 'json',
			success: function(data){
				this.setState({data: data});
			}.bind(this),
			error: function(xhr, status, err){
				console.error(this.props.url, status, err.toString());
			}.bind(this)
		});
	},
	getInitialState: function(){
		return {data: []}
	},
	componentDidMount: function(){
		this.loadFromServer();
	},
	render: function(){
		return(
			<div>
				<SearchBar />
				<ProductTable products={this.state.data} filter="false" />
			</div>
		);
	}
});


React.render(<FilterableProductTable url="products.json"/>, document.getElementById('content'));


