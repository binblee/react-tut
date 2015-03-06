var CommentBox = React.createClass({
	render: function(){
		return (
		  <div className="CommentBox">
		    Hello, world from a CommentBox!
		  </div>
		);
	}
});
React.render(<CommentBox />, document.getElementById('content'));