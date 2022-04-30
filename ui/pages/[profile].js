import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

export default function Profile() {
  const router = useRouter();
  const { profile } = router.query;

  const [links, setLinks] = useState([]);
  const [bio, setBio] = useState("");
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
      <div class="d-flex flex-column px-2">
        {
          links.map(link => (
            <a
              className='w-100 mb-3 p-3 bg-secondary bg-gradient d-inline-block text-white text-decoration-none'
              key={link.id}
              href={link.url}
              target="_blank"
            >
              <h3 className='m-0'>{link.title}</h3>
            </a>
          ))
        }
      </div>
    </div>
  )
}