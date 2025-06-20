import { useState, useEffect } from "react";
import {
  ChatBubbleLeftRightIcon,
  PaperAirplaneIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import toast from "react-hot-toast";
import axiosInstance from "../api/axiosInstance";

const Messages = () => {
  const [messages, setMessages] = useState([]); // State to store messages
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState(true); // State to manage message status

  const handleStatusChange = async (messageId, newStatus) => {
    try {
      await axiosInstance.put(`/messages/${messageId}`, {
        isRead: newStatus === "Read",
      }); // API endpoint to update message status
      setMessages(
        messages.map((message) =>
          message._id === messageId
            ? { ...message, isRead: !message.isRead }
            : message
        )
      );
      toast.success(`Message marked as ${newStatus}`);
    } catch (error) {
      console.error("Error updating message status:", error);
      toast.error("Failed to update message status");
    }
  };

  // Fetch messages from the database
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axiosInstance.get("/messages");
        console.log(response); // API endpoint to fetch messages
        setMessages(response.data.data); // Assuming the response contains a `data` field with messages
        setLoading(false);
      } catch (error) {
        toast.error("Failed to fetch messages");
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  // const handleReply = async (messageId) => {
  //   try {
  //     await axiosInstance.post(`/messages/${messageId}/reply`, { reply: replyText }); // API endpoint to send a reply
  //     toast.success("Reply sent successfully!");
  //     setReplyText("");
  //   } catch (error) {
  //     toast.error("Failed to send reply");
  //   }
  // };

  const handleDelete = async (messageId) => {
    try {
      await axiosInstance.delete(`/messages/${messageId}`); // API endpoint to delete a message
      setMessages(messages.filter((message) => message._id !== messageId));
      toast.success("Message deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete message");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500 dark:text-gray-400">Loading messages...</p>
      </div>
    );
  }

  return (
    <div className="flex h-[calc(100vh-8rem)]">
      {/* Messages List */}
      <div className="w-1/3 border-r border-gray-200 dark:border-gray-700 overflow-y-auto">
        <div className="p-4">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white">
            Messages
          </h2>
        </div>
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {messages.map((message) => (
            <div
              key={message._id}
              className={`p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 ${
                selectedMessage?._id === message._id
                  ? "bg-gray-50 dark:bg-gray-700"
                  : ""
              }`}
              onClick={() => setSelectedMessage(message)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <ChatBubbleLeftRightIcon className="h-5 w-5 text-gray-400 mr-2" />
                  <span className="font-medium text-gray-900 dark:text-white">
                    {message.customer?.name}
                  </span>
                </div>
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    message.isRead
                      ? "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
                      : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                  }`}
                >
                  {message.isRead ? "Read" : "Unread"}
                </span>
              </div>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 truncate">
                {message.subject || "No Subject"}
              </p>

              <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
                {new Date(message.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Message Detail */}
      <div className="flex-1 flex flex-col">
        {selectedMessage ? (
          <>
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    {selectedMessage.subject}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    From:{" "}
                    {selectedMessage.customer?.name ||
                      selectedMessage.sender?.name}{" "}
                    (
                    {selectedMessage.customer?.email ||
                      selectedMessage.sender?.email}
                    )
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() =>
                      handleStatusChange(
                        selectedMessage._id,
                        selectedMessage.isRead ? "Unread" : "Read"
                      )
                    }
                    className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    {selectedMessage.isRead ? "Mark as Unread" : "Mark as Read"}
                  </button>
                  <button
                    onClick={() => handleDelete(selectedMessage._id)}
                    className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    <TrashIcon className="h-4 w-4 mr-1" />
                    Delete
                  </button>
                </div>
              </div>
            </div>

            {/* <div className="flex-1 p-4 overflow-y-auto">
              <p className="text-gray-700 dark:text-gray-300">{selectedMessage.message}</p>
            </div> */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4">
              <p className="text-gray-700 dark:text-gray-300">
                {selectedMessage.message}
              </p>

              {selectedMessage.attachments?.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold text-gray-600 dark:text-gray-300 mb-2">
                    Attachments:
                  </h4>
                  <div className="space-y-2">
                    {selectedMessage.attachments.map((url, index) => (
                      <div key={index}>
                        {/* If it's an image, show it; otherwise, show a download link */}
                        {url.match(/\.(jpeg|jpg|png|gif|webp)$/i) ? (
                          <img
                            src={url}
                            alt={`Attachment ${index + 1}`}
                            className="max-w-xs rounded border border-gray-300 dark:border-gray-600"
                            onError={(e) => {
                              e.target.onerror = null; // Prevent infinite loop
                              e.target.src = "path/to/default-image.jpg"; // Provide a fallback image
                            }}
                          />
                        ) : (
                          <a
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-indigo-600 hover:underline dark:text-indigo-400"
                          >
                            View Attachment {index + 1}
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex space-x-2">
                <textarea
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Type your reply..."
                  className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  rows={3}
                />
                <button
                  onClick={() => handleReply(selectedMessage._id)}
                  disabled={!replyText.trim()}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <PaperAirplaneIcon className="h-5 w-5" />
                </button>
              </div>
            </div> */}
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500 dark:text-gray-400">
            Select a message to view
          </div>
        )}
      </div>
    </div>
  );
};

export default Messages;
