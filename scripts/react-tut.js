var converter = new Showdown.converter();
var Comment = React.createClass({
	render: function(){
		var rawMarkup = converter.makeHtml(this.props.children.toString());
		return (
			<div className="comment">
				<h2 className="commentAuthor">
					{this.props.author}
				</h2>
				<span dangerouslySetInnerHTML={{__html: rawMarkup}} />
			</div>
		);
	}
});

var CommentList = React.createClass({
	render: function(){
		return (
			<div className="commentList">
				<Comment author="Michael">_comment_ from michael</Comment>
				<Comment author="James">comment *from* james</Comment>
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