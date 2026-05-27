/**
 */

class RoomManager {
  constructor() {
    this.rooms = new Map();
  }

  /**
   * @param {string} roomId 
   * @param {string} socketId 
   * @param {object} userInfo
   */
  addUser(roomId, socketId, userInfo) {
    if (!this.rooms.has(roomId)) {
      this.rooms.set(roomId, new Map());
    }
    this.rooms.get(roomId).set(socketId, {
      socketId,
      ...userInfo,
      joinedAt: new Date().toISOString(),
    });
  }

  /**
   */
  removeUserFromRoom(roomId, socketId) {
    if (this.rooms.has(roomId)) {
      this.rooms.get(roomId).delete(socketId);
      // Clean up empty rooms
      if (this.rooms.get(roomId).size === 0) {
        this.rooms.delete(roomId);
      }
    }
  }

  /**
   * @returns {Array} 
   */
  removeUserFromAllRooms(socketId) {
    const leftRooms = [];
    for (const [roomId, users] of this.rooms.entries()) {
      if (users.has(socketId)) {
        const user = users.get(socketId);
        users.delete(socketId);
        leftRooms.push({ roomId, user });
        if (users.size === 0) {
          this.rooms.delete(roomId);
        }
      }
    }
    return leftRooms;
  }

  /**
   */
  getRoomUsers(roomId) {
    if (!this.rooms.has(roomId)) return [];
    return Array.from(this.rooms.get(roomId).values());
  }

  /**
   */
  getRoomCount(roomId) {
    return this.rooms.has(roomId) ? this.rooms.get(roomId).size : 0;
  }

  /**
   */
  getAllRooms() {
    const result = [];
    for (const [roomId, users] of this.rooms.entries()) {
      result.push({ roomId, userCount: users.size });
    }
    return result;
  }

  /**
   */
  getUserRoom(socketId) {
    for (const [roomId, users] of this.rooms.entries()) {
      if (users.has(socketId)) return roomId;
    }
    return null;
  }
}

module.exports = new RoomManager();
