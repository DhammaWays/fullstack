import { Component, useRef } from 'react';
import { Routes, Route, Navigate, useParams, useLocation, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { actions } from 'react-redux-form';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import Home from './HomeComponent';
import About from './AboutComponent';
import Menu from './MenuComponent';
import DishDetail from './DishdetailComponent';
import Contact from './ContactComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
/* import { addComment, fetchDishes } from '../redux/ActionCreators'; */
import { FETCH } from '../redux/ActionCreators';

/* Create a wrapper function "withRouter" as it is deperacted in V6 */
function withRouter(Component) {
    function ComponentWithRouterProp(props) {
        let location = useLocation();
        let navigate = useNavigate();
        let params = useParams();
        let nodeRef = useRef();
        return (
            <Component
                {...props}
                router={{ location, navigate, params, nodeRef }}
            />
        );
    }

    return ComponentWithRouterProp;
}

const mapDispatchToProps = dispatch => ({
    fetchDishes: () => { dispatch(FETCH.fetchDishes()) },
    resetFeedbackForm: () => {
        dispatch(actions.reset('feedback'))
    },
    fetchPromotions: () => { dispatch(FETCH.fetchPromotions()) },
    fetchComments: () => { dispatch(FETCH.fetchComments()) },
    postComment: (data) => dispatch(FETCH.postComment({ dishId: data.dishId, rating: data.rating, author: data.author, comment: data.comment }))
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
        this.props.fetchPromotions();
        this.props.fetchComments();
    }

    render() {
        const featuredDish = this.props.dishes.dishes.filter((dish) => dish.featured)[0];
        const featuredPromotion = this.props.promotions.promotions.filter((promotion) => promotion.featured)[0];
        const featuredLeader = this.props.leaders.filter((leader) => leader.featured)[0];
        const loadingDishes = this.props.dishes.isLoading;
        const errLoadingDishes = this.props.dishes.errMess;
        const loadingPromotion = this.props.promotions.isLoading;
        const errLoadingPromotion = this.props.promotions.errMess;
        const loadingComments = this.props.comments.isLoading;
        const errLoadingComments = this.props.comments.errMess;

        const DishWithId = (props) => {
            var { dishId } = useParams(); /* returns corresponding param as string */
            dishId = Number(dishId);
            const dish = this.props.dishes.dishes.filter((dish) => dish.id === dishId)[0];
            const comments = this.props.comments.comments.filter((comment) => comment.dishId === dishId);
            return (
                <DishDetail dish={dish} comments={comments} postComment={props.postComment} dishesLoading={loadingDishes} dishesErrMess={errLoadingDishes}
                    commentsLoading={loadingComments} commentsErrMess={errLoadingComments} />
            );
        }

        return (
            <div>
                <Header />
                <TransitionGroup>
                    <CSSTransition nodeRef={this.props.nodeRef} classNames="page" timeout={300}>
                        <Routes>
                            <Route path='/home' element={<Home dish={featuredDish} promotion={featuredPromotion} leader={featuredLeader} dishesLoading={loadingDishes} dishesErrMess={errLoadingDishes}
                                promotionLoading={loadingPromotion} promotionErrMess={errLoadingPromotion}
                            />} />
                            <Route exact path='/aboutus' element={<About leaders={this.props.leaders} />} />
                            <Route path='/menu/:dishId' element={<DishWithId postComment={this.props.postComment} />} />
                            <Route exact path='/menu' element={<Menu dishes={this.props.dishes} />} />
                            <Route exact path='/contactus' element={<Contact resetFeedbackForm={this.props.resetFeedbackForm} />} />
                            <Route path="*" element={<Navigate to="/home" replace />} />
                        </Routes>
                    </CSSTransition>
                </TransitionGroup>
                <Footer />
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
