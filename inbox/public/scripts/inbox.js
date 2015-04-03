var GroupTitle = React.createClass({
    render: function(){
        return(
            <h3 className="page-header">{this.props.groupname}</h3>
        );
    }
});

var MailSummary = React.createClass({
    render: function(){
        return(
            <div className="col-md-4">
            <div className="panel panel-info">
                <div className="panel-heading">
                    <h3 className="panel-title">{this.props.mail.from}&nbsp;<small>{this.props.mail.time}</small></h3>
                </div>
                <div className="panel-body">
                {this.props.mail.title}
                </div>
            </div>
            </div>
        );
    }
});
var MailList = React.createClass({
    render: function(){
        var mailSummaryNodes = this.props.mails.map(function(mail){
            return(
                <MailSummary mail={mail}/>
            );
        });
        return(
            <div className="row">{mailSummaryNodes}</div>
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
            {mailGroupNodes}
            </div>
        );
    }
});

React.render(<Inbox url="emails.json"/>, document.getElementById('content'));
