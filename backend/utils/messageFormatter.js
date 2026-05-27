const { v4: uuidv4 } = require('crypto');

/**
 * Format a message object with consistent structure
 * @param {string} author 
 * @param {string} text 
 * @param {'user'|'system'} type 
 * @param {string} [socketId] 
 */
function formatMessage(author, text, type = 'user', socketId = null) {
  return {
    id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    author,
    text,
    type,
    socketId,
    timestamp: new Date().toISOString(),
  };
}

module.exports = { formatMessage };
