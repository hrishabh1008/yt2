import React, { useState, useContext } from "react";
import { commentContext } from "../../utils/context/commentsContext";
import { userContext } from "../../utils/context/usersContext";
import multiavatar from "@multiavatar/multiavatar/esm";

const CommentSection = ({
  comments,
  setComments,
  videoId,
  onCommentsChanged,
}) => {
  //create random avatars
  const svgCode = (str) => {
    if (str) {
      return multiavatar(str);
    } else {
      return multiavatar("ravi");
    }
  };

  const [newComment, setNewComment] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editContent, setEditContent] = useState("");

  const commentApiServices = useContext(commentContext);
  const { user, isSignedIn } = useContext(userContext);

  const handleCommentPost = async () => {
    if (!newComment.trim() || !user) return;
    const added = await commentApiServices.addComment({
      userId: user._id,
      videoId,
      content: newComment,
    });
    setComments([...comments, added]);
    setNewComment("");
    if (onCommentsChanged) onCommentsChanged([...comments, added]);
  };

  const handleEditComment = async (id) => {
    const updated = await commentApiServices.editComment(id, editContent);
    setComments(comments.map((c) => (c._id === id ? { ...c, ...updated } : c)));
    setEditingId(null);
    setEditContent("");
    if (onCommentsChanged)
      onCommentsChanged(
        comments.map((c) => (c._id === id ? { ...c, ...updated } : c))
      );
  };

  const handleDeleteComment = async (id) => {
    await commentApiServices.deleteComment(id);
    const filtered = comments.filter((c) => c._id !== id);
    setComments(filtered);
    if (onCommentsChanged) onCommentsChanged(filtered);
  };

  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold mb-4">Comments</h3>
      {/* New Comment Input */}
      {isSignedIn ? (
        <div className="flex items-start space-x-4 mb-6">
          <div
            className="w-10 h-10 rounded-full"
            dangerouslySetInnerHTML={{ __html: svgCode(user?.userName) }}></div>
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
      ) : (
        <div className="mb-6 text-gray-500">Sign in to add a comment.</div>
      )}
      {/* Comments */}
      {comments.map((comment) => {
        const commentUser = comment.user || comment.userName || {};
        return (
          <div key={comment._id} className="flex items-start space-x-4 mb-6">
            {commentUser.userAvatar ? (
              <img
                src={commentUser.userAvatar}
                alt={commentUser.userName || commentUser.username || "User"}
                className="w-10 h-10 rounded-full"
              />
            ) : (
              <div
                className="w-10 h-10 rounded-full"
                dangerouslySetInnerHTML={{
                  __html: svgCode(commentUser.userName || commentUser.username),
                }}></div>
            )}
            <div className="bg-gray-100 p-3 rounded-lg w-full">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-sm">
                  {commentUser.userName ||
                    commentUser.username ||
                    "Unknown User"}
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
              {isSignedIn &&
                commentUser._id === user?._id &&
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
        );
      })}
    </div>
  );
};

export default CommentSection;
