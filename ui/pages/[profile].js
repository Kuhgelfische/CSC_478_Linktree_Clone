import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import LTC_Link from '../components/link';

export default function Profile() {
  const router = useRouter();
  const { profile } = router.query;

  const [links, setLinks] = useState([]);
  const [bio, setBio] = useState("");
  const [color, setColor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!profile)
      return;

    fetch(`http://localhost:8080/profiles/${profile}`)
      .then(res => res.json())
      .then(json => {
        if (json['ok']) {
          setLinks(json['data']['links']);
          setBio(json['data']['bio']);
          setColor(json['data']['linkColor']);
          setLoading(false);
        } else {
          setError(json['msg'])
          setLoading(false);
        }
      })
      .catch(err => console.error(err));
  }, [profile]);

  if (loading) {
    return <h2 className='text-center'>Loading...</h2>
  }

  if (error !== null) {
    return <h2 className='text-center'>{error}</h2>
  }

  return (
    <div className='text-center mt-2 w-50 mx-auto'>
      <h2>{profile}</h2>
      <p>{bio}</p>
      <div className="d-flex flex-column px-2">
        {
          links.map(link => (
            <div key={link.id}>
              <LTC_Link title={link.title} url={link.url} color={color} />
              <div style={{ height: '1rem' }} />
            </div>
          ))
        }
      </div>
    </div>
  )
}