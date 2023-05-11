import React from 'react';
import Modal from 'react-modal';

const VideoModal = ({ isOpen, onClose, videoId }) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={onClose}>
      <div>
        <button onClick={onClose}>Close</button>
        <iframe
        title='YouTube Video'
          src={`https://www.youtube.com/embed/${videoId}`}
          allowFullScreen
        ></iframe>
      </div>
    </Modal>
  );
};

export default VideoModal;
