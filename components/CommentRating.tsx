import React from "react";
interface CommentRatingProps {
  rating: number;
}
function CommentRating({ rating }: CommentRatingProps) {
  return (
    <div className="comment-rating flex gap-2 items-center">
      <span>{rating}</span>
      <svg
        width="18"
        height="14"
        viewBox="0 0 18 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8.0504 0.487005L6.0282 4.10687L1.50381 4.68922C0.69245 4.79311 0.367288 5.67621 0.955676 6.182L4.22897 8.99806L3.45478 12.9761C3.31542 13.6951 4.17323 14.2337 4.89168 13.8975L8.93917 12.0192L12.9867 13.8975C13.7051 14.231 14.5629 13.6951 14.4236 12.9761L13.6494 8.99806L16.9227 6.182C17.5111 5.67621 17.1859 4.79311 16.3745 4.68922L11.8501 4.10687L9.82795 0.487005C9.46563 -0.158228 8.41582 -0.16643 8.0504 0.487005Z"
          fill="#F3EA0F"
        />
      </svg>
    </div>
  );
}

export default CommentRating;
