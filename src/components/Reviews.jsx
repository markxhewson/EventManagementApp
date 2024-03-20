import React, { useState, useEffect } from 'react';
import { useAuthContext } from '../context/AuthContext';

function Reviews({ className }) {
  const [reviews, setReviews] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [newRating, setNewRating] = useState(0);
  const [reviewStatus, setReviewStatus] = useState('');

  const { user } = useAuthContext();

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const data = await fetch('/api/reviews', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'api-key': '43d44abf-qlgl-6322-jujw-3b3a9e711f75'
        }
      });

      if (!data.ok) {
        throw new Error('Failed to fetch reviews');
      }

      const response = await data.json();
      setReviews(response.data.reviews);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  const postReviews = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'api-key': '43d44abf-qlgl-6322-jujw-3b3a9e711f75'
        },
        body: JSON.stringify({ comment: newComment, rating: newRating, userId: user.id })
      });

      setNewRating(0);
      setNewComment('');
      fetchReviews();

      if (response.status === 201) {
        setReviewStatus('Review successfully added');
      } else {
        throw new Error('Failed to post review');
      }
    } catch (error) {
      console.error('Error posting review:', error);
      setReviewStatus('Failed to post review');

    }
  };

  function getTimeAgo(timestamp) {
    const now = new Date();
    const seconds = Math.floor((now - timestamp) / 1000);

    if (seconds < 5) {
      return "Just now";
    } else if (seconds < 60) {
      return seconds + " seconds ago";
    } else if (seconds < 3600) {
      const minutes = Math.floor(seconds / 60);
      return minutes + (minutes === 1 ? " minute ago" : " minutes ago");
    } else if (seconds < 86400) {
      const hours = Math.floor(seconds / 3600);
      return hours + (hours === 1 ? " hour ago" : " hours ago");
    } else if (seconds < 2592000) {
      const days = Math.floor(seconds / 86400);
      return days + (days === 1 ? " day ago" : " days ago");
    } else {
      return new Date(timestamp).toDateString();
    }
  }


  return (
    <div className={className}>
      <div className="w-full">
        <h1 className="text-xl font-bold  mb-8 text-center">Customer Reviews</h1>

        <div className="flex justify-center mb-4">
          <form onSubmit={postReviews} className="flex">
            <select
              value={newRating}
              onChange={(event) => setNewRating(parseInt(event.target.value))}
              className="border rounded-md p-2 mr-2 w-24">{

                [0, 1, 2, 3, 4, 5].map((rating) => (
                  <option key={rating} value={rating}>{rating}</option>
                ))}
            </select>
            <input
              type="text"
              value={newComment}
              onChange={(event) => setNewComment(event.target.value)}
              className="border rounded-md p-2 mr-2"
              placeholder="Leave a review..."
            />
            <button type="submit" className="bg-gray-500 text-white rounded-md px-4 py-2">Post</button>
          </form>
        </div>

        {reviews.length === 0 && (
          <div className="text-center">
            <p className='text-red-500'>No reviews available</p>
          </div>
        )}

        {reviews.length > 0 && (
          <div className="flex flex-col w-auto max-h-[550px] overflow-y-auto">
            {reviews.slice(0, 12).map((review) => (
              <div key={review.id} className="bg-white border max-w-96 mb-4 p-4 rounded-md">
                <div className='flex justify-between'>
                  <div className='flex flex-row gap-4 items-center'>
                    <h3>{review.user.username}</h3>
                    <h3 className='text-gray-700 text-[10px]'>{getTimeAgo(new Date(review.createdAt))}</h3>
                  </div>
                  <h3>{review.rating}☆</h3>
                </div>
                <p className='text-sm text-gray-700'>{review.comment}</p>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

export default Reviews;
