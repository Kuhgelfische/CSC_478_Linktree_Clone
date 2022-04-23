import { useEffect, useState, useRef } from "react";
import LTC_LinkEditor from "../../components/linkEditor";
import useSession from '../../hooks/session';
import {
  Button
} from 'react-bootstrap';

export default function links() {
  const session = useSession();
  const [links, setLinks] = useState([]);

  // Grab links from the API on page load
  useEffect(() => {
    if (session) {
      fetch('http://localhost:8080/session/links', {
        headers: {
          'x-session': session['token']
        }
      })
        .then(res => res.json())
        .then(json => setLinks(json['links']))
        .catch(err => console.error(err));
    }
  }, [session]);

  // Automatically push state to the API when it changes
  // The saveCounter skips the first two times this fires
  //   1. when the page loads, there are no links, we don't want to save that
  //   2. when we get the initial data from the API, we don't need to save that
  const saveCounter = useRef(0);
  useEffect(() => {
    saveCounter.current += 1;
    console.log("saveCounter: " + saveCounter.current)
    if (saveCounter.current > 2) {
      console.log(links);
      fetch('http://localhost:8080/session/links', {
        method: 'PUT',
        headers: {
          'x-session': session['token'],
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({links})
      })
    }
  }, [links]);

  function updateLink(id, values)
  {
    // We have to do some funky stuff with arrays so the useEffect fires
    const arr = [...links];
    for (var i in arr) {
      let inst = arr[i];
      console.log(id)
      if (inst.id === id) {
        inst['title'] = values['title'];
        inst['url'] = values['url'];
        setLinks(arr);  // NOTE: this will trigger an API save with the useEffect above
        break;
      }
    }
  }

  // Delete locally and also save state to API 
  function deleteLink(id)
  {

  }

  return (
    <div>
      {
        links.length === 0 ?
        <div className="text-center font-italic">No links</div>
        :
        <div>
          {
            links.map(link => 
              <LTC_LinkEditor
                key={link.id}
                link={link}
                onChange={(values) => updateLink(link.id, values)}
              />
            )
          }
        </div>
      }

      <div className="text-center">
        <Button className="mb-2 mt-2">Add Link</Button>
      </div>
    </div>
  )
}