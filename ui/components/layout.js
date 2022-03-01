import LTC_Navbar from './navbar'
import LTC_Footer from './footer'

export default function LTC_Layout({ children }) {
  return (
    <>
      <LTC_Navbar />
      <main>{children}</main>
      <LTC_Footer />
    </>
  )
}