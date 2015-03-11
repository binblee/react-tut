var SearchBar = React.createClass({
	render: function(){
		return(
			<div>Search</div>
		);
	}
});

var ProductCategoryRow = React.createClass({
	render: function(){
		return(
			<div>Category</div>
		);
	}
});
var ProductRow = React.createClass({
	render: function(){
		return(
			<div>Row</div>
		);
	}
});

var ProductTable = React.createClass({
	render: function(){
		return(
			<div>
				<ProductCategoryRow></ProductCategoryRow>
				<ProductRow></ProductRow>
				<ProductCategoryRow />
				<ProductRow />
			</div>
		);
	}
});

var FilterableProductTable = React.createClass({
	render: function(){
		return(
			<div>
				<SearchBar />
				<ProductTable />
			</div>
		);
	}
});


React.render(<FilterableProductTable />, document.getElementById('content'));


