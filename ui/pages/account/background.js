import { useStat } from "react";

export default function background() {
  const [image, setImage] = useState(null);
  const [createObjectURL, setCreateObjectURL] = useState(null);
  const setLocal = e => {
    const f = e.target.files[0];
    setImage(f);
    setCreateObjectURL(URL.createObjectURL(f));
  }
  const uploadToServer = async e => {
    const body = new FormData();
    body.append("file", image);
    const response = await fetch("/api/accounts/upload", {
      method: "POST",
      body
    });
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

