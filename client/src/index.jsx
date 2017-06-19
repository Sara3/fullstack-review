import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      repos: []
    }
    this.getData = this.getData.bind(this);
     
  }

  componentWillMount() {
    this.getData();
  }

  getData () {
      $.ajax ({
      method: 'GET',
      url: '/repos', 
      success: function (data) {
        var body = JSON.parse(data);
        console.log(body);
        this.setState({repos: body});
      }.bind(this),
      error: function (err) {
        console.error(err);
      }
    });
  }


  search (term) {
    $.ajax ({
      method: 'POST',
      url: '/repos/import', 
      data: {'Body':term},
      success: function (data) {
        console.log(data)
      },
      error: function (err) {
        console.error(err);
      }
    });
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));