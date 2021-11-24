function getRandomval(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
const app = Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
      currentRound: 0,
      winner: null,
      logMassages: [],
    };
  },
  computed: {
    styleplayer() {
      if (this.playerHealth < 0) {
        return { width: "0%" };
      }
      return { width: this.playerHealth + "%" };
    },
    stylemonster() {
      if (this.monsterHealth < 0) {
        return { width: "0%" };
      }
      return { width: this.monsterHealth + "%" };
    },

    mySpecialAttack() {
      return this.currentRound % 3 !== 0;
    },
  },
  watch: {
    playerHealth(value) {
      if (value <= 0 && this.monsterHealth <= 0) {
        this.winner = "draw";
      } else if (value <= 0) {
        this.winner = "monster";
      }
    },
    monsterHealth(value) {
      if (value <= 0 && this.playerHealth <= 0) {
        this.winner = "draw";
      } else if (value <= 0) {
        this.winner = "player";
      }
    },
  },
  methods: {
    checklog(actionBy) {
      switch (actionBy) {
        case "player":
          return "Player ";
          break;
        case "monster":
          return "Monster ";
        case "heal":
          return "Player ";
          break;
      }
    },
    surrender() {
      this.winner = "monster";
    },
    statrGame() {
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.currentRound = 0;
      this.winner = null;
      this.logMassages = [];
    },
    reshealth() {
      const rand = getRandomval(15, 8);
      if (this.playerHealth + rand >= 100) {
        this.playerHealth = 100;
        this.addLogMasg("heal", "attack", rand);

        this.attackPlayer();
      } else {
        this.addLogMasg("heal", "attack", rand);

        this.playerHealth += rand;
      }
    },
    attackMonster() {
      this.currentRound++;
      const random = getRandomval(12, 5);
      this.monsterHealth -= random;
      this.addLogMasg("player", "attack", random);
      this.attackPlayer();
    },
    attackPlayer() {
      const random = getRandomval(15, 8);
      this.playerHealth -= random;
      this.addLogMasg("monster", "attack", random);
    },
    specialAttackMonster() {
      this.currentRound++;
      const random = getRandomval(10, 25);
      this.monsterHealth -= random;

      this.attackPlayer();
    },
    addLogMasg(who, what, value) {
      this.logMassages.unshift({
        actionBy: who,
        actionType: what,
        actionValue: value,
      });
    },
  },
});
app.mount("#game");
