import { useState } from "react";
import { useParams } from "react-router-dom";
import videosData from "../../public/videosData.json";

const WatchVideo = () => {
  const { id } = useParams();

  const video = videosData.videos.find((vid) => vid._id === id);

  // Dummy data for demonstration if no video prop is passed
  const defaultVideo = {
    videoUrl: "https://www.youtube.com/watch?v=ysz5S6PUM-U",
    title: "Sample Video",
    description: "This is a sample video description.",
    channel: "Sample Channel",
    likes: 120,
    dislikes: 5,
    comments: [
      { _id: 1, user: "Alice", text: "Great video!" },
      { _id: 2, user: "Bob", text: "Very informative." },
    ],
  };

  const vid = video || defaultVideo;

  // Extract YouTube video ID from URL
  // const getYouTubeId = (url) => {
  //   const regExp =
  //     /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  //   const match = url.match(regExp);
  //   return match && match[2].length === 11 ? match[2] : null;
  // };

  // const videoUrl = getYouTubeId(vid.videoUrl || vid.videoUrl);

  const [likes, setLikes] = useState(vid.likes);
  const [dislikes, setDislikes] = useState(vid.dislikes);
  const [comments, setComments] = useState(vid.comments);
  const [commentInput, setCommentInput] = useState("");

  const handleLike = () => setLikes((l) => l + 1);
  const handleDislike = () => setDislikes((d) => d + 1);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (commentInput.trim()) {
      setComments([
        ...comments,
        { id: Date.now(), user: "You", text: commentInput },
      ]);
      setCommentInput("");
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-8 mb-8 p-6 bg-white rounded-xl shadow-lg font-sans">
      {/* Video Player */}
      <div className="w-full aspect-video bg-black rounded-lg overflow-hidden mb-6">
        {video.videoUrl ? (
          <iframe
            className="w-full h-full"
            src={video.videoUrl}
            title={vid.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen></iframe>
        ) : (
          <video className="w-full h-full" controls>
            <source src={vid.videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}
      </div>

      {/* Title and Description */}
      <h2 className="mb-2 font-medium text-2xl text-neutral-900">
        {vid.title}
      </h2>
      <div className="text-neutral-600 text-base mb-4">{vid.description}</div>

      {/* Channel Name */}
      <div className="font-medium text-neutral-900 mb-5 text-sm">
        Channel: {vid.channel}
      </div>

      {/* Like and Dislike Buttons */}
      <div className="mb-7 flex gap-3">
        <button
          onClick={handleLike}
          className="bg-neutral-100 hover:bg-neutral-200 border-none rounded-full px-5 py-2 text-base cursor-pointer text-neutral-900 font-medium transition">
          👍 {likes}
        </button>
        <button
          onClick={handleDislike}
          className="bg-neutral-100 hover:bg-neutral-200 border-none rounded-full px-5 py-2 text-base cursor-pointer text-neutral-900 font-medium transition">
          👎 {dislikes}
        </button>
      </div>

      {/* Comment Section */}
      <div>
        <h3 className="text-lg font-medium text-neutral-900 mb-3">Comments</h3>
        <form
          onSubmit={handleCommentSubmit}
          className="mb-4 flex gap-2 items-center">
          <input
            type="text"
            value={commentInput}
            onChange={(e) => setCommentInput(e.target.value)}
            placeholder="Add a comment..."
            className="flex-1 px-4 py-2 rounded-full border border-neutral-200 text-sm bg-neutral-50 outline-none focus:border-blue-400"
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white border-none rounded-full px-5 py-2 font-medium text-sm cursor-pointer transition">
            Post
          </button>
        </form>
        <ul className="list-none p-0">
          {comments.map((c) => (
            <li
              key={c.id || c._id}
              className="mb-3 py-2 border-b border-neutral-100">
              <strong className="text-neutral-900">{c.user}:</strong>{" "}
              <span className="text-neutral-800">{c.text || c.content}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default WatchVideo;
