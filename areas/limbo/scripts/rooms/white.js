'use strict';

module.exports = {
  listeners: {
    playerEnter: state => function (player) {
      const questRef = 'limbo:journeybegins';
      if (state.QuestFactory.canStart(player, questRef)) {
        const quest = state.QuestFactory.create(state, questRef, player);
        player.questTracker.start(quest);
      }
    }
  }
};
