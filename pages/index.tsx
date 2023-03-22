import Image from 'next/image'
import { useState } from 'react'
import { NextPage, GetStaticProps } from 'next'
import { BoardType, OfficerImage, TextDivider } from '@components/ui'
import { StepButton } from '@components/inputs'

// GetStaticProps Types Used
import type { Event, Officer } from '@public/types'

// Supabase Client
import { supabase } from '@db/_supabase'
import type {
  PostgrestResponse,
  PostgrestSingleResponse
} from '@supabase/supabase-js'

// Styles
import styles from '../styles/Home.module.sass'

export const getStaticProps: GetStaticProps = async () => {
  // Delete outdated events
  const tomorrow = new Date()
  tomorrow.setUTCDate(tomorrow.getUTCDate() + 1)
  await supabase
    .from('events')
    .delete()
    .lt('date', tomorrow.toISOString().substring(0, 10))

  // Fetch next event, UTC time
  const { data: event }: PostgrestSingleResponse<Event> = await supabase
    .from('events')
    .select('*')
    .order('date')
    .limit(1)
    .single()

  // Fetch all officers
  const { data: officers }: PostgrestResponse<Officer> = await supabase
    .from('officers')
    .select('*')
    .order('id')

  // TODO - Handle null case for events, if database fetching error

  // Get all file names in bucket
  const { data: images } = await supabase.storage
    .from('officer-images')
    // This gets rid of the default image dot file
    .list(undefined, { offset: 1 })

  // Make an array of file names from each image
  const imageNames = images?.map((image) => image.name)

  officers?.forEach((officer) => {
    const image = imageNames?.find((file_name) =>
      // Follows the {First Name}_{Last_Name} pattern, need it to get file type
      file_name.startsWith(`${officer.first_name}_${officer.last_name}`)
    )

    // Set the officer's src prop to the file name, or the default image if it doesn't exist
    officer.src = image
      ? `${process.env.BUCKET_PATH}${image}`
      : '/img/DefaultOfficerImage.jpg'
  })

  return {
    props: { event, officers },
    revalidate: 60 * 60 * 6 /* Rebuild every 6 hours */
  }
}

interface Props {
  event: Event
  officers: Officer[]
}

const Home: NextPage<Props> = ({ event, officers }) => {
  // Only show the first three officers if they exist
  const truncatedOfficers = officers.slice(0, 3)
  const [isTruncated, setIsTruncated] = useState(true)
  const eventDate = new Date(event?.date)

  // Set time for Dates
  let time

  // Set start time
  const startTime = new Date()
  time = event?.start_time.split(':')
  if (time) {
    startTime.setHours(parseInt(time[0]))
    startTime.setMinutes(parseInt(time[1]))
  }

  // Set end time
  const endTime = new Date()
  time = event?.end_time.split(':')
  if (time) {
    endTime.setHours(parseInt(time[0]))
    endTime.setMinutes(parseInt(time[1]))
  }

  return (
    <div className={styles.container}>
      <main>
        <div className={styles.content}>
          <section className={styles.hero}>
            <h1>
              Shred
              <br />
              quarters
            </h1>
            <div className={styles.iso_truck}>
              <Image
                src='/img/truck_iso.svg'
                layout='responsive'
                width='64'
                height='64'
                objectFit='contain'
                placeholder='blur'
                blurDataURL='/img/truck_iso.svg'
                priority
                alt='hero_blob'
              />
            </div>
            <p>
              An all-inclusive skate club focused primarily on skateboarding and
              longboarding, but open to anything on wheels! Meet fellow
              shredders in an inclusive, social, and community-oriented club
              right here on the Virginia Tech campus.
            </p>
          </section>
          <div style={{ position: 'relative' }}>
            <TextDivider header='The Crew' float={20} id='crew' />
            <section>
              <ul className={styles.boards}>
                <BoardType
                  src='/img/skateboard_iso.svg'
                  alt='Skateboard isometric picture'
                  header='Skateboards'
                >
                  The hallmark of Shredquarters - you can find a variety of
                  skateboarders affiliated with the club. From casual street
                  skaters to complex trick enthusiasts, you are sure to find
                  your crowd here! Shredquarters provides a unique community
                  experience where even beginner shredders can thrive on their
                  deck.
                </BoardType>
                <BoardType
                  src='/img/longboard_iso.svg'
                  alt='Longboard isometric picture'
                  header='Longboards'
                >
                  Shredquarters is packed with avid longboarders of all types:
                  cruising, freestyle, dancing, and more! No matter your flow,
                  you are sure to find your crew here. Learn different styles
                  from the community and up your longboarding game.
                </BoardType>
                <BoardType
                  src='/img/cruiser_iso.svg'
                  alt='Skateboard isometric picture'
                  header='Cruisers'
                >
                  You will find them zooming around campus, cruisers are a
                  unique part of Shredquarters. Although not trick-savvy, the
                  cruiser community here at Shredquarters is filled with
                  talented riders that have fallen in love with that familiar
                  feeling of gliding on air. If you ride a cruiser,
                  Shredquarters is the perfect place for you!
                </BoardType>
              </ul>
            </section>
          </div>
          <div style={{ position: 'relative' }}>
            <TextDivider header='The Plan' float={80} id='plan' />
            <section className={styles.events}>
              <h2 className={styles.cta}>Where you can find us</h2>
              <article className={styles.general_events}>
                <h3>Club Meetings</h3>
                <p>
                  Our club meetings are mostly at{' '}
                  <span>
                    Perry Street Parking Garage, at the top-most level. This
                    lets us skate during rainy days on the lower levels.
                  </span>
                </p>
                <h3>Hotspots</h3>
                <p>
                  Outside of meetings, you can usually find us around
                  &quot;Bricks&quot; by the Squires Student Center, the parking
                  lot next to the Moss Arts Center, and the North End Parking
                  Garage. Be sure to look out for us - especially when the
                  whether is nice!
                </p>
              </article>
              {event && (
                <>
                  <h2 className={styles.cta}>See what&apos;s next</h2>
                  <article className={styles.events_grid}>
                    <header>
                      <h3>{eventDate.getUTCDate().toLocaleString('en-US')}</h3>
                      <h4>
                        {eventDate.toLocaleString('en-US', { month: 'long' })}
                      </h4>
                      <h4 className={styles.event_timeframe}>
                        {/* Set day of the month */}
                        {`${eventDate.toLocaleString('en-US', {
                          weekday: 'long'
                        })}, 
                      ${startTime.toLocaleTimeString('en-US', {
                        hour: 'numeric',
                        ...(startTime.getUTCMinutes() !== 0 && {
                          minute: 'numeric'
                        })
                      })} - ${endTime.toLocaleTimeString('en-US', {
                          hour: 'numeric',
                          ...(endTime.getUTCMinutes() !== 0 && {
                            minute: 'numeric'
                          })
                        })}`}
                      </h4>
                    </header>
                    <h4 className={styles.event_location}>
                      {event.name}
                      <span> @ </span>
                      {event.location}
                    </h4>
                    <p>{event.description}</p>
                  </article>
                </>
              )}
            </section>
          </div>

          {/* Map over fetched officers. Show maximum of 3 at first */}
          {officers && (
            <div style={{ position: 'relative' }}>
              {/* Only show TextDivider if officers is defined */}
              <TextDivider header='The Team' float={20} id='team' />
              <section className={styles.team}>
                <ul>
                  {(isTruncated ? truncatedOfficers : officers).map(
                    (officer) => (
                      <OfficerImage officer={officer} key={officer.id} />
                    )
                  )}
                </ul>
                {/* Only show button if it will make a ui change */}
                {officers.length > truncatedOfficers.length && (
                  <div className={styles.button_container}>
                    <StepButton
                      onClick={() => {
                        setIsTruncated((val) => !val)
                      }}
                      style={{ width: '30rem', height: '5rem' }}
                    >
                      {isTruncated ? 'See More' : 'See Less'}
                    </StepButton>
                  </div>
                )}
              </section>
            </div>
          )}
          <div style={{ position: 'relative' }}>
            <TextDivider header='The Network' float={80} id='network' />
            <section className={styles.network}>
              <h2 className={styles.cta}>Connect with the Team!</h2>
              <form
                className={styles.contact}
                noValidate
                autoComplete='off'
                action='https://formspree.io/f/mvoyoepo'
                method='POST'
              >
                <div className={styles.form_row} id={styles.firstname}>
                  <label>First Name</label>
                  <input type='text' name='first_name' />
                </div>
                <div className={styles.form_row} id={styles.lastname}>
                  <label>Last Name</label>
                  <input type='text' name='last_name' />
                </div>
                <div className={styles.form_row} id={styles.email}>
                  <label>Email</label>
                  <input type='email' name='email' />
                </div>
                <div className={styles.form_row} id={styles.phone}>
                  <label>Phone</label>
                  <input type='tel' name='phone' />
                </div>
                <div className={styles.form_row} id={styles.subject}>
                  <label>Subject</label>
                  <input id='text' name='subject' />
                </div>
                <div className={styles.form_row} id={styles.message}>
                  <label>Message</label>
                  <textarea name='message' rows={5} />
                </div>
                <button type='submit'>
                  Send it
                  <div className={styles.send_button}>
                    <Image
                      width={24}
                      height={12}
                      alt=''
                      src='/img/RightArrow.svg'
                    />
                  </div>
                </button>
              </form>
              <div className={styles.wheel_iso}>
                <Image
                  width={64}
                  height={64}
                  alt=''
                  src='/img/wheel_iso.svg'
                  layout='responsive'
                  objectFit='contain'
                />
              </div>
              <h2 className={styles.cta}>Subscribe to our Newsletter!</h2>
              <form className={styles.newsletter}>
                <div className={styles.form_row} id={styles.email}>
                  <label>Email</label>
                  <input type='email' name='email' />
                </div>
                <button type='submit'>
                  Subscribe!
                  <div className={styles.send_button}>
                    <Image
                      width={24}
                      height={12}
                      alt=''
                      src='/img/RightArrow.svg'
                    />
                  </div>
                </button>
              </form>
            </section>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Home
