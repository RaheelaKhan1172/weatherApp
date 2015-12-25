var App = React.createClass({
 render: function() {
    return (
    <div> 
      <h1> hi </h1>
    </div>
  );
  }

});

var Weather = React.createClass({
  getInitialState:function() {
    return {
      forecase:null
    };
  }

});

ReactDOM.render(
  <App />,
  document.body);
