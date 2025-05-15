import React, {useState } from "react";
import { useContext } from "react";
import { commentContext } from "../../utils/context/commentsContext";
import multiavatar from "@multiavatar/multiavatar/esm";

const CommentSection = ({
  comments,
  videoId,
  currentUser,
  onCommentsChanged,
  videoTitle,
}) => {
  //create random avatars
  const svgCode = (str) => {
    if (str) {
      return multiavatar(str);
    } else {
      return multiavatar("ravi");
    }
  };

  // console.log(svgCode("ravi"))

  const [newComment, setNewComment] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editContent, setEditContent] = useState("");

  //   console.log(comments);

  const commentApiServices = useContext(commentContext);
  // console.log(commentApiServices)

  const handleCommentPost = async () => {
    if (!newComment.trim()) return;
    console.log("handleCommentPost called");
    console.log(newComment);

    await commentApiServices.addComment({
      userId: currentUser.userId,
      videoId,
      content: newComment,
    });

    setNewComment("");
    onCommentsChanged();
  };

  const handleEditComment = async (id) => {
    await commentApiServices.editComment(id, editContent);
    setEditingId(null);
    setEditContent("");
    onCommentsChanged();
  };

  const handleDeleteComment = async (id) => {
    await commentApiServices.deleteComment(id);
    onCommentsChanged();
  };

  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold mb-4">Comments</h3>

      {/* New Comment Input */}
      <div className="flex items-start space-x-4 mb-6">
        <div
          className="w-10 h-10 rounded-full"
          dangerouslySetInnerHTML={{ __html: svgCode(videoTitle) }}></div>
        {/* <img
          src={currentUser?.avatar || "
          https:alt="User" //example.com/default-avatar.png"}
          className="w-10 h-10 rounded-full"
        />{" "}
        */}
        <div className="flex-1">
          <textarea
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring"
            rows={3}
            placeholder="Add a comment..."
            name="newComment"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <div className="flex justify-end mt-2">
            <button
              onClick={handleCommentPost}
              className="px-4 py-1.5 rounded-full text-sm bg-gray-100 hover:bg-gray-200 text-black">
              Comment
            </button>
          </div>
        </div>
      </div>

      {/* Comments */}
      {comments.map((comment) => (
        <div key={comment._id} className="flex items-start space-x-4 mb-6">
          <img
            src={comment.user?.avatar}
            alt={comment.user?.username}
            className="w-10 h-10 rounded-full"
          />
          <div className="bg-gray-100 p-3 rounded-lg w-full">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-sm">
                {comment.user?.username}
              </h4>
              <span className="text-xs text-gray-500">
                {new Date(comment?.createdAt).toLocaleDateString()}
              </span>
            </div>
            {editingId === comment._id ? (
              <>
                <textarea
                  className="w-full mt-2 border border-gray-300 rounded p-2"
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                />
                <div className="flex gap-2 justify-end mt-2">
                  <button
                    className="text-sm text-white bg-green-600 px-3 py-1 rounded"
                    onClick={() => handleEditComment(comment._id)}>
                    Save
                  </button>
                  <button
                    className="text-sm text-gray-600 bg-gray-200 px-3 py-1 rounded"
                    onClick={() => {
                      setEditingId(null);
                      setEditContent("");
                    }}>
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <p className="text-sm mt-1">{comment.content}</p>
            )}

            {/* Edit/Delete buttons */}
            {comment.user._id === currentUser.userId &&
              editingId !== comment._id && (
                <div className="flex justify-end gap-3 mt-2 text-sm text-blue-600">
                  <button
                    className="cursor-pointer px-4 py-1.5 rounded-full text-sm bg-gray-200 hover:bg-gray-300 text-black"
                    onClick={() => {
                      setEditingId(comment._id);
                      setEditContent(comment.content);
                    }}>
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteComment(comment._id)}
                    className="cursor-pointer px-4 py-1.5 rounded-full text-sm bg-gray-200 hover:bg-gray-300 text-black">
                    Delete
                  </button>
                </div>
              )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommentSection;
