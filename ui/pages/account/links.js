import { useEffect, useState } from "react";
import LTC_LinkEditor from "../../components/linkEditor";
import useSession from '../../hooks/session';
import {
  Button
} from 'react-bootstrap';

export default function links() {
  const session = useSession();
  const [links, setLinks] = useState([]);

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

  return (
    <div>
      {
        links.length === 0 ?
        <div className="text-center">No links</div>
        :
        <div>
          {
            links.map(link => <LTC_LinkEditor key={link.id} link={link} />)
          }
        </div>
      }

      <Button>Add Link</Button>
    </div>
  )
}