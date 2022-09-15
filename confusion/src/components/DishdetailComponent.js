import React, { Component } from 'react';
import { Card, CardImg, CardBody, CardTitle, CardText } from 'reactstrap';

class DishDetail extends Component {
 
    renderDish(dish) {
        if (dish != null) {
            return (
                <Card>
                    <CardImg width="100%" src={dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            );
        }
     }

    renderComments(comments) {
        if (comments != null) {
            var commentsList = comments.map((comment) => {
                var date = new Date(comment.date).toDateString().split(' ');
                return (
                    <ul key={comment.id} className="list-unstyled">
                        <li>{comment.comment}</li>
                        <li>--{comment.author}, {date[1]} {date[2]}, {date[3]}</li>
                    </ul >
                );
            });


            return (
                <div>
                    <h4>Comments</h4>
                    {commentsList}
                </div>
            );
        }
        else { /* no comments; just return empty div */
            return (
                <div></div>
                );
        }
    }

    render() { 
        /* Use the "dish" property passed in if available */
        if (this.props.dish != null) {
            return (
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        {this.renderDish(this.props.dish)}
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        {this.renderComments(this.props.dish.comments)}
                    </div>
                </div>
            );
        }
        else { /* no dish to render; return an empty div */
            return (
                <div></div>
            );
        }
    }
}

export default DishDetail;
