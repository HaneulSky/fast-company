import React from "react";
import PropTypes from "prop-types";
import Comment from "./comment";

const CommentList = ({ comments, onDelete }) => {
    const sortedComments = comments.sort((a, b) => b.created_at - a.created_at);

    return (
        <div className="card mb-3">
            <div className="card-body">
                <h2>Comments</h2>
                <hr />
                {sortedComments.map((comment) => (
                    <Comment
                        key={comment._id}
                        comment={comment}
                        onDelete={onDelete}
                    />
                ))}
            </div>
        </div>
    );
};

CommentList.propTypes = {
    comments: PropTypes.array,
    onDelete: PropTypes.func
};

export default CommentList;
