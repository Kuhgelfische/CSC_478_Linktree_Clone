import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic'
import styled from "styled-components";

const UserBackground = dynamic(() => import("../components/UserBackground.tsx"), {
  ssr: false
})
const UserWrapper = styled.div`
  z-index: 1;
  width: 100%;
  height: 100%;
  position: fixed;
  justify-content: center;
  align-items: center;
  display: flex;
`

export default function Profile() {
  const router = useRouter();
  const { profile } = router.query;

  const [links, setLinks] = useState([]);
  const [bio, setBio] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bg, setBg] = useState();

  useEffect(() => {
    if (!profile)
      return;

    fetch(`http://localhost:8080/profiles/${profile}`)
      .then(res => res.json())
      .then(json => {
        if (json['ok']) {
          setLinks(json['data']['links']);
          setBio(json['data']['bio']);
          setBg(json['data']['bg']);
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
    <>
    <UserWrapper>
      <div className='text-center mt-2 w-50 mx-auto backdrop'>
        <h2>{profile}</h2>
        <p>{bio}</p>
        <div className="d-flex flex-column px-2">
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
    </UserWrapper>
    <UserBackground bg={bg}/>
    </>
  )
}