import { Component } from 'react';
import { Routes, Route, Navigate, useParams, useLocation, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';

import Home from './HomeComponent';
import About from './AboutComponent';
import Menu from './MenuComponent';
import DishDetail from './DishdetailComponent';
import Contact from './ContactComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import { addComment, fetchDishes } from '../redux/ActionCreators';

/* Create a wrapper function "withRouter" as it is deperacted in V6 */
function withRouter(Component) {
    function ComponentWithRouterProp(props) {
        let location = useLocation();
        let navigate = useNavigate();
        let params = useParams();
        return (
            <Component
                {...props}
                router={{ location, navigate, params }}
            />
        );
    }

    return ComponentWithRouterProp;
}

const mapDispatchToProps = dispatch => ({
    addComment: (dishId, rating, author, comment) => dispatch(addComment(dishId, rating, author, comment)),
    fetchDishes: () => { dispatch(fetchDishes()) }
});

const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        promotions: state.promotions,
        leaders: state.leaders
    }
}

/* Main: Container component to manage overall presentation by using other presentation component
 * along with state and control logic.
 */
class Main extends Component {

    componentDidMount() {
        this.props.fetchDishes();
    }

    render() {
        const featuredDish = this.props.dishes.dishes.filter((dish) => dish.featured)[0];
        const featuredPromotion = this.props.promotions.filter((leader) => leader.featured)[0];
        const featuredLeader = this.props.leaders.filter((promotion) => promotion.featured)[0];
        const loadingDishes = this.props.dishes.isLoading;
        const errLoadingDishes = this.props.dishes.errMess;

        const DishWithId = (props) => {
            var { dishId } = useParams(); /* returns corresponding param as string */
            dishId = Number(dishId);
            const dish = this.props.dishes.dishes.filter((dish) => dish.id === dishId)[0];
            const comments = this.props.comments.filter((comment) => comment.dishId === dishId);
            return (
                <DishDetail dish={dish} comments={comments} addComment={props.addComment} dishesLoading={loadingDishes} dishesErrMess={errLoadingDishes} />
            );
        }

        return (
            <div>
                <Header />
                <Routes>
                    <Route path='/home' element={<Home dish={featuredDish} promotion={featuredPromotion} leader={featuredLeader} dishesLoading={loadingDishes} dishesErrMess={errLoadingDishes} />} />
                    <Route exact path='/aboutus' element={<About leaders={this.props.leaders} />} />
                    <Route path='/menu/:dishId' element={<DishWithId addComment={this.props.addComment}  />} />
                    <Route exact path='/menu' element={<Menu dishes={this.props.dishes} />} />
                    <Route exact path='/contactus' element={<Contact />} />
                    <Route path="*" element={<Navigate to="/home" replace />} />
                </Routes>
                <Footer />
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
