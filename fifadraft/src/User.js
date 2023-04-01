import Roster from './components/Roster';

export default class User {
  constructor({ roster, uid, title="error_title"}) {
    this.title = title
    this.roster = roster
    this.uid = uid
    this.comp = <Roster user={this}/>
  }

  addPlayer({ player }) {
    this.roster = [ ...this.roster, player]
  }
  
  json() {
    return {
        "title": this.title,
        "roster": this.roster,
        "uid": this.uid
    }
  }
}