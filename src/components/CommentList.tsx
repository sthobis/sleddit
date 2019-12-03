import React from "react";
import CommentItem from "./CommentItem";
import { Comment } from "../types";

interface CommentListProps {
  comments: Comment[];
}

const CommentList = ({ comments }: CommentListProps) => {
  return (
    <ul className="comment-list">
      {comments.map((comment, index) => (
        <li key={comment.id}>
          <CommentItem comment={comment} index={index} />
        </li>
      ))}
      <style jsx>{`
        .comment-list {
          margin: 0 0 10px 0;
          padding: 0;
          list-style-type: none;
        }
      `}</style>
    </ul>
  );
};

export default CommentList;
