import React from "react";
import PropTypes from "prop-types";
import Comment from "./comment";

const CommentList = ({ comments }) => {
    return (
        <div className="card mb-3">
            <div className="card-body">
                <h2>Comments</h2>
                <hr />
                {comments.map((comment) => (
                    <Comment key={comment._id} comment={comment} />
                ))}
            </div>
        </div>
    );
};

CommentList.propTypes = {
    comments: PropTypes.array
};

export default CommentList;
