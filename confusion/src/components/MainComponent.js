import { Component } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './HomeComponent';
import Menu from './MenuComponent';
import DishDetail from './DishdetailComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import { DISHES } from '../shared/dishes';

/* Main: Container component to manage overall presentation by using other presentation component
 * along with state and control logic.
 */
class Main extends Component {

    constructor(props) {
        super(props);

        this.state = {
            dishes: DISHES,
            selectedDish: null
        }
    }

    onDishSelect(dishId) {
        this.setState({ selectedDish: dishId });
    }

    /* Pass "dishes" and "OnClick" as property to Menu component */
    /* Pass "selected dish" as property to DishDetail component */
    render() {
        return (
            <div>
                <Header />
                <Routes>
                    <Route path='/home' element={<Home />} />
                    <Route exact path='/menu/*' element={<Menu dishes={this.state.dishes} onClick={(dishId) => this.onDishSelect(dishId)} />} />
                    <Route path="*" element={<Navigate to="/home" replace />} />
                </Routes>
                <Footer />
            </div>
        );
    }
}

export default Main;
