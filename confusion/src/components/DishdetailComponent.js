import React from 'react';
import { Card, CardImg, CardBody, CardTitle, CardText, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';

/* DishDetail: Pure (no state) Presentational component to render details of given dish
 * Made it a functional component as we do not need overahead/functionality of class object.
 */

function RenderDish({ dish }) {
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

function RenderComments({ comments }) {
    if (comments != null) {
        const commentsList = comments.map((comment) => {
            /* We use Date class to convert our datetime string to US style date: Oct 15, 2014 */
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

/* Functional Component:
 * const DishDetail = props => {} is another way of writing: function DishDetail(props) {}
 */
const DishDetail = (props) => {
    /* Use the "dish" property passed in if available */
    if (props.dish != null) {
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <RenderDish dish={props.dish} />
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        <RenderComments comments={props.comments} />
                    </div>
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

export default DishDetail;
