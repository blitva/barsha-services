import React from "react";
import ReviewsCustomerImages from './ReviewsCustomerImages.jsx';
import ReviewsPhrases from './ReviewsPhrases.jsx';
import ReviewsFromUs from './ReviewsFromUs.jsx';
import ErrorBoundary from './ErrorBoundary.jsx';
import ReviewsPopup from './ReviewsPopup.jsx';
import axios from 'axios';
import "./style.css";

class Reviews extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      productId: 1005,
      reviews: [],
      phrases: [],
      customerImages: []
    };
    this.getCustomerReviews = this.getCustomerReviews.bind(this);
    this.getReviewExcerpt = this.getReviewExcerpt.bind(this);

    this.getCustomerReviews(this.state.productId);
    this.getReviewExcerpt(this.state.productId);


  }

  componentDidMount() {
    // this.getCustomerReviews(this.state.productId);
    // this.getReviewExcerpt(this.state.productId);
  }

  getCustomerReviews(productId) {
    return axios.get(`http://localhost:4006/Reviews/getReviews/${productId}`)
      .then(results => {
        console.log('Review query results: ', results);
        this.setState({
          reviews: results.data
        });

      })
      .catch(err => console.log('Error: ', err))

  }

  getReviewExcerpt(productId) {
    return axios.get(`http://localhost:4006/Reviews/getReviewExcerpts/${productId}`)
      .then(wordsArray => {
        console.log('Review phrases results: ', wordsArray);
        this.setState({
          phrases: wordsArray.data

        });
      })
      .catch(err => console.log('Error: ', err))

  }

  render() {

    return (
      <div className="Reviews">
        {/* <ErrorBoundary> */}
        <ReviewsCustomerImages reviews={this.state.reviews} />
        {/* </ErrorBoundary> */}
        {/* <ReviewsPopup /> */}

        <ReviewsPhrases phrases={this.state.phrases} />
        <ReviewsFromUs reviews={this.state.reviews} />

      </div>
    );
  }
}

export default Reviews;