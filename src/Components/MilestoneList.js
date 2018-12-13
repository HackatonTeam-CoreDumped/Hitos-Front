import React from 'react';

class Milestone extends React.Component{
	formatDate(propsDate){
		const date = new Date(propsDate);
		console.log(date);
		return (date.toLocaleDateString());
	}

	render(){
		var bodyColor = {
			backgroundColor: 'black',
        }

        var headingColor = {
        	backgroundColor: 'grey',
        }

        var textColor = {
        	color: 'white',
        }
        var status;
        if(this.props.status)
				status = ` || STATUS: ${this.props.status}`;
		return(
			<div className='Milestone' class='panel panel-default' style={bodyColor}>
				<div class='panel-heading' style={headingColor}>
					<h3>{this.props.title} {status}</h3>
				</div>
				<p style={textColor}>Made by {this.props.author} at {this.formatDate(this.props.creation)}</p>
				<p style={textColor}>Week: {this.props.week}		{this.props.category} -> {this.props.level}</p>
				<p style={textColor}>{this.props.description}</p>
			</div>
		)
	}
}

class MilestoneList extends React.Component{
	renderMS(datas) {
		return(
			<div>
			{datas.map(data => (
				<Milestone
				key={data._id}
				creation={data.creation}
				title={data.title}
				author={data.author.userName}
				week={data.week}
				description={data.description}
				category={data.category}
				level={data.level}
				status={data.status}
				/>
			))}
			</div>
		);
	}

	render(){
		return(
			<div className='MilestoneList'>
				{this.renderMS(this.props.data)}
			</div>
		)
	};
}

export default MilestoneList;
