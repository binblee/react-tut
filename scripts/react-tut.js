var CommentList = React.createClass({
	render: function(){
		return (
			<div className="commentList">
				Hello world from a CommentList.
			</div>
		);
	}
});

var CommentForm = React.createClass({
	render: function(){
		return (
			<div className="commentForm">
				Hello world from a CommentForm.
			</div>
		);
	}
});

var CommentBox = React.createClass({
	render: function(){
		return (
			<div className="commentBox">
				<h1>Comments</h1>
				<CommentList />
				<CommentForm />
			</div>
		);
	}
});
React.render(<CommentBox />, document.getElementById('content'));