'use strict';

const { Broadcast } = require('ranvier');

module.exports = {
  listeners: {
    playerEnter: state => function (player) {
      Broadcast.sayAt(player);
      Broadcast.sayAt(player, `<b><cyan>Hint: Waypoints allow you to travel vast distances. Save waypoints with '<white>waypoint save</white>', set your preferred home with '<white>waypoint home</white>. If you have enough energy you can return home at any time with '<white>recall</white>'.</cyan></b>`, 80);
    },

    channelReceive: state => function (channel, sender, message) {
      if (channel.name !== 'say') {
        return;
      }

      if (!message.toLowerCase().match('mellon')) {
        return;
      }

      const downExit = this.getExits().find(exit => exit.direction === 'down');
      const downRoom = state.RoomManager.getRoom(downExit.roomId);

      Broadcast.sayAt(sender, "You have spoken 'friend', you may enter. The trap door opens with a *click*");
      downRoom.unlockDoor(this);
      downRoom.openDoor(this);
    },
  }
};
