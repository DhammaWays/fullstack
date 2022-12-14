import React, { Component } from 'react';
import { Card, CardImg, CardBody, CardTitle, CardText, Breadcrumb, BreadcrumbItem, Modal, ModalHeader, ModalBody, Label, Row, Col, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';

import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';

/* Validation functions */
const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

/* DishDetail: Pure (no state) Presentational component to render details of given dish
 * Made it a functional component as we do not need overahead/functionality of class object.
 */

function RenderDish({ dish }) {
    if (dish != null) {
        return (
            <FadeTransform in transformProps={{ exitTransform: 'scale(0.5) translateY(-50%)' }}>
                <Card>
                    <CardImg width="100%" src={baseUrl + dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            </FadeTransform>
        );
    }
}

/* CommentForm class componnet */
class CommentForm extends Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSumbit.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.state = {
            isModalOpen: false
        };
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleSumbit(values) {
        this.toggleModal();
        const data = { dishId: this.props.dishId, rating: values.rating, author: values.author, comment: values.comment };
        this.props.postComment(data);
     }

    render() {

        return (
            <div>
                <Button outline onClick={this.toggleModal}><span className="fa fa-pencil fa-lg"></span> Submit Comment</Button>

                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Sumbit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={this.handleSubmit}>
                            <Row className="form-group mb-2">
                                <Label htmlFor="rating">Rating</Label>
                                <Col>
                                    <Control.select model=".rating" id="rating" name="rating" placeholder="1"
                                        className="form-control">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group mb-2">
                                <Label htmlFor="author">Your Name</Label>
                                <Col>
                                    <Control type="text" model=".author" id="author" name="author" placeholder="Your Name"
                                        className="form-control"
                                        validators={{ required, minLength: minLength(3), maxLength: maxLength(15) }}
                                    />
                                    <Errors
                                        className="text-danger" model=".author" show="touched"
                                        messages={{
                                            required: 'Required ',
                                            minLength: 'Must be greater than 2 characters ',
                                            maxLength: 'Must be 15 characters or less ',
                                        }}
                                    />

                                </Col>
                            </Row>
                            <Row className="form-group mb-2">
                                <Label htmlFor="comment">Comment</Label>
                                <Col>
                                    <Control.textarea model=".comment" rows="6" id="comment" name="comment"
                                        className="form-control" />
                                </Col>
                            </Row>
                            <Button type="submit" value="submit" color="primary">Submit</Button>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

function RenderComments({ comments, postComment, dishId }) {
    if (comments != null) {
        const commentsList = comments.map((comment) => {
            /* We use Date class to convert our datetime string to US style date: Oct 15, 2014 */
            var date = new Date(comment.date).toDateString().split(' ');
            return (
                <Fade in>
                    <ul key={comment.id} className="list-unstyled">
                        <li>{comment.comment}</li>
                        <li>--{comment.author}, {date[1]} {date[2]}, {date[3]}</li>
                    </ul >
                </Fade>
            );
        });

        return (
            <div>
                <h4>Comments</h4>
                <Stagger in>
                    {commentsList}
                </Stagger>
                <CommentForm dishId={dishId} postComment={postComment} />
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
    if (props.dishesLoading || props.commentsLoading ) {
        return (
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    }
    else if (props.dishesErrMess || props.commentsErrMess) {
        return (
            <div className="container">
                <div className="row">
                    <h4>{props.dishesErrMess + props.commentsErrMess}</h4>
                </div>
            </div>
        );
    }
    else if (props.dish != null) {
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
                        <RenderComments comments={props.comments} postComment={props.postComment} dishId={props.dish.id} />
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
