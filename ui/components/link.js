
export default function LTC_Link({ title, url, color }) {
  
  // Default color
  color ||= 'secondary';
  
  return (
    <a
      className={`w-100 p-3 bg-${color} bg-gradient d-inline-block text-center text-white text-decoration-none`}
      href={url}
      target="_blank"
    >
      <h3 className='m-0'>{title}</h3>
    </a>
  )
}