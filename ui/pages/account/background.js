import { useRouter } from 'next/router';
import { useState } from "react";
import useSession from '../../hooks/session';

export default function background() {
  const session = useSession()
  const router = useRouter();
  const { profile } = router.query;
  const [image, setImage] = useState(null);
  const [createObjectURL, setCreateObjectURL] = useState(null);
  const [loading, setLoading] = useState(true);
  let i = undefined;

  const setLocal = e => {
    const f = e.target.files[0];
    i = f
    setImage(f);
    setCreateObjectURL(URL.createObjectURL(f));
  }

  const uploadToServer = e => {
    const body = new FormData();
    body.append('background', image);
    console.log(body)
    fetch("http://localhost:8080/upload/background", {
      method: "POST",
      headers: {
        'x-session': session['token'],
      },
      body
    }).then(res => res.json())
      .then(json => console.log(json))
      .catch(err => console.error(err));
  };
  return (
    <div className="text-center mt-2 w-50 mx-auto">
        <img className="backgroundDemo" src={createObjectURL} alt="No background set"/>
        <h4>Select a JPG image to upload</h4>
        <input type="file" name="userBackground" onChange={setLocal}/>
        <button
          className="btn btn-primary"
          type="submit"
          onClick={uploadToServer}
          >Upload</button>
    </div>
  )
}

