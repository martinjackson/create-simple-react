import React, {useState, useEffect} from "react";

// don't go outside the index of array
const bound = (i, arr) => {
  const max = (arr) ?  arr.length-1 : 0
  return (i < 0) ? 0 : (i > max) ? max : i
}


const RecordView = (props) => {
  const [index, setIndex] = useState(props.index || 4)
  const [people, setPeople] = useState();
  const [msg, setMsg] = useState('Loading...');
  const url = props.url || 'https://jsonplaceholder.typicode.com/users';

  const update = () => {
    fetch(url)
    .then(results => results.json() )
    .then(data => { setPeople(data) })
    .catch(err => { setMsg(err.message) })
  }

  // like componentDidMount(), update() only called when [url] changes
  useEffect(update, [url])

  const click = (e) => {
    e.preventDefault()
    const inc = parseInt(e.target.value)
    setIndex( (prev) => bound(prev+inc, people) )
  }   // using passed prev value, can have a group of calls to setIndex

  const Button = (props) => {
    const tag = (props.jumpAhead5)? 5:(props.jumpBack5)? -5:(props.dec)? -1:1
    return (<button onClick={click} value={tag}>{props.children}</button>)
  }

  const displayRecord = (index) => {
    const person = people[index]
    const addr = `${person.address.street}, ${person.address.suite},
                  ${person.address.city} ${person.address.zipcode}`
    const geo = `${person.address.geo.lat} ${person.address.geo.lng}`

    const ss = { fontSize: 'xx-large' }
    return <div style={props.style}>
              <div>
                <span style={ss}>Record View (React Hooks and fetch Web API) </span><br/><br/>
                <strong>Record:</strong> {index+1}<br/>
                <strong>name:</strong> {person.name} <br/>
                <strong>email:</strong> {person.email} <br/>
                <strong>address:</strong> {addr} <br/>
                <strong>geo:</strong> {geo} <br/>
                <Button jumpBack5>&#8647;</Button>
                <Button dec>Prev</Button>
                <Button inc>Next</Button>
                <Button jumpAhead5>&#8649;</Button>
              </div>
    </div>
  }

  // functional return instead of render()
  return (people) ? displayRecord(index) : (<div>{msg}</div>)
};

export default RecordView