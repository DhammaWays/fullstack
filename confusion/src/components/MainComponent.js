import { Component } from 'react';
import { Routes, Route, Navigate, useParams } from 'react-router-dom';
import Home from './HomeComponent';
import About from './AboutComponent';
import Menu from './MenuComponent';
import DishDetail from './DishdetailComponent';
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
        }
    }

     render() {
        const featuredDish = this.state.dishes.filter((dish) => dish.featured)[0];
        const featuredPromotion = this.state.promotions.filter((leader) => leader.featured)[0];
        const featuredLeader = this.state.leaders.filter((promotion) => promotion.featured)[0];

         const DishWithId = () => {
             var { dishId } = useParams(); /* returns corresponding param as string */
             dishId = Number(dishId);
             const dish = this.state.dishes.filter((dish) => dish.id === dishId)[0];
             const comments = this.state.comments.filter((comment) => comment.dishId === dishId);
             return (
                 <DishDetail dish={dish} comments={comments} />
             );
         }

        return (
            <div>
                <Header />
                <Routes>
                    <Route path='/home' element={<Home dish={featuredDish} promotion={featuredPromotion} leader={featuredLeader} />} />
                    <Route exact path='/aboutus' element={<About leaders={this.state.leaders} />} />
                    <Route path='/menu/:dishId' element={<DishWithId />} />
                    <Route exact path='/menu' element={<Menu dishes={this.state.dishes} />} />
                    <Route exact path='/contactus' element={<Contact />} />
                    <Route path="*" element={<Navigate to="/home" replace />} />
                </Routes>
                <Footer />
            </div>
        );
    }
}

export default Main;
