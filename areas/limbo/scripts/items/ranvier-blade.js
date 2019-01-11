'use strict';

const { Random } = require('rando-js');

const { Broadcast, Heal } = require('ranvier');

/**
 * Example weapon hit script
 */
module.exports = {
  listeners: {
    hit: state => function (damage, target, finalAmount) {
      if (!damage.attacker || damage.attacker.isNpc) {
        return;
      }

      // Have to be careful in weapon scripts. If you have a weapon script that causes damage and
      // it listens for the 'hit' event you will have to check to make sure that `damage.source
      // !== this` otherwise you could create an infinite loop the weapon's own damage triggering
      // its script

      if (Random.probability(50)) {
        const amount = damage.metadata.critical ?
          damage.attacker.getMaxAttribute('health') :
          Math.floor(finalAmount / 4);

        const heal = new Heal('health', amount, damage.attacker, this);

        Broadcast.sayAt(damage.attacker, `<b><white>The Blade of Ranvier shines with a bright white light and you see wisps of ${target.name}'s soul flow into the blade.</white></b>`, 80);
        heal.commit(damage.attacker);
      }
    }
  }
};
