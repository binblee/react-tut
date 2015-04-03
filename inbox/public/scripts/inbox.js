var GroupTitle = React.createClass({
    render: function(){
        return(
            <div>
            <p>{this.props.groupname}</p>
            <hr/>
            </div>
        );
    }
});

var MailSummary = React.createClass({
    render: function(){
        return(
            <div>
                <p>From {this.props.mail.from}</p>
                <p>{this.props.mail.title}</p>
                <p>{this.props.mail.time}</p>
            </div>
        );
    }
});
var MailList = React.createClass({
    render: function(){
        var mailSummaryNodes = this.props.mails.map(function(mail){
            return(
                <li><MailSummary mail={mail}/></li>
            );
        });
        return(
            <ul>
                {mailSummaryNodes}
            </ul>
        );
    }
});
var MailGroup = React.createClass({
    render: function(){
        var mailData = this.props.maildata;
        return(
            <div>
                <GroupTitle groupname={mailData.groupname}/>
                <MailList mails={mailData.mails}/>
            </div>
        );
    }
});
var Inbox = React.createClass({
    loadMailFromServer: function(){
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
		this.loadMailFromServer();
	},
    render: function(){
        var mailData = this.state.data;
        var mailGroupNodes = mailData.map(function(mailGroup){
            return(
                <MailGroup maildata={mailGroup}/>
            );
        });
        return(
            <div>
            <h1>Inbox</h1>
            {mailGroupNodes}
            </div>
        );
    }
});

React.render(<Inbox url="emails.json"/>, document.getElementById('content'));
