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

  /**
   * Requirement 2.4
   * All links will auto-save after input blur, deletion, and adding links
   */
  const saveCounter = useRef(0);
  useEffect(() => {
    saveCounter.current += 1;
    if (saveCounter.current > 2) {
      fetch('http://localhost:8080/session/links', {
        method: 'PUT',
        headers: {
          'x-session': session['token'],
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({links})
      })
    }
  }, [links]); // <-- 2.4 useEffect is watching the links variable

  /**
   * Requirement 2.2
   * The user should add as many links as they want
   */
  function addLink()
  {
    fetch('http://localhost:8080/session/links', {
      method: 'POST',
      headers: {
        'x-session': session['token'],
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(json => {
        const arr = [...links];
        arr.push(json['link']);
        setLinks(arr);
      })
      .catch(err => console.error(err));
  }

  function updateLink(id, values)
  {
    // We have to do some funky stuff with arrays so the useEffect fires
    const arr = [...links];
    for (var i in arr) {
      let inst = arr[i];
      if (inst.id === id) {
        inst['title'] = values['title'];
        inst['url'] = values['url'];
        setLinks(arr);  // NOTE: this will trigger an API save with the useEffect above
        break;
      }
    }
  }

  /**
   * Requirement 2.3
   * Users can delete links
   */
  // Delete locally and also save state to API 
  function deleteLink(id)
  {
    const arr = [...links];
    for (var i in arr) {
      if (arr[i]['id'] === id) {
        arr.splice(i, 1);
        break;
      }
    }
    setLinks(arr);  // NOTE: this will trigger an API save with the useEffect above
  }

  return (
    <div>
      {
        links.length === 0 ?
        <div className="text-center font-italic">No links</div>
        :
        <div>
          {
          /**
           * Requirement 2.1
           * The interface should resemble a modular design
           */
            links.map(link => 
              <LTC_LinkEditor
                key={link.id}
                link={link}
                onChange={(values) => updateLink(link.id, values)}
                onDelete={() => deleteLink(link.id)}
              />
            )
          }
        </div>
      }

      <div className="text-center">
        <Button className="mb-2 mt-2" onClick={addLink}>Add Link</Button>
      </div>
    </div>
  )
}