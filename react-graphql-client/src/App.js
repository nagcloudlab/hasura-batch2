import './App.css';
import { gql, useQuery } from '@apollo/client'
import 'bootstrap/dist/css/bootstrap.css'

const GET_SESSIONS = gql`
query GET_SESSIONS{
  sessions {
    title
    track
    speakers {
      name
    }
  }
}
`;

function App() {

  const { loading, error, data } = useQuery(GET_SESSIONS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const renderSessions = () => {
    return data.sessions.map(session => {
      return (
        <div className='card card-body'>
          <div className='display-1'>{session.title}</div>
          <div className='display-3'>{session.track}</div>
          {session.speakers.map(sp => {
            return (
              <div className='display-4'>{sp.name}</div>
            )
          })}
        </div>
      )
    })
  }

  return (
    <div className="App">
      {renderSessions()}
    </div>
  );
}

export default App;
