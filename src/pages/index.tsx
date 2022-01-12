import type { NextPage } from 'next'
import { useEffect } from 'react'
import { usersStorage } from '../data/users'
import { LandingPageLayout } from '../layout/LandigPage'
import { AboutUs } from '../layout/LandigPage/components/AboutUs'
import { Cards } from '../layout/LandigPage/components/Cards'
import { Footer } from '../layout/LandigPage/components/Footer'
import { NewsLetter } from '../layout/LandigPage/components/NewsLetter'
import { SuccessCampaigns } from '../layout/LandigPage/components/SuccessCampaigns'
import { TopBanner } from '../layout/LandigPage/components/TopBanner'

const userStorageKey = '@colabora-ai:user'

const Home: NextPage = () => {
  useEffect(() => {
    console.log(localStorage.getItem(userStorageKey))
  }, [usersStorage])

  return (
    <LandingPageLayout>
      <TopBanner />
      <Cards />
      <AboutUs />
      <SuccessCampaigns />
      <NewsLetter />
      <Footer />
    </LandingPageLayout>
  )
}

export default Home
