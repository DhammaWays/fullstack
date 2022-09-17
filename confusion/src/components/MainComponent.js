import { Component } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './HomeComponent';
import Menu from './MenuComponent';
import Contact from './ContactComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import { DISHES } from '../shared/dishes';
import { COMMENTS } from '../shared/comments';
import { PROMOTIONS } from '../shared/promotions';
import { LEADERS } from '../shared/leaders';


/* Main: Container component to manage overall presentation by using other presentation component
 * along with state and control logic.
 */
class Main extends Component {

    constructor(props) {
        super(props);

        this.state = {
            dishes: DISHES,
            comments: COMMENTS,
            promotions: PROMOTIONS,
            leaders: LEADERS,
            selectedDish: null
        }
    }

    onDishSelect(dishId) {
        this.setState({ selectedDish: dishId });
    }

     render() {
        const featuredDish = this.state.dishes.filter((dish) => dish.featured)[0];
        const featuredPromotion = this.state.promotions.filter((leader) => leader.featured)[0];
        const featuredLeader = this.state.leaders.filter((promotion) => promotion.featured)[0];
        
        return (
            <div>
                <Header />
                <Routes>
                    <Route path='/home' element={<Home dish={featuredDish} promotion={featuredPromotion} leader={featuredLeader} />} />
                    <Route exact path='/menu/*' element={<Menu dishes={this.state.dishes} onClick={(dishId) => this.onDishSelect(dishId)} />} />
                    <Route eaxct path='/contactus/*' element={<Contact />} />
                    <Route path="*" element={<Navigate to="/home" replace />} />
                </Routes>
                <Footer />
            </div>
        );
    }
}

export default Main;
