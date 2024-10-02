import React from "react";
import CommentRating from "./CommentRating";
interface CommentRatingProps {
  email: string;
  desc: string;
  rating: number;
}
function Comment({ email, desc, rating }: CommentRatingProps) {
  return (
    <div className="comment">
      <h4 className="mb-2">{email}</h4>
      <p>{desc}</p>
      <CommentRating rating={rating} />
    </div>
  );
}

export default Comment;
