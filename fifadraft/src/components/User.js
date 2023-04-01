import Roster from './Roster';

let playercount = 0

class User {
  constructor({ update, roster, title="error_title"}) {
    this.title = title
    this.roster = roster
    playercount += 1
    this.id = playercount
    this.update = update
    this.comp = <Roster user={this}/>
  }

  addPlayer({ player }) {
    this.roster = [ ...this.roster, player]
    this.update(this.roster)

  }
  
}