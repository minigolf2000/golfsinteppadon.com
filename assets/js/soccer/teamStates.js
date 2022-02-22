TeamStates = Class.create({
	
	initialize: function(team, ball) {
		this.team = team;
		this.ball = ball;
		this.state = "kickoff";
	},
	
	/**
	*	Update team state
	*/
	update: function() {
		switch (this.state) {
		
			case "defending":
				if (this.team.controllingPlayer) { this.changeState("attacking"); }
				break;
			
			case "attacking":
				if (!this.team.controllingPlayer) { this.changeState("defending"); }
				break;
			
			case "kickoff":
				// If all players on field are in their home regions, change state to defending
				for (var i = 0; i < this.team.players.length; i++) {
					if (!this.team.players[i].inHomeRegion() || !this.team.opponent.players[i].inHomeRegion()) {
						return;
					}
				}
				this.team.pitch.gameOn = true;
				this.changeState("defending");
				break;
			
			default:
				return [0, 0];
		}
	},
	
	/**
	*	Change state of team and run state entrance code
	*/
	changeState: function(state) {
		if (state == "defending") {
			this.team.setPlayerHomeRegions(this.team.defendingRegions);
			
			this.team.updateTargetsOfWaitingPlayers();
		}
		else if (state == "attacking") {
			this.team.setPlayerHomeRegions(this.team.attackingRegions);
			
			this.team.updateTargetsOfWaitingPlayers();
		}
		else if (state == "kickoff") {
			this.team.receivingPlayer = null;
			this.team.closestPlayerToBall = null;
			this.team.controllingPlayer = null;
			this.team.supportingPlayer = null;
		
			this.team.setPlayerHomeRegions(this.team.defendingRegions);
			this.team.returnAllFieldPlayersToHome();
		}
		this.state = state;
	}
});