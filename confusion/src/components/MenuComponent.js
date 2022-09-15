import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardTitle } from 'reactstrap';

/* Menu: Presentational component to render menu */
class Menu extends Component {
        
    render() { 
        var menu;
        /* Use the "dishes" property passed in if available */
        /* We also use passed in property OnClick method to let container clas sknow of dish selected */
        if (this.props.dishes != null) {             
             menu = this.props.dishes.map((dish) => {
                return (
                    <div key={dish.id} className="col-12 col-md-5 m-1">
                        <Card onClick={() => this.props.onClick(dish.id)}>
                            <CardImg width="100%" src={dish.image} alt={dish.name} />
                            <CardImgOverlay>
                                <CardTitle>{dish.name}</CardTitle>
                            </CardImgOverlay>
                        </Card>
                    </div>
               );           
            });           
        }
        else {
             menu = "Appetizing Dishes List Coming Soon...";
        }

        /* Pass selected "dish" as property to DishDetail component */
        return (
            <div className="container">
                <div className="row">
                    {menu}
                </div>
            </div>
            );
     }
}

export default Menu;
