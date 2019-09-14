class Form extends React.Component {
    state = {userName: ''}
    
    handleSubmit = async (event) => {
      event.preventDefault();
      let profile = await fetch(`https://api.github.com/users/${this.state.userName}`).then(response => response.json());
      this.props.addUserAction(profile);
    }
  
    render() {
      return (
        <form>
          <input
            type="text"
            placeholder="Github username"
            required
            value={this.state.userName}
            onChange={event => this.setState({userName: event.target.value})} />
          <button onClick={this.handleSubmit}>Add user</button>
        </form>
      );
    }
  }
  
  function CardList(props) {
    return (
      <div>
        {props.profiles.map(p => <Card profile={p}/>)}
      </div>
    )
  }
  
  class Card extends React.Component {
      render() {
        return (
          <div className="github-profile">
            <img src={this.props.profile.avatar_url} />
          <a href={this.props.profile.html_url}>
            <div className="info">
              <div className="name">{this.props.profile.name}</div>
              <div className="company">{this.props.profile.company}</div>
            </div>
          </a>
          </div>
      );
    }
  }
  
  class App extends React.Component {
    state = {profiles: []}
  
    addUser = (profile) => {
      this.setState(prevState => ({
        profiles: [...prevState.profiles, profile]
      }));
    }
  
      render() {
        return (
          <div>
            <div className="header">{this.props.title}</div>
          <Form addUserAction={this.addUser} />
          <CardList profiles={this.state.profiles} />
          </div>
      );
    }	
  }
  
  ReactDOM.render(
      <App title="The GitHub Cards App" />,
    mountNode,
  );