import * as React from 'react'
import { Section } from '@/types'
import { toast } from 'sonner'
import { format } from 'date-fns'
import { FiArrowUpRight } from 'react-icons/fi'
import { ProfileSectionPositionMover } from '@/components/ProfileSectionPositionMover'

type Props = {
  section: Section
}

const ProfilePostsSection = ({ section }: Props) => {
  const getPostDate = (date: string) => {
    return format(new Date(date), 'MMMM dd, yyyy')
  }

  return (
    <div key={section.id} className="border-t relative border-border w-full">
      {section.show_title && (
        <h2 className="text-2xl profile-container">{section.title}</h2>
      )}

      <div className="mt-2">
        {section.posts.map((post) => {
          return (
            <div
              onClick={() => toast('Post page is WIP 🚧')}
              className="border-t cursor-pointer w-[95%] profile-container border-border mx-auto"
              key={post.id}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-xl">{post.title}</h3>
                  <p className="mt-2">{getPostDate(post.created_at)}</p>
                </div>

                <div>
                  <FiArrowUpRight className="text-5xl" />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <ProfileSectionPositionMover
        sectionId={section.id}
        position={section.position}
      />
    </div>
  )
}

export { ProfilePostsSection }
