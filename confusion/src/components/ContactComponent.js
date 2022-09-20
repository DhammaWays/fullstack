import React, { Component } from 'react';
import { Breadcrumb, BreadcrumbItem, Button, Label, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';

/* Validation functions */
const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);
/* const isNumber = (val) => !isNaN(Number(val)); */
const validTel = (val) => /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/.test(val);
/* Another e-mail regExp: /^\w+[+.\w-]*@([\w-]+.)*\w+[\w-]*.([a-z]{2,4}|\d+)$/i */
const validEmail = (val) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);


class Contact extends Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(values) {
        console.log('Current State is: ' + JSON.stringify(values));
        alert('Current State is: ' + JSON.stringify(values));
    }

    render() {
        const FormElem = (props) => {
            var valList = { required };
            if (props.type === "text") { valList = { ...valList, minLength: minLength(3), maxLength: maxLength(15) }; }
            else if (props.type === "tel") { valList.validTel = validTel; }
            else if (props.type === "email") { valList.validEmail = validEmail; }
            
            return (
                <Row className="form-group">
                    <Label htmlFor={props.name} md={2}>{props.label}</Label>
                    <Col md={10}>
                        <Control type={props.type} model={"." + props.name} id={props.name} name={props.name} placeholder={props.label}
                            className="form-control"
                            validators={valList} />
                        <Errors
                            className="text-danger" model={"." + props.name} show="touched"
                            messages={{
                                required: 'Required ',
                                minLength: 'Must be greater than 2 characters ',
                                maxLength: 'Must be 15 characters or less ',
                                validTel: 'Phone numbers should be in 10 digit number format ',
                                validEmail: 'Invalid email format. Should be in format of username@domainname '
                            }}
                        />
                    </Col>
                </Row>
            );
        }

        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                        <BreadcrumbItem active>Contact Us</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>Contact Us</h3>
                        <hr />
                    </div>
                </div>

                <div className="row row-content">
                    <div className="col-12">
                        <h3>Location Information</h3>
                    </div>
                    <div className="col-12 col-sm-4 offset-sm-1">
                        <h5>Our Address</h5>
                        <address>
                            121, Clear Water Bay Road<br />
                            Clear Water Bay, Kowloon<br />
                            HONG KONG<br />
                            <i className="fa fa-phone"></i>: +852 1234 5678<br />
                            <i className="fa fa-fax"></i>: +852 8765 4321<br />
                            <i className="fa fa-envelope"></i>: <a href="mailto:confusion@food.net">confusion@food.net</a>
                        </address>
                    </div>
                    <div className="col-12 col-sm-6 offset-sm-1">
                        <h5>Map of our Location</h5>
                    </div>
                    <div className="col-12 col-sm-11 offset-sm-1">
                        <div className="btn-group" role="group">
                            <a role="button" className="btn btn-primary" href="tel:+85212345678"><i className="fa fa-phone"></i> Call</a>
                            <a role="button" className="btn btn-info" href="skype:+85212345678?call"><i className="fa fa-skype"></i> Skype</a>
                            <a role="button" className="btn btn-success" href="mailto:confusion@food.net"><i className="fa fa-envelope-o"></i> Email</a>
                        </div>
                    </div>
                </div>
                <div className="row row-content">
                    <div className="col-12">
                        <h3>Send us your Feedback</h3>
                    </div>
                    <div className="col-12 col-md-9">
                        <LocalForm onSubmit={this.handleSubmit}>
                            {/* Using it as component (instead of function call) will cause form to be rendered with each
                             *  character being typed in input fields as this causes state change making signature for anonymous
                             *  component also change, causing React to render the form again!
                             * <FormElem type="text" name="lastname" label="Last Name" /> */}
                            {FormElem({ type: "text", name: "firstname", label: "First Name" })}                           
                            {FormElem({ type: "text", name: "lastname", label: "Last Name" })}
                            {FormElem({ type: "tel", name: "telnum", label: "Tel. Number" })}
                            {FormElem({ type: "email", name: "email", label: "Email" })}
                            
                            <Row className="form-group">
                                <Col md={{ size: 6, offset: 2 }}>
                                    <div className="form-check">
                                        <Label check>                                            
                                            <Control type="checkbox"
                                                model=".agree"
                                                name="agree"
                                                className="form-check-input"
                                            />                                            
                                            {' '}<strong>May we contact you?</strong>
                                        </Label>
                                    </div>
                                </Col>                               
                                <Col md={{ size: 3, offset: 1 }}>
                                    <Control.select model=".contactType" name="contactType" className="form-control">
                                        <option>Tel.</option>
                                        <option>Email</option>
                                    </Control.select>
                                </Col>                                
                            </Row>
                            
                            <Row className="form-group">
                                <Label htmlFor="message" md={2}>Your Feedback</Label>
                                <Col md={10}>
                                    <Control.textarea model=".message" id="message" name="message"
                                        rows="12" className="form-control" />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{ size: 10, offset: 2 }}>
                                    <Button type="submit" color="primary">
                                        Send Feedback
                                    </Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </div>
                </div>
            </div>
        );
    }
}

export default Contact;