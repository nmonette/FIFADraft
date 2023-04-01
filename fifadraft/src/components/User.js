import Roster from './Roster';

export class User {
  constructor({ update, roster, uid, title="error_title"}) {
    this.title = title
    this.roster = roster
    this.uid = uid
    this.update = update
    this.comp = <Roster user={this}/>
  }

  addPlayer({ player }) {
    this.roster = [ ...this.roster, player]
    this.update(this.roster)
  }
  
  json() {
    return {
        "title": this.title,
        "roster": this.roster,
        "uid": this.uid
    }
  }
}